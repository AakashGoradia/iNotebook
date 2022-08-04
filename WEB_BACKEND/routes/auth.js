const express= require('express');
const router= express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

//Creating a user using POST "./api/auth"

router.get('/',[
    body('name','Please enter a valid name').isLength({ min: 3 }),
    body('email','Please enter a valid email').isEmail(),
    body('password','Please enter a valid password').isLength({ min: 5 })
],(req, res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
      .catch(err=>{console.log(err);
        res.json({error: "Please enter unique values", message: err.message});});
    });

module.exports= router;