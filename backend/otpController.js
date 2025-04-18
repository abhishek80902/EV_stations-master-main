const transporter = require('./config/nodemailer');
const otpStore = {}; // In-memory store

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.sendOTP = (req, res) => {
    const { email } = req.body;
    const otp = generateOTP();
    otpStore[email] = otp;

    const mailOptions = {
        from: 'VoltSeekers <your-email@gmail.com>',
        to: email,
        subject: 'Your OTP for VoltSeekers',
        text: `Your OTP is ${otp}. It is valid for 5 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.status(500).send('Error sending OTP.');
        res.send('OTP sent successfully.');
    });
};

exports.verifyOTP = (req, res) => {
    const { email, otp } = req.body;
    if (otpStore[email] === otp) {
        delete otpStore[email]; // OTP used once
        res.send('OTP verified successfully!');
    } else {
        res.status(400).send('Invalid or expired OTP.');
    }
};