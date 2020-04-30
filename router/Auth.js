const express = require("express");
const jwt = require('jsonwebtoken')
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require('config')
const auth =require('../middelware/auth')
const { check, validationResult } = require('express-validator');
const User = require("../Model/User");

// Sign in // and get Token
router.post("/login", [
  // username must be an email
  check('email', 'email is required').isEmail(),
  // password must be at least 5 chars long
  check('password', 'password is required').exists()
],async(req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  const {email, password}=req.body
  try {
     let user = await User.findOne({email})
     if(!user){
       return res.status(400).json({errors:[{msg:'invalid credential user'}]})
     }
     // match the email and password
     const isMatch= await bcrypt.compare(password, user.password)
     if(!isMatch){
      return res.status(400).json({errors:[{msg:'invalid credential password'}]})
     }
     // return jsonwebtoken JWT
   const payload={
    user:{
      id:user.id,
      email:user.email,
      
    }
  }
  jwt.sign(payload,
   config.get('jwtSecret'),
   {expiresIn:36000},
   (err,token)=>{
     if(err) throw err;
     res.json({token, email})
   }
   )

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Errors')
  }
 
})

// get curret user
router.get('/',auth,async(req,res)=>{
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})
// update User
router.put('/updateUser/:id', (req,res)=>{
 const updateUser={
   _id:req.params,
   name:req.body.name,
   email:req.body.email,
   password:req.body.password
 }
 bcrypt.genSalt(10, function(err,salt){
   bcrypt.hash(updateUser.password, salt, (err,hash)=>{
     if(err) throw err
     updateUser.password=hash
     User.findOneAndUpdate({_id:updateUser._id}, {$set:{...updateUser} })
   } )
   .then(user=>res.json(user))
   .catch(err=>console.log(err))
 })
})
    
module.exports = router;