function call() {
    content('current-stock/html/current-stock.html');
    let data = localStorage.getItem("stock");
    let stock = JSON.parse(data);
    let table = document.getElementById("currentStockData");


    for (category in stock.currentStock) {
        let row = "<ul><li><h4>" + category + " : </h4>";

        for (item in stock.currentStock[category]) {
            if (stock.currentStock[category][item] <= 1) {
                row += "<ul><li>" + item + " : " + stock.currentStock[category][item] + " box</li></ul>";
            } else if (stock.currentStock[category][item] > 1) {
                row += "<ul><li>" + item + " : " + stock.currentStock[category][item] + " boxes</li></ul>";
            }
        }

        row += "</li></ul>";
        table.innerHTML += row;

    }
}