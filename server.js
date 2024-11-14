const express = require('express');
const app = express();
const routs = require('./routes');


app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});

app.use('/api', routs);



app.listen(8001, () => {
    console.log('Server is running on http://localhost:8001');
});    