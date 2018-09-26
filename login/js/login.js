function authUser() {
    let userName = document.getElementById("username").value;
    let userPassword = document.getElementById("password").value;
    let userFound = 0;
    let message;
    if ((userName == "") || (userPassword == "")) {
        message = "*Please enter Username and Password";
        document.getElementById("message").innerHTML = message;
    } else {
        fetch('login/json/login.json')
            .then(res => res.json())
            .then((out) => {
                out.users.forEach(element => {

                    if ((element.username === userName) && (element.password === userPassword)) {
                        userFound = 1;
                        login();
                    }
                });
                if (!userFound) {
                    message = "*Entered Username or Password is invalid";
                    document.getElementById("message").innerHTML = message;
                }
            }).catch(err => console.error(err));
    }
}

function login() {
    localStorage.setItem("flag", 1);
    let flag = localStorage.getItem("flag");
    let table = document.getElementById("navbar");
    table.innerHTML = "";
    let row = `<div class="navb"><div class="navc"><button type="button" class="active" id="dashboard" onclick="content('dashboard/html/dashboard.html')">DASHBOARD</button></div> 
    <div class="navc"><button type="button" class="active" id="currentstock" onclick="call()">CURRENT STOCK</button></div>
    <div class="navc"><button type="button" class="active" id="inbound" onclick="inboundDisplay()">INBOUND</button></div>
    <div class="navc"><button type="button" class="active" id="outbound" onclick="outboundDisplay()">OUTBOUND</button></div></div>
    <div class="nava"><button type="button" class="active" id="outbound" onclick="logout()">LOGOUT</button></div>`;
    table.innerHTML += row;
    content('dashboard/html/dashboard.html');
}

function logout() {
    localStorage.setItem("flag", 0);
    let flag = localStorage.getItem("flag");
    console.log(flag);
    home();
}