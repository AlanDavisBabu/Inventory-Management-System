itemCount = 0;

function addInput() {
    var add = document.getElementById("add");
    add.insertAdjacentHTML("beforeend", `<div id='itemdiv[${ itemCount}]'> </div>`);

    var adddiv = document.getElementById("itemdiv[" + itemCount + "]");

    let a = `<input list="itemlists" class="inbounditem">
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
    quantity.setAttribute("class", "inboundquantity");
    quantity.setAttribute("type", "number");
    adddiv.appendChild(quantity);
    let b = `<button type="button" id = "deleteButton" class="deleteItem" onclick="deleteItem('${itemCount}')"> Delete </button>`;
    adddiv.insertAdjacentHTML("beforeend", b);
    itemCount++;
}

function inboundSubmit() {
    var check = 0;
    var userName = document.getElementById("name").value;
    var error;
    var items = document.getElementsByClassName("inbounditem");
    var quantities = document.getElementsByClassName("inboundquantity");
    var data = localStorage.getItem("stock");
    var stock = JSON.parse(data);
    var table = document.getElementById("currentStockData");
    if (userName == "") {
        check = 1;
        error = "*Please Enter Name";
        document.getElementById("errorinbound").innerHTML = error;
    }
    if (items.length == 0) {
        check = 1;
        error = "*Please Enter Inbound details";
        document.getElementById("errorinbound").innerHTML = error;
    }
    for (var id in items) {
        if (items[id].value == "") {
            check = 1;
            error = "*Please Enter Item";
            document.getElementById("errorinbound").innerHTML = error;
        }
    }
    for (id in quantities) {
        if (quantities[id].value == "") {
            check = 1;
            error = "*Please Enter Quantity";
            document.getElementById("errorinbound").innerHTML = error;
        }
        if (parseInt(quantities[id].value) <= 0) {
            check = 1;
            error = "*Please Enter Valid Quantity";
            document.getElementById("errorinbound").innerHTML = error;
        }
    }
    if (check == 0) {
        var request = new XMLHttpRequest();
        request.open("GET", "inbound/json/inbound.json", false);
        request.send(null);
        var newInbound = request.responseText;
        var inbound = JSON.parse(newInbound);
        inbound.Name = userName;
        inbound.Date = new Date();

        var newcount = localStorage.getItem("count");
        var count = JSON.parse(newcount);

        for (id in items) {
            for (category in stock.currentStock) {
                for (item in stock.currentStock[category]) {

                    if (item == items[id].value) {
                        stock.currentStock[category][item] += parseInt(quantities[id].value);
                        inbound.inventory[category][item] += parseInt(quantities[id].value);
                        count.inbound[category] += parseInt(quantities[id].value);
                        count.currentstock[category] += parseInt(quantities[id].value);
                    }
                }

            }

        }
        stock = JSON.stringify(stock);
        localStorage.setItem("stock", stock);
        count = JSON.stringify(count);
        localStorage.setItem("count", count);
        var newinboundlist = localStorage.getItem("inbound");
        var inboundlist = JSON.parse(newinboundlist);
        inboundlist.push(inbound);
        inboundlist = JSON.stringify(inboundlist);
        localStorage.setItem("inbound", inboundlist);
        inboundDisplay();

    }
}
