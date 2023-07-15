const express = require('express');
const router = express.Router()
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Post request handling for creating a user
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
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        })
        res.json(
            {result: `Success!! created a user with: Name: ${user.name}, Email: ${user.email}`
        });
    } catch(error){
        console.error(error.message);
        res.status(500)
            .send("Some error occured");
    }
    
});

module.exports = router;