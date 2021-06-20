const express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
const verifyToken = require('../middleware/token');
const { generateToken } = require('../middleware/token');
const userServices = require('../users/user.service');

require('dotenv').config()

var refreshTokens = [];


router.get('/getAllUsers', verifyToken, async (req, res) => {
  var user = await userServices.getAllUsers();
  res.status(200).send(user);
})

//Get user based on the token
router.get('/getUser', verifyToken, async (req, res) => {
  console.log("decoding payload", req.user)
  //we have access to our decoded token via req.user
  var id = req.user.id;
  //get users from database
  var user = await userServices.getUser(id);
  res.status(200).send(user);

})

router.post('/generateToken',(req,res)=>{
  console.log("GENERATING TOKEN")
  var refreshToken = req.body.token;
  if(!refreshToken || !refreshTokens.includes(refreshToken)){
         res.status(403);
        res.send({success:"false",msg:"Refresh token not found"});
  }
  else{
  var user = jwt.verify(refreshToken,process.env.REFRESH_KEY);
  console.log(user);
  var token = generateToken({id:user.id},process.env.SECRET_KEY,5)
 res.status(200).send({token:token});
  }
})

//login to generate a token
router.post('/login', async (req, res) => {
  const { userName, password } = req.body
  if(!userName || !password) {res.send({msg:"please enter something"})}
  var auth = await userServices.login(userName, password); //{id:1,name:dipesh}
  if (auth.id) {
    var payload = { id: auth.id };
    var token = generateToken(payload,process.env.SECRET_KEY,5);
    var refreshToken = generateToken(payload,process.env.REFRESH_KEY,300);
    refreshTokens.push(refreshToken);
    console.log(refreshTokens);
    res.status(200).send({msg:"success","token": token,"refreshToken":refreshToken });
  }
  else {
    res.status(403).send({"msg":auth.msg})
  }
})

module.exports = router;

