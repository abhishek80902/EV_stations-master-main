
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
            window.location.href = "/";
        });

       