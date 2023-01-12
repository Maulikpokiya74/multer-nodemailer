const nodemailer = require('nodemailer');

const path = require('path');

// let transporter = nodemailer.createTransport({
//     service: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//         user: "testmaulik12@gmail.com",
//         pass: "uaawmzdlbkscqcgv"
//     }
// });

// transporter.sendMail({
//     from: 'testmaulik123@gmail.com',
//     to: req.body.email,
//     subject: 'OTP Checking Purpose',
//     html: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." +

//         "<h1>YOUR OTP IS :-" + OTP + "</h1>"
// }, function (err, data) {
//     if (err) {
//         // return res.json({ status: false, message: "Mail Not Send" + err.message });
//         console.log('Mail Not Send  ' + err);
//         return false;
//     }
//     // return res.json({ status: false, message: 'Message Send : ', data });
//     console.log('Message Send : ', data);

// });

// module.exports = {
//     transporter: transporter,
//     mailOptions: mailOptions,
// }


// ----------------------------------------------------------------------------------------------------


module.exports.sendOTPEmail = async (email, subject, html) => {
    return new Promise(async resolve => {

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",//or "gmail"
            port: 465,//optional
            secure: true,//optional
            auth: {
                user: "test.user25112020@gmail.com",
                pass: "utxjyaogndaroqdz"
            }
        });
        var mailOptions = {
            from: "test.user25112020@gmail.com",
            to: email,
            subject: subject,
            html: html
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error" + error)
                return resolve({ status: false, data: [], message: 'Could not send OTP!' });
            }
            console.log("info " + info)
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return resolve({ status: true, data: [], message: 'OTP sent!.' });
        });
    });
}