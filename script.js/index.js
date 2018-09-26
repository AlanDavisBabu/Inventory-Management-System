function content(url) {
    req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    document.getElementById("content").innerHTML = req.responseText;
}

function home() {
    content('home/welcome.html');
    let table = document.getElementById("navbar");
    table.innerHTML = "";
    let row = `<div class="navb"><button type="button" class="active" id="home" onclick="home()">HOME</button></div>`;
    row += `<div class="nava"><button type="button" class="active" id="home" onclick="content('login/html/login.html')">LOGIN</button></div>`;
    table.innerHTML += row;

}
window.onload = function (event) {
    if (!localStorage.getItem("stock")) {
        let data = fetch('../current-stock/json/current-stock.json')
            .then(res => res.json())
            .then((out) => {
                let stock = JSON.stringify(out);
                localStorage.setItem("stock", stock);
            }).catch(err => console.error(err));
    }
    if (!localStorage.getItem("count")) {
        let data = fetch('../dashboard/json/dashboard.json')
            .then(res => res.json())
            .then((out) => {
                let count = JSON.stringify(out);
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
    let flag = localStorage.getItem("flag");
    if (flag == 1) {
        login();
    }
    if (flag == 0) {
        let table = document.getElementById("navbar");
        table.innerHTML = "";
        let row = `<div class="navb"><button type="button" class="active" id="home" onclick="home()">HOME</button></div>`;
        table.innerHTML += row;
    }
    if (!localStorage.getItem("itemCount")) {
        localStorage.setItem("itemCount", 0);
    }
    if (localStorage.getItem("datalist")) {
        let stock = JSON.parse(localStorage.getItem("stock"));
        let list=[];
        let id = 0;
        Object.keys(stock.currentStock).forEach(key => {
            Object.keys(stock.currentStock[key]).forEach(item => {
                list[id]=item;
                id++;
            })
        })
        localStorage.setItem("datalist", JSON.stringify(list));
    }
}