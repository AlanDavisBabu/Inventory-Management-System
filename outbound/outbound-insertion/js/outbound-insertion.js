itemCount = 0;

function addRequest() {
    var add = document.getElementById("add");
    add.insertAdjacentHTML("beforeend", `<div id='itemdiv[${ itemCount}]'> </div>`);
    var adddiv = document.getElementById("itemdiv[" + itemCount + "]");
    let a = `<input list="itemlists" class="outbounditem">
    <datalist id="itemlists"></datalist>`;
    adddiv.insertAdjacentHTML("beforeend", a);
    var list = document.getElementById("itemlists");
    var data = localStorage.getItem("stock");
    var stock = JSON.parse(data);
    for (category in stock.currentStock) {
        for (var item in stock.currentStock[category]) {
            list.insertAdjacentHTML("beforeend", ` <option value="${item}">`);
        }
    }
    var quantity = document.createElement("input");
    quantity.setAttribute("id", "quantity");
    quantity.setAttribute("class", "outboundquantity");
    quantity.setAttribute("type", "number");
    adddiv.appendChild(quantity);
    let b = `<button type="button" id = "deleteButton" class="deleteItem" onclick="deleteItem('${itemCount}')"> Delete </button>`;
    adddiv.insertAdjacentHTML("beforeend", b);
    itemCount++;
}

function outboundSubmit() {
    var check = 0;
    var userName = document.getElementById("name").value;
    var error;
    var items = document.getElementsByClassName("outbounditem");
    var quantities = document.getElementsByClassName("outboundquantity");
    var data = localStorage.getItem("stock");
    var stock = JSON.parse(data);
    var table = document.getElementById("currentStockData");
    if (userName == "") {
        check = 1;
        error = "*Please Enter Name";
        document.getElementById("erroroutbound").innerHTML = error;
    }
    if (items.length == 0) {
        check = 1;
        error = "*Please Enter Inbound details";
        document.getElementById("erroroutbound").innerHTML = error;
    }
    for (var id in items) {
        if (items[id].value == "") {
            check = 1;
            error = "*Please Enter Item";
            document.getElementById("erroroutbound").innerHTML = error;
        }
    }
    for (id in quantities) {
        if (quantities[id].value == "") {
            check = 1;
            error = "*Please Enter Quantity";
            document.getElementById("erroroutbound").innerHTML = error;
        }
        if (parseInt(quantities[id].value) <= 0) {
            check = 1;
            error = "*Please Enter Valid Quantity";
            document.getElementById("erroroutbound").innerHTML = error;
        }
        for (category in stock.currentStock) {
            for (item in stock.currentStock[category]) {
                if (item == items[id].value) {
                    if (stock.currentStock[category][item] < parseInt(quantities[id].value)) {
                        check = 1;
                        error = "*Item out of stock";
                        document.getElementById("erroroutbound").innerHTML = error;

                    }
                }
            }
        }
    }
    if (check == 0) {
        var request = new XMLHttpRequest();
        request.open("GET", "outbound/json/outbound.json", false);
        request.send(null);
        var newOutbound = request.responseText;
        var outbound = JSON.parse(newOutbound);
        outbound.Name = userName;
        outbound.Date = new Date();
        var newcount = localStorage.getItem("count");
        var count = JSON.parse(newcount);
        for (id in items) {
            for (category in stock.currentStock) {
                for (item in stock.currentStock[category]) {
                    if (item == items[id].value) {
                        stock.currentStock[category][item] -= parseInt(quantities[id].value);
                        outbound.inventory[category][item] += parseInt(quantities[id].value);
                        count.outbound[category] += parseInt(quantities[id].value);
                        count.currentstock[category] -= parseInt(quantities[id].value);
                    }
                }
            }
        }
        stock = JSON.stringify(stock);
        localStorage.setItem("stock", stock);
        count = JSON.stringify(count);
        localStorage.setItem("count", count);
        var newoutboundlist = localStorage.getItem("outbound");
        var outboundlist = JSON.parse(newoutboundlist);
        outboundlist.push(outbound);
        outboundlist = JSON.stringify(outboundlist);
        localStorage.setItem("outbound", outboundlist);
        outboundDisplay();
    }
}

function deleteItem(id) {
    let div = document.getElementById(`itemdiv[${id}]`);
    div.parentNode.removeChild(div);
    }