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
    let isloggedIN = getItem("isloggedIN");
    document.getElementById("navbar").style.display="block";
    dashboard();    
}

function logout() {
    setItem("isloggedIN", 0);
    let isloggedIN = getItem("isloggedIN");
    console.log(isloggedIN);
    document.getElementById("navbar").style.display = "none";
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
    