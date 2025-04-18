document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".modal-content").addEventListener("submit", function(e) {
        e.preventDefault();


        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        if (!emailInput || !passwordInput) {
            alert("Form elements not found!");
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        console.log(email, password);

        if (email && password) {
            const toast = document.getElementById("toast");
            toast.classList.add("show");

            setTimeout(() => {
                toast.classList.remove("show");
                window.location.href = "ev_routing.html";
            }, 3000);

            e.target.reset();
        } else {
            alert("Please fill all the fields.");
        }

    });
});