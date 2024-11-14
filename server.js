const express = require('express');
const app = express();
const routs = require('./routes');
const path = require('path');
const hbs = require('hbs');

// configer the views with hbs
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');
app.engine('html', hbs.__express);

app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});

app.use('/api', routs);



app.listen(8001, () => {
    console.log('Server is running on http://localhost:8001');
});    