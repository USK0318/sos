const express = require('express');

const router = express.Router();

// Example route
router.get('/', (req, res) => {
    res.send('welcome to api page');
});

// Another example route
router.get('/about', (req, res) => {
    res.render('./views/about.html');
});

module.exports = router;