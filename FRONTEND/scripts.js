function showLogin() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("register-form").style.display = "none";
}

function showRegister() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
}

async function registerUser() {
    let fullName = document.getElementById("full-name").value;
    let email = document.getElementById("register-email").value;
    let password = document.getElementById("register-password").value;
    let userType = document.getElementById("user-type").value;

    let response = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, userType }),
    });

    let data = await response.json();
    alert(data.message || data.error);
}

async function loginUser() {
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    let response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    let data = await response.json();
    if (response.ok) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("userType", data.userType);
        alert("Login successful!");
    } else {
        alert(data.error);
    }
}
