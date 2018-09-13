function current()
{
var data = localStorage.getItem("stock");
var stock = JSON.parse(data);
var table = document.getElementById("currentStockData");


for (category in stock.currentStock) {
    var row = "<ul><li><h4>" + category + " : </h4>";

    for (item in stock.currentStock[category]) {
        if (typeof (stock.currentStock[category][item]) == "object") {
            row += "<ul><li>" + item + " : " + "<ul>";
            for (subcategory in stock.currentStock[category][item]) {
                row += "<li>" + subcategory + " : " + stock.currentStock[category][item][subcategory] + "</li>";
            }
            row += "</ul></li></ul>";
        } else {
            row += "<ul><li>" + item + " : " + stock.currentStock[category][item] + "</li></ul>";
        }
    }
    row += "</li></ul>";
    table.innerHTML += row;

}}
function call()
{
    content('../current-stock/html/current-stock.html');
    current();
}