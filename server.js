const express = require('express');
const morgan = require('morgan');

require('dotenv').config();

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/profile', require('./routes/profile'));

//handle production
if(process.env.NODE_ENV === 'production') {
    //set public folder
    app.use(express.static(__dirname + '/public/'));

    //handle spa
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});