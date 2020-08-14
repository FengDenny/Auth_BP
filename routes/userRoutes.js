const express = require('express');
const authController = require('../controller/authController');
const userController = require('../controller/userController');
const router = express.Router();

// @route POST api/users/signup
// @desc Create a user
// @access Public
router.post('/signup', authController.signup);

// @route POST api/users/signup/:token
// @desc confirm email verification
// @access Public
router.get('/signup/:token', authController.confirmSignup);

// @route POST api/users/login
// @desc User login
// @access Public
router.post('/login', authController.isLoggedIn, authController.login);

// @route GET api/users/logout
// @desc User logout
// @access Public
router.get('/logout', authController.logout);

// Reset password
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// auth needed after this route
router.use(authController.protect);

// @route GET api/users/update_password
// @desc Update User Password
// @access Private
router.patch('/update_password', authController.updateUserPassword);

// @route GET api/users/update_information
// @desc Update User Email, first name and last name
// @access Private

router.patch('/update_information', userController.updateNonPasswords);

router.get(
  '/user_account_settings',
  userController.getCurrentUser,
  userController.getUser
);

router.route('/').get(authController.isLoggedIn, userController.getAllUsers);

// @route GET api/users/:id
// @desc GET a user, UPDATE user, DELETE user by their id
// @access Public
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
