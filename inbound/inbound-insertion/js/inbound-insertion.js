i = 0;

function addInput() {
    var add = document.getElementById("add");
    add.insertAdjacentHTML("beforeend", "<div id='itemdiv[" + i + "]'> </div>");

    var adddiv = document.getElementById("itemdiv[" + i + "]");

    var item = document.createElement("input");
    item.setAttribute("id", "item");
    item.setAttribute("class", "inbounditem");
    adddiv.appendChild(item);

    var quantity = document.createElement("input");
    quantity.setAttribute("id", "quantity");
    quantity.setAttribute("class", "inboundquantity");
    adddiv.appendChild(quantity);

    i++;
}

function inboundSubmit() {
    var userName = document.getElementById("name").value;
    var items = document.getElementsByClassName("inbounditem");
    var quantities = document.getElementsByClassName("inboundquantity");
    var data = localStorage.getItem("stock");
    var stock = JSON.parse(data);
    var table = document.getElementById("currentStockData");

    var request = new XMLHttpRequest();
    request.open("GET", "../inbound/json/inbound.json", false);
    request.send(null);
    var newInbound = request.responseText;
    var inbound = JSON.parse(newInbound);
    inbound.Name = userName;
    inbound.Date = new Date();

    for (id in items) {
        for (category in stock.currentStock) {
            for (item in stock.currentStock[category]) {

                if (item == items[id].value) {
                    stock.currentStock[category][item] += parseInt(quantities[id].value);
                    inbound.inventory[category][item] += parseInt(quantities[id].value);
                }
            }

        }
       
    }
    stock = JSON.stringify(stock);
    localStorage.setItem("stock", stock);
    var newinboundlist = localStorage.getItem("inbound");
    var inboundlist = JSON.parse(newinboundlist);
    inboundlist.push(inbound);

    inboundlist = JSON.stringify(inboundlist);
    console.log(inboundlist);

    localStorage.setItem("inbound", inboundlist);
    inboundDisplay();

}
