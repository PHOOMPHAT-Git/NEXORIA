const express = require('express'); 
const router = express.Router();
const User = require('../models/User.js');

router.get('/', async (req, res, next) => {
    try {
        const data = await User.find();
        res.render('setting', { title: 'Settings', data: data });
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newUser = new User({
            name: req.body.name,
            password: req.body.password,
            gmail: req.body.gmail
        });
        
        const savedUser = await newUser.save();
        res.status(201).json({ user: savedUser });
    } catch (err) {
        next(err);
    }
});

module.exports = router;