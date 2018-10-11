function call() {
    content('current-stock/html/current-stock.html');
    let stock = JSON.parse(getItem("stock")),
        table = document.getElementById("currentStockData");
    Object.keys(stock.currentStock).forEach(category => {
        let row = `<ul><li><h3> ${category}  : </h3>`,
            tableName = category + "Table",
            bodyName = category + "tbody",
            tablename = "#" + category + "Table";
        row += `<div class="displaytable"><table id="${tableName}"><thead><th>ITEM</th><th>QUANTITY (Box)</th></thead><tbody id="${bodyName}"></tbody></table></div>`;

        $(document).ready(() => {
            $(tablename).DataTable({
                responsive: true,
                paging: false,
                filter: false,
                info: false
            });
        });
        table.innerHTML += row;
        Object.keys(stock.currentStock[category]).forEach(item => {
            row += `<ul><li> ${item}   : ${stock.currentStock[category][item]} ${(stock.currentStock[category][item] >= 1)? "boxes" : "box"}</li></ul>`;
            let list = document.getElementById(bodyName),
                newrow = list.insertRow();
            let cell1 = newrow.insertCell(0),
                cell2 = newrow.insertCell(1);
            cell1.innerHTML = item;
            cell2.innerHTML = stock.currentStock[category][item];
        })
        row += `</li></ul>`;

    })

}