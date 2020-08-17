const Factory = require('../controller/handlerFactory');
const AppError = require('../utils/appError');
const CatchAsync = require('../utils/CatchAsync');
const User = require('../models/userModel');
const { off } = require('../models/userModel');

// get current user
exports.getCurrentUser = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

const filter = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateNonPasswords = CatchAsync(async (req, res, next) => {
  //1) if trying to update password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError('Please, use /update_password to update your password.', 400)
    );
  }

  // Filter out password/passwordConfirm to not let it update
  const filteredPasswords = filter(req.body, 'firstName', 'lastName', 'email');

  const updateUser = await User.findByIdAndUpdate(
    req.user.id,
    filteredPasswords,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser,
    },
  });
});

// update user data
exports.updateUserData = CatchAsync(async (req, res, next) => {
  const updateUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updateUser,
  });
});

// Factory Handlers
exports.getAllUsers = Factory.getDoc(User);
exports.getUser = Factory.getSingleDoc(User);
// Do not use this to update or change password because findByIdAndUpdate WILL NOT run save middlewares
// USE ONLY  for updating data excluding password
exports.updateUser = Factory.updateDoc(User);
// delete a user with id
exports.deleteUser = Factory.deleteDoc(User);
