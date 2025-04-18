const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kumarabhishek80902@gmail.com',
        pass: 'Abhishek@1234'
    }
});

module.exports = transporter;