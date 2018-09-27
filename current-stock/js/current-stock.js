function call() {
    content('current-stock/html/current-stock.html');
    let stock = JSON.parse(get("stock"));
    let table = document.getElementById("currentStockData");
    Object.keys(stock.currentStock).forEach(category => {
        let row = `<ul><li><h4> ${category}  : </h4>`;
        Object.keys(stock.currentStock[category]).forEach(item => {
            let element = (stock.currentStock[category][item] >= 1)? "boxes" : "box";
                row += `<ul><li> ${item}   : ${stock.currentStock[category][item]} ${element}</li></ul>`;
        })
        row += `</li></ul>`;
        table.innerHTML += row;
    })

}
