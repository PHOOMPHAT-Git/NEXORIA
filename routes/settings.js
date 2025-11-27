const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js');

router.get('/', (req, res, next) => {
    Product.find((err, data) => {
        if (err) return next(err);
        res.render('setting', { title: 'Settings', data: data });
    });
});

module.exports = router;