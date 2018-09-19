function outboundDisplay() {
    content('outbound/html/outbound.html');
    var data = localStorage.getItem("outbound");
    var outbound = JSON.parse(data);
    for (newoutbound of outbound) {
        var table = document.getElementById("outboundTable");
        var row = table.insertRow(0);
        row.setAttribute("onclick", `outboundList('${newoutbound.Name}')`);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var date = new Date(newoutbound.Date);
        date = date.toDateString();
        cell1.innerHTML = newoutbound.Name;
        cell2.innerHTML = date;
    }
}