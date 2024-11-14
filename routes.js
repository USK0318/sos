const express = require('express');

const router = express.Router();

// Example route
router.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Another example route
router.get('/about', (req, res) => {
    res.send('About page');
});

module.exports = router;