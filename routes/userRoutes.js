const express = require('express')
const authController = require('../controller/authController')
const router = express.Router()

// @route POST api/users/signup
// @desc Create a user
// @access Public 
router.post('/signup', authController.signup)

// @route GET api/users
// @desc Get all user
// @access Public 

router.route('/').get(authController.getAllUsers)


// @route GET api/users/:id
// @desc Get a user by their id
// @access Public 
router.route('/:id').get(authController.getUser).patch(authController.updateUser).delete(authController.deleteUser)







module.exports = router