itemCount = 0;

function addRequest() {
    var add = document.getElementById("add");
    add.insertAdjacentHTML("beforeend", `<div id='itemdiv[${ itemCount}]'> </div>`);

    var adddiv = document.getElementById("itemdiv[" + itemCount + "]");

    var item = document.createElement("input");
    item.setAttribute("id", "item");
    item.setAttribute("class", "outbounditem");
    adddiv.appendChild(item);

    var quantity = document.createElement("input");
    quantity.setAttribute("id", "quantity");
    quantity.setAttribute("class", "outboundquantity");
    adddiv.appendChild(quantity);

    itemCount++;
}

function outboundSubmit() {
    var userName = document.getElementById("name").value;
    var items = document.getElementsByClassName("outbounditem");
    var quantities = document.getElementsByClassName("outboundquantity");
    var data = localStorage.getItem("stock");
    var stock = JSON.parse(data);
    var table = document.getElementById("currentStockData");

    var request = new XMLHttpRequest();
    request.open("GET", "../outbound/json/outbound.json", false);
    request.send(null);
    var newOutbound = request.responseText;
    var outbound = JSON.parse(newOutbound);
    outbound.Name = userName;
    outbound.Date = new Date();

    for (id in items) {
        for (category in stock.currentStock) {
            for (item in stock.currentStock[category]) {

                if (item == items[id].value) {
                    stock.currentStock[category][item] -= parseInt(quantities[id].value);
                    outbound.inventory[category][item] += parseInt(quantities[id].value);
                }
            }

        }
       
    }
    stock = JSON.stringify(stock);
    localStorage.setItem("stock", stock);
    var newoutboundlist = localStorage.getItem("outbound");
    var outboundlist = JSON.parse(newoutboundlist);
    outboundlist.push(outbound);

    outboundlist = JSON.stringify(outboundlist);

    localStorage.setItem("outbound", outboundlist);
    outboundDisplay();

}
