const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/sapientCodelabs');
// mongoose.connect('mongodb://localhost/sapientCodelabs');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database not connected 1'));

db.once('open', function (err) {
    if (err) {
        console.log('Database not open');
        return false;
    }
    console.log('Database connected successfully...!');
});

module.exports = db;
