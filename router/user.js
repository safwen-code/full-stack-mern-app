// register with sync and express validation
const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const config = require('config')

const jwt = require('jsonwebtoken')




const User = require("../Model/User");

// Sign Up
router.post("/register", [
  //check for name
  check('name', 'name is required').not().isEmpty(),
  // username must be an email
  check('email', 'email is required').isEmail(),
  // password must be at least 5 chars long
  check('password', 'password is required').isLength({ min: 5 })
], async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // check if user exist
  const { name, email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ errors: [{ msg: `${name}  all ready mawjoud` }] })
    }
    user = new User({
      name, email, password
    })
    //encrept password user
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()

  // return jsonwebtoken JWT
   const payload={
     user:{
       id:user.id,
       name:user.name,
       email:user.email
     }
   }
   jwt.sign(payload,
    config.get('jwtSecret'),
    {expiresIn:36000},
    (err,token)=>{
      if(err) throw err;
      res.json({token, name, email})
    }
    )

    // res.send('user register ya3tek 3asba')
  }
  catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }



})




module.exports = router;