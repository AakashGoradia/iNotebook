const express = require('express');
const router = express.Router();
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');
const {
  body,
  validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//creating jwt secret sign
const JWT_SECRET = "@@k@sh";

//ROUTE 1: Creating a user using POST "/api/auth/createuser" , No login required.
router.post('/createuser', [
  body('name', 'Please enter a valid name').isLength({
    min: 3
  }),
  body('email', 'Please enter a valid email').isEmail(),
  body('password', 'Please enter a valid password').isLength({
    min: 5
  })
], async (req, res) => {

  //if there are errors, return bad request and that error.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  try {

    //check whether the user with this email exists already.
    let user = await User.findOne({
      email: req.body.email
    });
    console.log(user);
    if (user) {
      return res.status(400).json({
        message: "Sorry a user with this email already exists."
      })
    }

    //creating salt and passing password and salt to hashing function.
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    const data = {
      user: {
        id: user.id
      }
    };

    //signing of auth token
    const authtoken = jwt.sign(data, JWT_SECRET);

    res.json({
      authtoken: authtoken
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server error occured");
  }
});



//ROUTE 2: Authenticating a user using POST "/api/auth/login" , No login required.
router.post('/login', [
  body('email', 'Please enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {

  //if there are errors, return bad request and that error.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const {
    email,
    password
  } = req.body;

  try {

    //check whether the user with this email exists already.
    let user = await User.findOne({
      email: req.body.email
    });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        message: "Sorry, please enter correct credentials."
      });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({
        message: "Sorry, please enter correct credentials."
      });
    }

    const data = {
      user: {
        id: user.id
      }
    };

    const authtoken = jwt.sign(data, JWT_SECRET);

    res.json({
      authtoken: authtoken
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server error occured");
  }
});

//ROUTE 3: Get logedin user details using POST "/api/auth/getuser", login required.
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server error occured");
  }
});

module.exports = router;