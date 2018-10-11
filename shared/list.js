function list(name, date, inventoryType) {
    let id = inventoryType + "Data",
        table = document.getElementById(id),
        list = JSON.parse(getItem(inventoryType));
    list.forEach(newlist => {
        if ((newlist.Name == name) && (newlist.Date == date)) {
            let row = `<h4> Name :   ${newlist.Name}   </h4>`,
                date = new Date(newlist.Date);
            date = date.toDateString();
            row += `<h4> Date :  ${date}  </h4>`;
            row += `<div class="displaytable"><table id="listTable"><thead><th>ITEM</th><th>QUANTITY (Box)</th></thead><tbody id="listtbody"></tbody></table></div>`;
            table.innerHTML += row;
            $(document).ready(() => {
                $('#listTable').DataTable({
                    lengthMenu: [10, 15, 25],
                    responsive: true
                });
            });
            Object.keys(newlist.inventory).forEach(category => {
                Object.keys(newlist.inventory[category]).forEach(item => {
                    if (newlist.inventory[category][item] > 0) {
                        let list = document.getElementById(`listtbody`),
                        newrow =list.insertRow();
                        let cell1 = newrow.insertCell(0),
                        cell2 = newrow.insertCell(1);
                        cell1.innerHTML = item;
                        cell2.innerHTML = newlist.inventory[category][item];
                    }
                })
            })

        }

    })
}