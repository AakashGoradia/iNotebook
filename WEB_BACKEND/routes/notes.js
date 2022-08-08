const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const {
    body,
    validationResult
} = require('express-validator');

//ROUTE 1: Get all notes of user using GET "/api/notes/fetchallnotes", login required.
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        //finding and sending all the notes in response
        const notes = await Note.find({
            user: req.user.id
        });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error occured");
    }

});

//ROUTE 2: Add a new note of the user using POST "/api/notes/addnote", login required.
router.post('/addnote', fetchuser, [
    //validating new note
    body('title', 'Please enter a valid title').isLength({
        min: 3
    }),
    body('description', 'Please enter a valid description').isLength({
        min: 5
    })
], async (req, res) => {

    try {
        //destructuring from request
        const {
            title,
            description,
            tag
        } = req.body;

        //if there are errors, return bad request and that error.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        //creating a new note and saving it.
        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        });
        const savedNote = await note.save();

        res.json(savedNote);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error occured");
    }


});

module.exports = router;