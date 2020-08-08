const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please, provide a first name, so, we know who you are!'],
  },
  lastName: {
    type: String,
    required: [true, 'Please, provide a last name, so, we know who you are!'],
  },
  email: {
    type: String,
    required: [true, 'A email is required for this signup process!'],
    unique: true,
    validate: [validator.isEmail, 'Please, provide a valid email address.'],
  },
  password: {
    type: String,
    required: [true, 'A password is required for this signup process!'],
    minLength: 5,
    // never show password in DB
    select: false,
  },
  validated: {
    type: Boolean,
    default: false,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please, confirm your password'],
    validate: {
      // This only works on CREATE and SAVE
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  passwordChangedAt: {
    type: Date,
    // select: false
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});
// LOGIN  AUTH START
//  bcrypt password encryption
// If delete in DB, must comment out before reimporting to the DB
userSchema.pre('save', async function (next) {
  // only run this functiuon if password was modified
  if (!this.isModified('password')) return next();
  //password hashing bcrypt with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // delete passwordConfirm field
  this.passwordConfirm = undefined;
});

// password comparison for logging in using bcrypt
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
// LOGIN AUTH END

// Changed Password START
// changedPasswordAt middleware
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  // False means NOT Changed
  return false;
};
// Changed Password END

// Password reset START
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log(
    {
      resetToken,
    },
    this.passwordResetToken
  );

  // 10 * 60 sec * 1000 milisec (expires in 10mins)
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
// Password reset END

// add User model to DB
const User = mongoose.model('User', userSchema);

module.exports = User;
