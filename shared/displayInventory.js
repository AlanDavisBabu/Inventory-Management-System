function display(inventoryType) {
    let type = JSON.parse(getItem(inventoryType));
    type.forEach(newtype => {
        let table = document.getElementById(inventoryType+"Table"),
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