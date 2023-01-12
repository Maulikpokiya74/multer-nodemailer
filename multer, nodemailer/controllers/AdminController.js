const Admin = require('../models/Admin_model');

const nodemailer = require('../config/nodemailer')

const fs = require('fs');

const path = require('path');

module.exports.AddAdmin = (req, res, next) => {
    console.log(req.body.password);
    Admin.create({
        email: req.body.email,
        password: req.body.password,
    }, (err, record) => {
        if (err) {
            return res.json({ status: false, message: " Your Data not insert " + err.message });
        }
        return res.json({ status: true, message: " Your Data insert" });
    })
}

module.exports.AdminLogin = async (req, res, next) => {
    try {
        return new Promise(async () => {

            const email = req.body.email;
            const password = req.body.password;

            const record = await Admin.findOne({ email: email });
            console.log(record);
            if (record != null) {
                var cpass = record.password;
                if (cpass == password) {
                    return res.json({ status: true, message: "login successfully " });
                }
                return res.json({ status: false, message: "Password not match" });
            }
            return res.json({ status: false, message: "Email not found" });
        })
    }
    catch (err) {
        console.log(err);
        return res.json({ status: false, message: " something wrong " + err });
    }
}


module.exports.ForgottenPassword = async (req, res) => {
    try {
        return new Promise(async () => {
            const email = req.body.email;
            console.log(email);
            const record = await Admin.findOne({ email: email });
            console.log(record);
            if (record) {
                let OTP = Math.random();
                OTP = parseInt(OTP * 1000000);
                // console.log(OTP);
                res.cookie('OTP', OTP);
                res.cookie('email', req.body.email);
                var subject = 'OTP Checking Purpose'
                var html = "Hello Chennal Well Come to My Guys" +

                    "<h1>YOUR OTP IS :-" + OTP + "</h1>"
                const sendotp = nodemailer.sendOTPEmail(email, subject, html);
                if (sendotp) {
                    return res.json({ status: true, message: 'otp send' });
                }
                return res.json({ status: true, message: "otp not Found" });
            }
            return res.json({ status: true, message: "Email not Found" });
        })
    }
    catch (err) {
        return res.json({ status: true, message: "something wrong" + err.message });
    }
}

module.exports.resetPassword = async (req, res) => {
    try {
        return new Promise(async () => {
            if (req.body.otp == req.cookies.OTP) {
                if (req.body.npass == req.body.cpass) {
                    const email = req.cookies.email;
                    var record = await Admin.findOneAndUpdate({ email: email }, { password: req.body.npass });
                    return res.json({ status: true, message: "password updated" });
                }
                return res.json({ status: false, message: "cpass not match" });
            }
            return res.json({ status: true, message: "otp not match" });
        })
    }
    catch (err) {
        return res.json({ status: false, message: "something wrong " });
    }

}