function display(inventoryType) {
    let type = JSON.parse(getItem(inventoryType));
    let add = document.getElementById("inventoryDisplay");
    if (type == "") {
        add.insertAdjacentHTML("beforeend", `<div class = "displaymessage"><h4>No ${inventoryType} to display.</h4><div>`);
    } else { 
        add.insertAdjacentHTML("beforeend", `<div class="displaytable"><table id="inventoryTable"><thead><th>NAME</th><th>DATE</th></thead><tbody id="inventorytbody"></tbody></table></div>`);
        $(document).ready(() => {
            $('#inventoryTable').DataTable({
            lengthMenu: [8, 15, 25],
            responsive: true
            });
            });
        type.forEach(newtype => {
            let table = document.getElementById(`inventorytbody`),
                row = table.insertRow();
            row.setAttribute("onclick", `${inventoryType}List('${newtype.Name}', '${newtype.Date}' )`);
            let cell1 = row.insertCell(0),
                cell2 = row.insertCell(1),
                date = new Date(newtype.Date);
            date = date.toDateString();
            cell1.innerHTML = newtype.Name;
            cell2.innerHTML = date;
        })
    }
}