function verifyOTP() {
    const otp = document.getElementById("otp").value;
    const email = localStorage.getItem("userEmail");

    fetch("http://localhost:3000/send-otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        })
        .then((res) => {
            if (res.ok) {
                showToast("OTP Sent!");
            } else {
                showToast("Failed to send OTP");
            }
        })
        .catch(() => showToast("Server error"));
}