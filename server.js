const express = require('express');
const app = express();

const routs = require('./routs');


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api', routs);

app.listen(8001, () => {
    console.log('Server is running on http://localhost:8001');
});    