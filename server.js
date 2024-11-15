const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/post', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.get('/get', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.listen(8001, () => {
    console.log('Server is running on http://localhost:8001');
});    