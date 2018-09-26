function inboundDisplay() {
    content('inbound/html/inbound.html');
    let data = localStorage.getItem("inbound");
    let inbound = JSON.parse(data);
    for (newInbound of inbound) {
        let table = document.getElementById("inboundTable");
        let row = table.insertRow();
        row.setAttribute("onclick", `inboundList('${newInbound.Name}', '${newInbound.Date}')`);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let date = new Date(newInbound.Date);
        date = date.toDateString();
        cell1.innerHTML = newInbound.Name;
        cell2.innerHTML = date;
    }
}
