const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
// const { roles } = require('../roles')
const errorHandler = require('./../helpers/dbErrorHandler')
// const expressJWT = require('express-jwt')
// const { config } = require('./../../config/config')

/**
 * Get all user from the database
 */
exports.getUsers = async(req, res, next)=>{
    const users = await User.find({})
    res.status(200).json({
        data: users
    })
}
/**
 * params 
 * Fetch or get a single user
 */
exports.getUser = async(req, res, next)=>{
    try{
        const userId = req.params.userId
        const user = await User.findById(userId)
        if(!user) return next(new Error('User does not exist'))
        res.status(200).json({
            data: user
        })
    }catch(error){
        next(error)
    }
}
// Get a user info and update
exports.updateUser = async(req, res, next)=>{
    try{
        const update = req.body
        const userId = req.params.userId
        const user = await User.findByIdAndUpdate(userId, update)
        res.status(200).json({
            data: user,
            message: 'User has been updated'
        })
    }
    catch(error){
        next(error)
    }
}
// Delete a user
exports.deleteUser = async(req, res, next)=>{
    try {
        const userId = req.params.userId
        await User.findByIdAndDelete(userId)
        res.status(200).json({
            data: null,
            message: 'User has been deleted'
        })
    } catch (error) {
        next(error)
    }
}

// Register a user
exports.signUp = async(req, res)=>{
   
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(200).json({
        message: "Successfully signed up!"
        })
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
    })
}
}

// Sign user out anc clear cookie
exports.signOut = (req, res)=>{
    res.clearCookie('t')
    return res.status(200).json({
        message:'Logged out'
    })
}