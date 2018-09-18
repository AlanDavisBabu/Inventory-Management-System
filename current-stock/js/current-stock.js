function call() {
    content('../current-stock/html/current-stock.html');
    var data = localStorage.getItem("stock");
    var stock = JSON.parse(data);
    var table = document.getElementById("currentStockData");


    for (category in stock.currentStock) {
        var row = "<ul><li><h4>" + category + " : </h4>";

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