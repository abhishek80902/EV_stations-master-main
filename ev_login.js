document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".modal-content").addEventListener("submit", async function (e) {
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

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Success toast
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
    });
});
