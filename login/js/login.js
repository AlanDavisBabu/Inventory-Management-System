function authUser() {
    var userName = document.getElementById("username").value;
    var userPassword = document.getElementById("password").value;
    var userFound = 0;
    var message;
    if ((userName == "") || (userPassword == "")) {
        message = "*Please enter Username and Password";
        document.getElementById("message").innerHTML = message;
    } else {
        fetch('../login/json/login.json')
            .then(res => res.json())
            .then((out) => {
                out.users.forEach(element => {

                    if ((element.username === userName) && (element.password === userPassword)) {
                        userFound = 1;
                        content('../dashboard/html/dashboard.html');
                    }
                });
                if (!userFound) {
                    message = "*Entered Username or Password is invalid";
                    document.getElementById("message").innerHTML = message;
                }
            }).catch(err => console.error(err));
    }
}