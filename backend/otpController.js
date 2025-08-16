const transporter = require('./mailer');
let otpStore = {};

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

async function sendOTP(req, res) {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email required" });

    const otp = generateOTP();
    otpStore[email] = otp;

    const mailOptions = {
        from: '"VoltSeekers" <kumarabhishek80902@gmail.com>',
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is ${otp}. It is valid for 5 minutes.`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send OTP" });
    }
}

function verifyOTP(req, res) {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: "Email and OTP required" });

    if (otpStore[email] && otpStore[email] == otp) {
        delete otpStore[email];
        return res.json({ message: "OTP verified successfully" });
    }
    res.status(400).json({ error: "Invalid OTP" });
}

module.exports = { sendOTP, verifyOTP };
