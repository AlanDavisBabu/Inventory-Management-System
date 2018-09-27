function call() {
    content('current-stock/html/current-stock.html');
    let stock = JSON.parse(localStorage.getItem("stock"));
    let table = document.getElementById("currentStockData");
    Object.keys(stock.currentStock).forEach(category => {
        let row = "<ul><li><h4>" + category + " : </h4>";
        Object.keys(stock.currentStock[category]).forEach(item => {
            if (stock.currentStock[category][item] <= 1) {
                row += "<ul><li>" + item + " : " + stock.currentStock[category][item] + " box</li></ul>";
            } else if (stock.currentStock[category][item] > 1) {
                row += "<ul><li>" + item + " : " + stock.currentStock[category][item] + " boxes</li></ul>";
            }
        })
        row += "</li></ul>";
        table.innerHTML += row;
    })

}
