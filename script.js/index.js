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
    if (!get("stock")) {
        let data = fetch('../current-stock/json/current-stock.json')
            .then(res => res.json())
            .then((out) => {
                let stock = JSON.stringify(out);
                set("stock", stock);
            }).catch(err => console.error(err));
    }
    if (!get("count")) {
        let data = fetch('../dashboard/json/dashboard.json')
            .then(res => res.json())
            .then((out) => {
                let count = JSON.stringify(out);
                set("count", count);
            }).catch(err => console.error(err));
    }
    if (!get("inbound")) {
        set("inbound", "[]");

    }
    if (!get("outbound")) {
        set("outbound", "[]");

    }
    if (!get("flag")) {
        set("flag", 0);
    }
    let flag = get("flag");
    if (flag == 1) {
        login();
    }
    if (flag == 0) {
        let table = document.getElementById("navbar");
        table.innerHTML = "";
        let row = `<div class="navb"><button type="button" class="active" id="home" onclick="home()">HOME</button></div>`;
        table.innerHTML += row;
    }
    if (!get("itemCount")) {
        set("itemCount", 0);
    }
    if (get("datalist")) {
        let stock = JSON.parse(get("stock"));
        let list=[];
        let id = 0;
        Object.keys(stock.currentStock).forEach(key => {
            Object.keys(stock.currentStock[key]).forEach(item => {
                list[id]=item;
                id++;
            })
        })
        set("datalist", JSON.stringify(list));
    }
}