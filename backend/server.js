const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sendOTP, verifyOTP } = require('./otpController');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send-otp", async(req, res) => {
    try {
        const email = req.body.email;
        if (!email) {
            return res.status(400).send("Email is required");
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        const mailOptions = {
            from: "yourmail@gmail.com",
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP is: ${otp}`
        };

        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}: ${otp}`);

        res.status(200).send("OTP Sent");
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).send("Failed to send OTP");
    }
});

app.post('/send-otp', sendOTP);
app.post('/verify-otp', verifyOTP);


app.listen(3000, () => {
    console.log('OTP server running on http://localhost:3000');
});