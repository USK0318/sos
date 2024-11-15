const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});


app.listen(8001, () => {
    console.log('Server is running on http://localhost:8001');
});    