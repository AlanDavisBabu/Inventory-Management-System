function call() {
    content('current-stock/html/current-stock.html');
    let stock = JSON.parse(getItem("stock")),
    table = document.getElementById("currentStockData");
    Object.keys(stock.currentStock).forEach(category => {
        let row = `<ul><li><h4> ${category}  : </h4>`;
        Object.keys(stock.currentStock[category]).forEach(item => {
                row += `<ul><li> ${item}   : ${stock.currentStock[category][item]} ${(stock.currentStock[category][item] >= 1)? "boxes" : "box"}</li></ul>`;
        })
        row += `</li></ul>`;
        table.innerHTML += row;
    })

}
