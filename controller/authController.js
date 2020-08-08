const User = require('../models/userModel');
const { promisify } = require('util');
const CatchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Email = require('../utils/email');
const { use } = require('../routes/userRoutes');

const signToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

// generate  token for the user so it will remember them
const createToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  //  cookieOptions = false so the token will not expires
  if (process.env.NODE_ENV == 'production') cookieOptions = false;
  res.cookie('jwt', token, cookieOptions);
  // Remove password from output
  user.password = undefined;

  // 201 status code = created
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = CatchAsync(async (req, res, next) => {
  // To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
  const passReq = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    passwordChangedAt,
  } = req.body;

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    passwordChangedAt,
  });
  // ? match the regEx return new AppError
  if (password.match(passReq) && passwordConfirm.match(passReq)) {
    try {
      const token = signToken(newUser._id);
      const url = `${req.protocol}://${req.get(
        'host'
      )}/api/users/signup/${token}`;
      // send email
      await new Email(newUser, url).sendValidation();
      res.status(201).json({
        status: 'success',
        message: 'Verification Token sent to email!',
        newUser,
      });
    } catch (err) {
      console.log(err);
      return next(
        new AppError(
          'There was an error sending an email, try sending later',
          500
        )
      );
    }
  } else {
    return next(new AppError('Invalid password format', 400));
  }
});

// Email Verification
exports.confirmSignup = CatchAsync(async (req, res, next) => {
  const { token } = req.params;
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select('+validated');
  if (!user) {
    return next(
      new AppError('This user belonging to this token does not exist.', 401)
    );
  }
  if (user.validated) {
    return next(new AppError('This account has been verified!', 400));
  }
  user.validated = true;
  await user.save({
    validateBeforeSave: false,
  });

  // // jwt token
  if (process.env.NODE_ENV === 'production') {
    createToken(user, 200, res);
  } else {
    res.redirect('http://localhost:3000/email_verified');
  }
});

exports.login = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide a email and password'), 400);
  }
  // check if user exist and password is correct
  // .select(+password): to select the field that are false in the user model
  const user = await User.findOne({
    email,
  })
    .select('+password')
    .select('-__v');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(
      new AppError(`Incorrect email or password. Please, try again`),
      401
    );
  }

  // send token, if auth succeeds
  createToken(user, 200, res);
});

// secure logging out user
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    // JWT expires in 10 sec
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};

// Rest Password
exports.forgotPassword = CatchAsync(async (req, res, next) => {
  // 1) Get User based on posted email
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return next(
      new AppError(` There is no user associated with ${req.body.email}`, 404)
    );
  }
  // 2) Generate a random token
  const resetToken = user.createPasswordResetToken();
  await user.save({
    validateBeforeSave: false,
  });

  // 3) Send token to the user email to reset password
  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/users/resetPassword/${resetToken}`;

    await new Email(user, resetURL, resetToken).sendPasswordReset();
    res.status(200).json({
      status: 'success',
      message: 'Please, check your email to reset your password!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({
      validateBeforeSave: false,
    });
    return next(
      new AppError(
        'There was an error sending the email, Try again later!',
        500
      )
    );
  }
});

exports.resetPassword = CatchAsync(async (req, res, next) => {
  // 1) Get User based on the token provided
  // To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
  const passReq = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  });
  // 2) if token has no expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired.', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  // (truthy) ? password and passwordConfirm === the regEx chnage password : (falsy) return AppErr
  if (user.password.match(passReq) && user.passwordConfirm.match(passReq)) {
    await user.save();
    // 3) Update changedPasswordAt for the user

    // 4) Log the user in
    createToken(user, 200, res);
  } else {
    return next(new AppError('Invalid password format', 400));
  }
});

// protected route
exports.protect = CatchAsync(async (req, res, next) => {
  let token;
  // 1) See if token is available, then retrieve it

  if (
    // Postman's authorization header that starts with a Bearer
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // to retrive the second part of the string after Bearer
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to gain access', 401)
    );
  }

  // 2) Token Verification
  const decoded = await promisify(jwt.verify)(token, process.env.jWT_SECRET);
  // 3) Checking if user still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user thats belongs to this token does no longer exist.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again!', 401)
    );
  }
  // Grant access to protected route
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});
