const Factory = require('../controller/handlerFactory')
const User = require('../models/userModel');

// Factory Handlers 
exports.getAllUsers = Factory.getDoc(User);
exports.getUser = Factory.getSingleDoc(User);
// Do not use this to update or change password because findByIdAndUpdate WILL NOT run save middlewares
// USE ONLY  for updating data excluding password 
exports.updateUser = Factory.updateDoc(User)
// delete a user with id
exports.deleteUser = Factory.deleteDoc(User)