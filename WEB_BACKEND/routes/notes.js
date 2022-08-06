const express= require('express');
const router= express.Router();
const fetchuser = require('../middleware/fetchuser');

//ROUTE 3: Get all notes of user using GET "/api/auth/fetchallnotes", login required.
router.get('/fetchallnotes', fetchuser,(req, res)=>{
    
    res.json([ ]);
});

module.exports= router;