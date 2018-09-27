function insertInbound() {
    set("itemCount", 0);
    content('inbound/inbound-insertion/html/inbound-insertion.html');
}

function addInput() {
    let errorDiv = Array.from(document.getElementsByClassName("errorMessage"));
    if (errorDiv.length > 0) {
        errorDiv.forEach(inputElement => {
            if (inputElement.id == "home") {
                inputElement.classList.remove("errorMessage");
                let msgId = "errorMessage" + inputElement.id;
                document.getElementById(msgId).remove();
            }
        })
    }
    let itemCount = get("itemCount");
    let add = document.getElementById("add");
    add.insertAdjacentHTML("beforeend", `<div id='itemdiv-${itemCount}' class="inbound"> </div>`);
    let adddiv = document.getElementById(`itemdiv-${itemCount}`);
    let newitemdiv = `<div class="inbounditems" ><input list="itemlists" class="inbounditem" id='inboundItem-${itemCount}'/>
    <datalist id="itemlists"></datalist></div>`;
    adddiv.insertAdjacentHTML("beforeend", newitemdiv);
    let list = document.getElementById("itemlists");
    if (itemCount==0) {
        let datalist = JSON.parse(get("datalist"));
        datalist.forEach(item => {
            list.insertAdjacentHTML("beforeend", ` <option value="${item}">`);
        })
    }
    let newquantitydiv = `<div class="inboundquantities"><input class="inboundquantity" type="number" id='inboundQuantity-${itemCount}' min="1" /></div>`;
    adddiv.insertAdjacentHTML("beforeend", newquantitydiv);
    let deleteItem = `<div class="itemDelete"><button type="button" id = "deleteButton" class="deleteItem" onclick="deleteItem('${itemCount}')"> Delete </button></div>`;
    adddiv.insertAdjacentHTML("beforeend", deleteItem);
    itemCount++;
    set("itemCount", itemCount);
}

function inboundSubmit() {
    let errorDiv = Array.from(document.getElementsByClassName("errorMessage"));
    if (errorDiv.length > 0) {
        errorDiv.forEach(inputElement => {
            inputElement.classList.remove("errorMessage");
            let msgId = "errorMessage"+inputElement.id;
            document.getElementById(msgId).remove();
        })

    }
    let check = 0;
    let itemcheck;
    let userName = document.getElementById("name").value;
    let items = Array.from(document.getElementsByClassName("inbounditem"));
    let quantities = Array.from(document.getElementsByClassName("inboundquantity"));
    let stock = JSON.parse(get("stock"));
    if (userName == "") {
        check = 1;
        markError("name", "*Please Enter Name");
    }
    if (!items.length) {
        check = 1;
        markError("home", "*Please Enter Inbound details");
    }
    items.forEach((inboundItem, id) => {
        itemcheck = 0;
        Object.keys(stock.currentStock).forEach(key => {
            Object.keys(stock.currentStock[key]).forEach(item => {
                if (item == inboundItem.value) {
                    itemcheck = 1;
                }
            })
        })
        if (itemcheck == 0) {
            check = 1;
            markError(("inboundItem-" + id), "*Please Enter Item");
        }
    })
    items.forEach((inboundItem, id) => {
        if (inboundItem == "") {
            check = 1;
            markError(("inboundItem-" + id), "*Please Enter Item");

        }
    })
    quantities.forEach((inboundQuantity, id) => {
        if (quantities[id].value == "") {
            check = 1;
            markError(("inboundQuantity-" + id), "*Please Enter Quantity");
        }
        if (parseInt(quantities[id].value) <= 0) {
            check = 1;
            markError(("inboundQuantity-" + id), "*Please Enter Valid Quantity");
        }
    })
    if (check == 0) {
        let request = new XMLHttpRequest();
        request.open("GET", "inbound/json/inbound.json", false);
        request.send(null);
        let inbound = JSON.parse(request.responseText);
        inbound.Name = userName;
        inbound.Date = new Date();
        let count = JSON.parse(get("count"));
        items.forEach((inboundItem, id) => {
            Object.keys(stock.currentStock).forEach(key => {
                Object.keys(stock.currentStock[key]).forEach(item => {
                    if (item == inboundItem.value) {
                        stock.currentStock[key][item] += parseInt(quantities[id].value);
                        inbound.inventory[key][item] += parseInt(quantities[id].value);
                        count.inbound[key] += parseInt(quantities[id].value);
                        count.currentstock[key] += parseInt(quantities[id].value);
                    }
                })
            })
        })
        set("stock", JSON.stringify(stock));
        set("count", JSON.stringify(count));
        let inboundlist = JSON.parse(get("inbound"));
        inboundlist.push(inbound);
        set("inbound", JSON.stringify(inboundlist));
        inboundDisplay();
    }
}

function markError(id,error) {
    var inputElement = document.getElementById(id);
    inputElement.classList.add("errorMessage");
    let msgId = "errorMessage"+id;
    inputElement.insertAdjacentHTML('afterend', `<span class="message" id="${msgId}">${error}</span>`);
}