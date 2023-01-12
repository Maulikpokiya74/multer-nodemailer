const express = require('express');

const cookieParser = require('cookie-parser');


const app = express();

const PORT = process.env.PORT || 3000;

const path = require('path');

// var bodyParser = require('body-parser');


const db = require('./config/mongoose');

var cors = require('cors');

app.use(cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

app.use(cookieParser());

app.use(express.urlencoded());


app.use('/', require('./routes/index'));

app.use('/uploads', express.static(__dirname + './uploads'));



app.get('/', (req, res) => {
    res.send('Hello World!');
})



app.listen(PORT, () => {
    console.log('server started on port', PORT);
})
