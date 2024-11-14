const express = require('express');

const router = express.Router();

// Example route
router.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});

// Another example route
router.get('/about', (req, res) => {
    res.send('About page');
});

module.exports = router;