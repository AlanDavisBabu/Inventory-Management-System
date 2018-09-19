function content(url) {
    req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    document.getElementById("content").innerHTML = req.responseText;
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
}