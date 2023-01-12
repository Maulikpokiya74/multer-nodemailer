const ClientSection = require('../models/Client_model');

const fs = require('fs');

const path = require('path');


module.exports.InsertClintRecord = (req, res, next) => {

    ClientSection.uploadedAvatar(req, res, (err) => {

        if (err) {
            console.log(err.message);
            return res.json({ status: false, message: err.message });
        }
        if (req.file) {
            let avatarImage = ClientSection.avatarpath + '/' + req.file.filename;
            ClientSection.create({
                client_name: data.client_name,
                client_logo: avatarImage,

            }, (err, record) => {
                if (err) {
                    return res.json({ status: false, message: " Your Data not insert" });
                }
                return res.json({ status: true, message: " Your Data insert" });

            })
        }
    })
}

module.exports.ViewClintRecord = (req, res) => {
    ClientSection.find({}, (err, record) => {
        if (err) {
            return res.json({ status: false, message: "Data not view" + err.message });
        }
        return res.json({ status: true, message: record });
    })
}

module.exports.DeleteClintRecord = function (req, res) {
    // console.log(req.params.id);
    var id = req.params.id;

    ClientSection.findById(id, function (err, deleteData) {
        if (err) {
            console.log('Data Not Delete');
            return false;
        }
        console.log(deleteData.avatar);

        fs.unlinkSync(path.join(__dirname, '..', deleteData.client_logo));

        ClientSection.findByIdAndDelete(id, function (err, record) {
            if (err) {
                console.log('Your dat not delete');
                return false;
            }
            return res.json({ status: true, message: " Your Data deleted" });

        })
    })
}

module.exports.UpdateClintRecord = function (req, res) {

    ClientSection.findById(req.params.id, function (err, data) {
        if (err) {
            return res.json({ status: false, message: 'Data Not updated' });
        }

        ClientSection.uploadedAvatar(req, res, function (err) {
            if (err) {
                return res.json({ status: false, message: err.message });
            }

            if (req.file) {
                ClientSection.findById(data, function (err, record) {
                    if (err) {
                        return res.json({ status: false, message: /*"id not found " +*/ err.message });
                    }

                    fs.unlinkSync(path.join(__dirname, '..', record.client_logo));

                    let avatar = ClientSection.avatarpath + '/' + req.file.filename;
                    ClientSection.findByIdAndUpdate(data, {
                        client_name: req.body.client_name,
                        client_logo: avatar
                    }, function (err, record) {
                        if (err) {
                            return res.json({ status: false, message: 'Data Not updated' });
                        }
                        return res.json({ status: true, message: record });

                    })
                })
            }
            else {
                console.log(data);
                ClientSection.findById(data, function (err, record) {
                    if (err) {
                        return res.json({ status: false, message: "id not found" + err.message });
                    }

                    let avatar = record.client_logo;


                    ClientSection.findByIdAndUpdate(data, {
                        client_name: req.body.client_name,
                        client_logo: avatar
                    }, function (err, record) {
                        if (err) {
                            return res.json({ status: false, message: 'Data Not updated' });
                        }
                        return res.json({ status: true, message: record });
                    })
                })
            }
        })
    })
}