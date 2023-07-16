const express = require('express');
const router = express.Router()
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getUser = require('../middleware/fetchUser');

const JWT_SECRET = "fata$$nigga";

//Route: 1 Post request handling for creating a user
router.post('/createuser', [
    body('email', 'Enter a valid email!').isEmail(),
    body('name', 'name should be minimum 3 char long!').isLength({min: 3}),
    body('password', 'password should be minimum 5 char long').isLength({min: 5})
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    // check whether the user with same mail exists or not
    try {
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400)
                .json({error: "email already exists!!!"});
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        const data = {
            user: {
                id: user.id 
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);

        res.json({authtoken});
    } catch(error){
        console.error(error.message);
        res.status(500)
            .send("Internal error occured");
    }
    
});

//Route: 2 Login user
router.post('/login', [
    body('email', 'Enter a valid email!').isEmail(),
    body('password', 'password should be minimum 5 char long').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400)
                .json({error: "please enter valid credentials."});
        }
        const passCmp = await bcrypt.compare(password, user.password);
        if(!passCmp){
            return res.status(400)
                .json({error: "please enter valid credentials."});
        }
        const data = {
            user: {
                id: user.id 
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);

        res.json({authtoken});
    } catch(error){
        console.error(error.message);
        res.status(500)
            .send("Internal error occured");
    }
})

//Route: 3 get user id
router.post('/getuser', getUser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id).select("-password");
        res.send(user);
    } catch(error){
        console.error(error.message);
        res.status(500)
            .send("Internal error occured");
    }
})

module.exports = router;