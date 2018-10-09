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
    let row = `<div class="navb"><button type="button" class="active" id="home" onclick="home()">HOME</button></div>
    <div class="nava"><button type="button" class="active" id="home" onclick="content('login/html/login.html')">LOGIN</button></div>`;
    table.innerHTML += row;

}
window.onload = function (event) {
    if (!getItem("stock")) {
        let data = fetch('./current-stock/json/current-stock.json')
            .then(res => res.json())
            .then((out) => {
                let stock = JSON.stringify(out);
                console.log(stock);

                setItem("stock", stock);
            }).catch(err => console.error(err));
    }
    if (!getItem("count")) {
        let data = fetch('./dashboard/json/dashboard.json')
            .then(res => res.json())
            .then((out) => {
                let count = JSON.stringify(out);
                setItem("count", count);
            }).catch(err => console.error(err));
    }
    if (!getItem("inbound")) {
        setItem("inbound", "[]");

    }
    if (!getItem("outbound")) {
        setItem("outbound", "[]");

    }
    if (!getItem("flag")) {
        setItem("flag", 0);
    }
    let flag = getItem("flag");
    if (flag == 1) {
        login();
    }
    if (flag == 0) {
        let table = document.getElementById("navbar");
        table.innerHTML = "";
        let row = `<div class="navb"><button type="button" class="active" id="home" onclick="home()">HOME</button></div>`;
        table.innerHTML += row;
    }
    if (!getItem("itemCount")) {
        setItem("itemCount", 0);
    }
    if (!getItem("datalist")) {
        let data = fetch('./current-stock/json/current-stock.json')
            .then(res => res.json())
            .then((stock) => {
                   let list = [],
                    id = 0;
                Object.keys(stock.currentStock).forEach(key => {
                    Object.keys(stock.currentStock[key]).forEach(item => {
                        list[id] = item;
                        id++;
                    })
                })
                setItem("datalist", JSON.stringify(list));
            }).catch(err => console.error(err));

    }
}