const express= require('express');
const router= express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


//Creating a user using POST "/api/auth/createuser" , No login required.

router.post('/createuser',[
    body('name','Please enter a valid name').isLength({ min: 3 }),
    body('email','Please enter a valid email').isEmail(),
    body('password','Please enter a valid password').isLength({ min: 5 })
],async (req, res)=>{

    //if there are errors, return bad request and that error.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      //check whether the user with this email exists already.
      let user = await User.findOne({email: req.body.email});
      console.log(user);
      if(user){
        return res.status(400).json({message: "Sorry a user with this email already exists."})
      }

      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })

      res.json({message: "Welcome User"});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
    });

module.exports= router;