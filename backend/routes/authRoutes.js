const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.json({ message: "Signup successful" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Login
try {
    const response = await fetch("http://localhost:3000/auth/login", { // <-- Updated URL
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    let data = {};
    try {
        data = await response.json(); // Try parsing JSON safely
    } catch (err) {
        console.warn("Non-JSON response from server:", err);
    }

    if (response.ok) {
        const toast = document.getElementById("toast");
        toast.textContent = "Login successful!";
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
            window.location.href = "ev_routing.html";
        }, 2000);

        e.target.reset();
    } else {
        alert(data.error || "Login failed");
    }
} catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again.");
}


module.exports = router;
