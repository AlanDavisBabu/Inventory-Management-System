function dashboard()
{
    content('dashboard/html/dashboard.html');
    drawGraph();
}

function authUser() {
    let userName = document.getElementById("username").value,
     userPassword = document.getElementById("password").value,
     userFound = 0;
    if ((userName == "") || (userPassword == "")) {
        document.getElementById("message").innerHTML = "*Please enter Username and Password";
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
                    document.getElementById("message").innerHTML = "*Entered Username or Password is invalid";
                }
            }).catch(err => console.error(err));
    }
}

function login() {
    setItem("isloggedIN", 1);
    let isloggedIN = getItem("isloggedIN"),
    table = document.getElementById("navbar");
    table.innerHTML = "";
    let row = `<div class="navb"><div class="navc"><button type="button" class="active" id="dashboard" onclick="dashboard()">DASHBOARD</button></div> 
    <div class="navc"><button type="button" class="active" id="currentstock" onclick="call()">CURRENT STOCK</button></div>
    <div class="navc"><button type="button" class="active" id="inbound" onclick="inboundDisplay()">INBOUND</button></div>
    <div class="navc"><button type="button" class="active" id="outbound" onclick="outboundDisplay()">OUTBOUND</button></div></div>
    <div class="nava"><button type="button" class="active" id="outbound" onclick="logout()">LOGOUT</button></div>`;
    table.innerHTML += row;
    dashboard();    
}

function logout() {
    setItem("isloggedIN", 0);
    let isloggedIN = getItem("isloggedIN");
    console.log(isloggedIN);
    let table = document.getElementById("navbar");
    table.innerHTML = "";
    home();
}

function checkSubmit(e) {
    let input = document.getElementById("userpassword");
    input.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
    document.getElementById("home").click();
    }
    });
    }
    