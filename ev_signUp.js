let otpVerified = false;

        function showToast(id) {
            const toast = document.getElementById(id);
            toast.classList.add("show");
            setTimeout(() => {
                toast.classList.remove("show");
            }, 2000);
        }

        document.querySelector("#signupForm").addEventListener("submit", function(e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const chargeLevel = document.getElementById("charge-level").value;

            if (!otpVerified) {
                alert("Please verify your OTP before registering.");
                return;
            }

            if (name && email && password && chargeLevel) {
                showToast("toast");

                setTimeout(() => {
                    window.location.href = "ev_login.html";
                }, 2000);

                e.target.reset();
            } else {
                alert("Please fill all the fields.");
            }
        });

        document.getElementById("close-signup").addEventListener('click', () => {
            window.location.href = "ev_login.html";
        });

        function sendOTP() {
            const email = document.getElementById("email").value.trim();
            if (!email) {
                alert("Please enter email first.");
                return;
            }

            localStorage.setItem("userEmail", email);

            fetch("http://localhost:3000/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    showToast("otpToast");
                } else {
                    alert(data.error || "Failed to send OTP.");
                }
            })
            .catch(() => alert("Failed to send OTP."));
        }

        function verifyOTP() {
            const email = localStorage.getItem("userEmail");
            const otp = document.getElementById("otp").value.trim();

            if (!otp) {
                alert("Enter OTP first.");
                return;
            }

            fetch("http://localhost:3000/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp })
            })
            .then(res => res.json())
            .then(data => {
                if (data.message === "OTP verified successfully") {
                    otpVerified = true;
                    showToast("otpVerifyToast");
                } else {
                    alert(data.error || "OTP verification failed.");
                    otpVerified = false;
                }
            })
            .catch(() => alert("Server error while verifying OTP."));
        }