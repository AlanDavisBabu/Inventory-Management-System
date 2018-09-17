function current()
{
var data = localStorage.getItem("stock");
var stock = JSON.parse(data);
var table = document.getElementById("currentStockData");


for (category in stock.currentStock) {
    var row = "<ul><li><h4>" + category + " : </h4>";

    for (item in stock.currentStock[category]) {
            row += "<ul><li>" + item + " : " + stock.currentStock[category][item] + "</li></ul>";
    }
    row += "</li></ul>";
    table.innerHTML += row;

}}
function call()
{
    content('../current-stock/html/current-stock.html');
    current();
}