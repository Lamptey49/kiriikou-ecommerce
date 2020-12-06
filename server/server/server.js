const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const path = require('path')
const User = require('./models/userModel')
const routes = require('./routes/routes')
const { config } = require('../config/config')
const cors = require('cors')
const socketio = require('socket.io')
const http = require('http')


require('dotenv').config({
    path: path.join(__dirname, './../.env')

})

const app = express()
const PORT = process.env.PORT || 3000
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket)=>{
    console.log('connection made')
    socket.on('disconnect', ()=>{
        console.log('User has left')
    })
})

mongoose.connect('mongodb+srv://Phinehas:Phinehas86@cluster0.1gctm.mongodb.net/kiriikou-ecommerce?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true})
        .then(()=> console.log('Connected to the Database successfully'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
// app.use((req, res, next)=>{
//     if(req.headers['Authorization']){
//         const accessToken = req.headers['Authorization']
//         const { userId, exp } = jwt.verify( {
//            secret:config.jwtSecret,
//            getToken: function(req){
//                 if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
//                     return req.headers.authorization.split(' ')[1];

//                 }else if(req.query && req.query.token){
//                     return req.query.token
//                 }
//                 return null;
//             }})
//         if(exp < Date.now().valueOf() / 1000){
//             return res.status(401).json({ error: 'Your token has expired, please login to obtain new one'})
//         }
//         res.locals.loggedInUser =  User.findById(userId); 
//         next()
//     }
//     else{
//         next()
//     }
// })  
app.use('/', routes)

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({"error" : err.name + ": " + err.message})
    }else if (err) {
      res.status(400).json({"error" : err.name + ": " + err.message})
      console.log(err)
    }
})
app.listen(PORT, ()=>{
    console.log(`Server is up and running on http://localhost:${PORT}`)
})      