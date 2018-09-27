function inboundDisplay() {
    content('inbound/html/inbound.html');
    let inbound = JSON.parse(localStorage.getItem("inbound"));
    inbound.forEach(newInbound => {
        let table = document.getElementById("inboundTable");
        let row = table.insertRow();
        row.setAttribute("onclick", `inboundList('${newInbound.Name}', '${newInbound.Date}')`);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let date = new Date(newInbound.Date);
        date = date.toDateString();
        cell1.innerHTML = newInbound.Name;
        cell2.innerHTML = date;
    })
}
