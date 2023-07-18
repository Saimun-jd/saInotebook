const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const validateNote = require("../middleware/validateNote");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Route:1 Get all notes from api
router.get("/fetchnotes", fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occured");
    }
});

//Route: 2 Add notes to database
router.post(
    "/addnote",
    fetchUser, //middleware function
    [
        //Validator
        body("title", "Enter a valid title.").isLength({ min: 3 }),
        body(
            "description",
            "Description should be atleast 5 char long"
        ).isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body; //destructure data from request
            const errors = validationResult(req); // if validation fails then do this
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id, // our middleware already fetched id from auth-token and had set id to user
            });
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal error occured");
        }
    }
);

//Route 3: update note
router.put(
    "/updatenote/:id",
    fetchUser, validateNote, //middlewware functions
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const newNote = {};
            if (title) newNote.title = title;
            if (description) newNote.description = description;
            if (tag) newNote.tag = tag;

            //find the note with id
            let note = await Note.findById(req.params.id);
            if (!note) return res.status(404).send("Not found!!!");
            // Check if this note belongs to this user
            if (note.user.toString() !== req.user.id)
                return res.status(401).send("Not allowed!!!");
            note = await Note.findByIdAndUpdate(
                req.params.id,
                { $set: newNote },
                { new: true }
            );
            res.json({ note });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal error occured");
        }
});

module.exports = router;
