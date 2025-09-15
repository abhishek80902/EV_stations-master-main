
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".modal-content").addEventListener("submit", function (e) {
        e.preventDefault();

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        if (!emailInput || !passwordInput) {
            alert("Form elements not found!");
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert("Please fill all the fields.");
            return;
        }

        // ✅ No backend: just redirect to homepage
        const toast = document.getElementById("toast");
        toast.textContent = "Login successful!";
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
            window.location.href = "ev_search.html"; // redirect to home
        }, 1500);

        e.target.reset();
    });
});

