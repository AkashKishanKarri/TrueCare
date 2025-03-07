document.addEventListener("DOMContentLoaded", function () {

    const user = localStorage.getItem("user");
    const welcomeMessage = document.getElementById("welcomeMessage");
    const authLink = document.getElementById("authLink");

    if (user) {
        welcomeMessage.textContent = `Hi, ${user}`;
        authLink.textContent = "Logout";
        authLink.href = "#";
        authLink.addEventListener("click", function () {
            localStorage.removeItem("user");
            window.location.href = "login.html";
        });
    } else {
        welcomeMessage.textContent = "Hi, Guest";
        authLink.textContent = "Login/Register";
        authLink.href = "login.html";
    }


    document.querySelectorAll(".service").forEach(service => {
        service.addEventListener("click", function () {
            const serviceName = service.querySelector("h3").textContent.trim();
            let servicePage = "";

            switch (serviceName) {
                case "Babysitting":
                    servicePage = "babysitting.html";
                    break;
                case "Pet Care":
                    servicePage = "petcare.html";
                    break;
                case "Elderly Care":
                    servicePage = "elderlycare.html";
                    break;
                case "Household Help":
                    servicePage = "householdhelp.html";
                    break;
                default:
                    return;
            }

            window.location.href = servicePage;
        });
    });


    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault();

            
            const name = document.getElementById("name").value;
            const service = document.getElementById("service").value;
            const date = document.getElementById("date").value;
            const address = document.getElementById("address").value;

            
            if (!name || !service || !date || !address) {
                alert("Please fill all fields before submitting.");
                return;
            }

            
            const bookingData = {
                name: name,
                service: service,
                date: date,
                address: address
            };

            
            localStorage.setItem("bookingData", JSON.stringify(bookingData));

            
            window.location.href = "thankyou.html";
        });
    }


    const bookingDetailsContainer = document.getElementById("bookingDetails");
    if (bookingDetailsContainer) {
        const bookingData = localStorage.getItem("bookingData");

        if (bookingData) {
            const details = JSON.parse(bookingData);
            bookingDetailsContainer.innerHTML = `
                <p><strong>Name:</strong> ${details.name}</p>
                <p><strong>Service:</strong> ${details.service}</p>
                <p><strong>Date:</strong> ${details.date}</p>
                <p><strong>Address:</strong> ${details.address}</p>
            `;
        } else {
            bookingDetailsContainer.innerHTML = "<p>No booking details available.</p>";
        }
    }


    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            if (!username) {
                alert("Please enter a username.");
                return;
            }

            localStorage.setItem("user", username);
            window.location.href = "index.html";
        });
    }
});