const express = require('express');
// call router as a function
const router = express.Router();
const Post = require('../models/Post');

router.get('/ ', (req, res) => {
    res.send('We are on posts');
});

router.post('/', (req, res) => {
    console.log(req.body);
});

module.exports = router; 