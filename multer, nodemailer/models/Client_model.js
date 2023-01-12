const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const Avatar_Path = path.join('./../server/uploads/client/avatar');

const ImageSchema = mongoose.Schema({
    client_name: {
        type: String,
        required: true,
    },
    client_logo: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: '1',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }

});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", Avatar_Path));
    },

    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, file.fieldname + "-" + Date.now() + '.' + extension);
    }
});
ImageSchema.statics.uploadedAvatar = multer({ storage: storage }).single('client_logo');
ImageSchema.statics.avatarpath = Avatar_Path;

const image = mongoose.model('ClientSection', ImageSchema);

module.exports = image;
