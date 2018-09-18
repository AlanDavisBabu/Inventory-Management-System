function inboundDisplay() {
    content('../inbound/html/inbound.html');
    var data = localStorage.getItem("inbound");
    var inbound = JSON.parse(data);
    for (newInbound of inbound) {
        var table = document.getElementById("inboundTable");
        var row = table.insertRow(0);
        row.setAttribute("onclick", `inboundList('${newInbound.Name}')`);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var date = new Date(newInbound.Date);
        date = date.toDateString();
        cell1.innerHTML = newInbound.Name;
        cell2.innerHTML = date;
    }
}
