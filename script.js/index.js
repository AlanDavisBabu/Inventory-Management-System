function content(url) {
    req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    document.getElementById("content").innerHTML = req.responseText;
}

function home() {
    content('home/welcome.html');
    var table = document.getElementById("navbar");
    table.innerHTML = "";
    var row = `<div class="navb"><button type="button" class="active" id="home" onclick="home()">HOME</button></div>`;
    row += `<div class="nava"><button type="button" class="active" id="home" onclick="content('login/html/login.html')">LOGIN</button></div>`;
    table.innerHTML += row;
    
}
window.onload = function (event) {
    if (!localStorage.getItem("stock")) {
        var data = fetch('../current-stock/json/current-stock.json')
            .then(res => res.json())
            .then((out) => {
                var stock = JSON.stringify(out);
                localStorage.setItem("stock", stock);
            }).catch(err => console.error(err));
    }
    if (!localStorage.getItem("count")) {
        var data = fetch('../dashboard/json/dashboard.json')
            .then(res => res.json())
            .then((out) => {
                var count = JSON.stringify(out);
                localStorage.setItem("count", count);
            }).catch(err => console.error(err));
    }
    if (!localStorage.getItem("inbound")) {
        localStorage.setItem("inbound", "[]");

    }
    if (!localStorage.getItem("outbound")) {
        localStorage.setItem("outbound", "[]");

    }
    if (!localStorage.getItem("flag")) {
        localStorage.setItem("flag", 0);
    }
    var flag = localStorage.getItem("flag");
    if (flag == 1) {
        login();
    }
    if (flag == 0) {
        var table = document.getElementById("navbar");
        table.innerHTML = "";
        var row = `<div class="navb"><button type="button" class="active" id="home" onclick="home()">HOME</button></div>`;
        table.innerHTML += row;
    }

}