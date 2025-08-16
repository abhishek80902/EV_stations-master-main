const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { sendOTP, verifyOTP } = require('./otpController');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/voltseekers', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// OTP Routes
app.post('/send-otp', sendOTP);
app.post('/verify-otp', verifyOTP);

// Auth Routes
app.use('/auth', authRoutes);

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
