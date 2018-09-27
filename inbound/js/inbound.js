function inboundDisplay() {
    content('inbound/html/inbound.html');
    let inbound = JSON.parse(getItem("inbound"));
    inbound.forEach(newInbound => {
        let table = document.getElementById("inboundTable"),
        row = table.insertRow();
        row.setAttribute("onclick", `inboundList('${newInbound.Name}', '${newInbound.Date}')`);
        let cell1 = row.insertCell(0),
        cell2 = row.insertCell(1),
        date = new Date(newInbound.Date);
        date = date.toDateString();
        cell1.innerHTML = newInbound.Name;
        cell2.innerHTML = date;
    })
}
