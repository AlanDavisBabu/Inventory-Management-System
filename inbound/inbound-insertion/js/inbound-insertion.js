function insertInbound() {
    localStorage.setItem("itemCount", 0);
    content('inbound/inbound-insertion/html/inbound-insertion.html');
}

function addInput() {
    let itemCount = localStorage.getItem("itemCount");
    let add = document.getElementById("add");
    add.insertAdjacentHTML("beforeend", `<div id='itemdiv-${itemCount}' class="inbound"> </div>`);
    let adddiv = document.getElementById(`itemdiv-${itemCount}`);
    let newitemdiv = `<div class="inbounditems" ><input list="itemlists" class="inbounditem" id='inboundItem-${itemCount}'/>
    <datalist id="itemlists"></datalist></div>`;
    adddiv.insertAdjacentHTML("beforeend", newitemdiv);
    let list = document.getElementById("itemlists");
    if (itemCount==0) {
        let datalist = JSON.parse(localStorage.getItem("datalist"));
        datalist.forEach(item => {
            list.insertAdjacentHTML("beforeend", ` <option value="${item}">`);
        })
    }
    let newquantitydiv = `<div class="inboundquantities"><input class="inboundquantity" type="number" id='inboundQuantity-${itemCount}'/></div>`;
    adddiv.insertAdjacentHTML("beforeend", newquantitydiv);
    let deleteItem = `<div class="itemDelete"><button type="button" id = "deleteButton" class="deleteItem" onclick="deleteItem('${itemCount}')"> Delete </button></div>`;
    adddiv.insertAdjacentHTML("beforeend", deleteItem);
    itemCount++;
    localStorage.setItem("itemCount", itemCount);
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
    let stock = JSON.parse(localStorage.getItem("stock"));
    if (userName == "") {
        check = 1;
        let error = "*Please Enter Name";
        markError("name", userName, error);
    }
    if (!items.length) {
        check = 1;
        document.getElementById("errorinbound").innerHTML = "*Please Enter Inbound details";
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
            let error = "*Please Enter Item";
            markError(("inboundItem-" + id), inboundItem, error);

        }
    })
    items.forEach((inboundItem, id) => {
        if (inboundItem == "") {
            check = 1;
            let error = "*Please Enter Item";
            markError(("inboundItem-" + id), inboundItem, error);

        }
    })
    quantities.forEach((inboundQuantity, id) => {
        if (quantities[id].value == "") {
            check = 1;
            let error = "*Please Enter Quantity";
            markError(("inboundQuantity-" + id), quantities[id], error);
        }
        if (parseInt(quantities[id].value) <= 0) {
            check = 1;
            let error = "*Please Enter Valid Quantity";
            markError(("inboundQuantity-" + id), quantities[id], error);
        }
    })
    if (check == 0) {
        let request = new XMLHttpRequest();
        request.open("GET", "inbound/json/inbound.json", false);
        request.send(null);
        let inbound = JSON.parse(request.responseText);
        inbound.Name = userName;
        inbound.Date = new Date();
        let count = JSON.parse(localStorage.getItem("count"));
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
        localStorage.setItem("stock", JSON.stringify(stock));
        localStorage.setItem("count", JSON.stringify(count));
        let inboundlist = JSON.parse(localStorage.getItem("inbound"));
        inboundlist.push(inbound);
        localStorage.setItem("inbound", JSON.stringify(inboundlist));
        inboundDisplay();
    }
}

function markError(id, inputField, error) {
    var inputElement = document.getElementById(id);
    inputElement.classList.add("errorMessage");
    let msgId = "errorMessage"+id;
    inputElement.insertAdjacentHTML('afterend', `<span class="message" id="${msgId}">${error}</span>`);
}