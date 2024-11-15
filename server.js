const express = require('express');
const app = express();
const routs = require('./routes');

app.get('/', (req, res) => {
    res.render('hi.hbs');
});

app.use('/api', routs);



app.listen(8001, () => {
    console.log('Server is running on http://localhost:8001');
});    