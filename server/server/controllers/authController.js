const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const {config} = require('../../config/config')
const expressJwt = require('express-jwt')
const { roles } = require('../roles')
const signin = async (req, res) => {
  try {
    let user = await User.findOne({
      "email": req.body.email
    })
    if (!user)
      return res.status('401').json({
        error: "User not found"
      })

    if (!user.authenticate(req.body.password)) {
      return res.status('401').send({
        error: "Email and password don't match."
      })
    }

    const token = jwt.sign({
      _id: user._id
    }, config.jwtSecret)

    res.cookie("t", token, {
      expire: new Date() + 9999
    })

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
       
      }
    })

  } catch (err) {

    return res.status('401').json({
      error: "Could not sign in"
    })

  }
}

const signout = (req, res) => {
  res.clearCookie("t")
  return res.status('200').json({
    message: "signed out"
  })
}
// Grant user access
const grantAccess = function(action, resource){
    return async(req, res, next)=>{
      try{

        // const user =  res.locals.loggedInUser
            const permission = roles.can(req.user.role)[action](resource)           
            if(!permission.granted){
                return res.status(401).json({
                    error: `You don't have enough permission to perform this action`
                })
            }
            next()
        }
        catch(error){
            // next(error)
            console.log(error)
        }
    }
}

const requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms: ['HS256']
})
  
const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!(authorized)) {
      return res.status('403').json({
        error: "User is not authorized"
      })
    }
    next()
    // const authHeader = req.headers.authorization;
    // if(authHeader){
    //   const token = authHeader.split(' ')[1]
    //   jwt.verify(token, config.jwtSecret, (err, user)=>{
    //     if(err){
    //       return res.sendStatus(403)
    //     }
    //     req.user = user
    //   } );
    // }
    // else{
    //   res.sendStatus(401)
    // }
  }
  
  module.exports = {
    signin,
    signout,
    requireSignin,
    hasAuthorization,
    grantAccess
  }
  
