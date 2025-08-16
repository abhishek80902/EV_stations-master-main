const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",   
    port: 587,
    secure: false,             
    auth: {
        user: "kumarabhishek80902@gmail.com",
        pass: "aroifcmgehhpwlmy", 
    }
});

module.exports = transporter;
