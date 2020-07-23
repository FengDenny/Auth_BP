const User = require('../models/userModel')
const CatchAsync = require('../utils/CatchAsync')
const AppError = require('../utils/appError')

exports.signup = CatchAsync(async (req, res, next) => {

    const {
        name,
        email,
        password,
        passwordConfirm
    } = req.body

    const newUser = await User.create({

        name,
        email,
        password,
        passwordConfirm

    })

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    })
})

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                user: users
            }
        })
    } catch (err) {
        res.status(400).json({
            statsu: 'fail',
            messagee: err
        })
    }
}


// Get a user with their id

exports.getUser = async (req, res) => {
    try {
        let query = await User.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            dats: {
                user: query
            }
        })
    } catch (err) {
        res.status(400).json({
            statsu: 'fail',
            messagee: err
        })
    }
}

// Update a user with their id

exports.updateUser = async (req, res) => {

    try {
        let updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: 'success',
            data: {
                user: updateUser
            }
        })
    } catch (err) {
        res.status(400).json({
            statsu: 'fail',
            messagee: err
        })
    }

}
// Delete user 
exports.deleteUser = async (req, res) => {

    try {
        let deleteUser = await User.findByIdAndDelete(req.params.id)

        res.status(204).json({
            status: 'success',
            data: null

        })
    } catch (err) {
        res.status(400).json({
            statsu: 'fail',
            messagee: err
        })
    }

}