
var jwtExpress = require('express-jwt');
var jwt = require('jsonwebtoken');
require('dotenv').config()
const generateToken = (payload,key,time)=>{return jwt.sign(payload,key,{ expiresIn: time });}
const verifyToken = jwtExpress({ secret: process.env.SECRET_KEY,algorithms:[process.env.ALGORITHM] })
    module.exports=verifyToken;
    module.exports.generateToken = generateToken;
