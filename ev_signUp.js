document.querySelector(".modal-content").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const chargeLevel = document.getElementById("charge-level").value;

    if (name && email && password && chargeLevel) {
        const toast = document.getElementById("toast");
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);

        e.target.reset();
    } else {
        alert("Please fill all the fields.");
    }
});



const closeButton = document.getElementById("close-signup");
console.log("close button element:", closeButton);

closeButton.addEventListener('click', () => {
    console.log("close button clicked");
    window.location.href = "ev_login.html";
    console.log("Navigation attempted");
});


const email = document.getElementById("email").value;
localStorage.setItem("userEmail", email);

fetch('http://localhost:3000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    })
    .then(res => res.text())
    .then(data => {
        alert("OTP Sent");
        window.location.href = "ev_otp.html";
    })
    .catch(err => alert("Failed to send OTP."));