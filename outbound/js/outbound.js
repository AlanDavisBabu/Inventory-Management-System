function outboundDisplay() {
    content('outbound/html/outbound.html');
    let data = localStorage.getItem("outbound");
    let outbound = JSON.parse(data);
    for (newoutbound of outbound) {
        let table = document.getElementById("outboundTable");
        let row = table.insertRow();
        row.setAttribute("onclick", `outboundList('${newoutbound.Name}', '${newoutbound.Date}' )`);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let date = new Date(newoutbound.Date);
        date = date.toDateString();
        cell1.innerHTML = newoutbound.Name;
        cell2.innerHTML = date;
    }
}