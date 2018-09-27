function insertOutbound() {
    localStorage.setItem("itemCount", 0);
    content('outbound/outbound-insertion/html/outbound-insertion.html');
}

function addRequest() {
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
    let itemCount = localStorage.getItem("itemCount");
    let add = document.getElementById("add");
    add.insertAdjacentHTML("beforeend", `<div id='itemdiv-${itemCount}' class="outbound"> </div>`);
    let adddiv = document.getElementById(`itemdiv-${itemCount}`);
    let newitemdiv = `<div class="outbounditems" ><input list="itemlists" class="outbounditem" id='outboundItem-${itemCount}'/>
    <datalist id="itemlists"></datalist></div>`;
    adddiv.insertAdjacentHTML("beforeend", newitemdiv);
    let list = document.getElementById("itemlists");
    if (itemCount==0) {
        let datalist = JSON.parse(localStorage.getItem("datalist"));
        datalist.forEach(item => {
            list.insertAdjacentHTML("beforeend", ` <option value="${item}">`);
        })
    }
    let newquantitydiv = `<div class="outboundquantities"><input class="outboundquantity" type="number" id='outboundQuantity-${itemCount}'/></div>`;
    adddiv.insertAdjacentHTML("beforeend", newquantitydiv);
    let deleteItem = `<div class="itemDelete"><button type="button" id = "deleteButton" class="deleteItem" onclick="deleteItem('${itemCount}')"> Delete </button></div>`;
    adddiv.insertAdjacentHTML("beforeend", deleteItem);
    itemCount++;
    localStorage.setItem("itemCount", itemCount);
}

function outboundSubmit() {
    let errorDiv = Array.from(document.getElementsByClassName("errorMessage"));
    if (errorDiv.length > 0) {
        errorDiv.forEach(inputElement => {
            inputElement.classList.remove("errorMessage");
            let msgId = "errorMessage" + inputElement.id;
            console.log(msgId);
            document.getElementById(msgId).remove();
        })
    }
    let itemcheck;
    let items = Array.from(document.getElementsByClassName("outbounditem"));
    let quantities = Array.from(document.getElementsByClassName("outboundquantity"));
    let stock = JSON.parse(localStorage.getItem("stock"));
    let check = 0;
    let userName = document.getElementById("name").value;
    let error;
    if (userName == "") {
        check = 1;
        error = "*Please Enter Name";
        markError("name", userName, error);
    }
    if (items.length == 0) {
        check = 1;
        error = "*Please Enter Outbound details";
        markError("home", userName, error);
    }
    items.forEach((outboundItem, id) => {
        itemcheck = 0;
        Object.keys(stock.currentStock).forEach(key => {
            Object.keys(stock.currentStock[key]).forEach(item => {
                if (item == outboundItem.value) {
                    itemcheck = 1;
                }
            })
        })
        if (itemcheck == 0) {
            check = 1;
            error = "*Please Enter Item";
            markError(("outboundItem-" + id), outboundItem, error);

        }
    })
    items.forEach((outboundItem, id) => {
        if (outboundItem == "") {
            check = 1;
            error = "*Please Enter Item";
            markError(("outboundItem-" + id), outboundItem, error);

        }
        Object.keys(stock.currentStock).forEach(key => {
            Object.keys(stock.currentStock[key]).forEach(item => {
                if (item == outboundItem.value) {
                    if (stock.currentStock[key][item] < parseInt(quantities[id].value)) {
                        check = 1;
                        error = "*Item out of stock";
                        markError(("outboundQuantity-" + id), outboundItem, error);
                    }
                }
            })
        })
    })
    quantities.forEach((outboundQuantity, id) => {
        if (quantities[id].value == "") {
            check = 1;
            error = "*Please Enter Quantity";
            markError(("outboundQuantity-" + id), quantities[id], error);
        }
        if (parseInt(quantities[id].value) <= 0) {
            check = 1;
            error = "*Please Enter Valid Quantity";
            markError(("outboundQuantity-" + id), quantities[id], error);
        }

    })
    if (check == 0) {
        let request = new XMLHttpRequest();
        request.open("GET", "outbound/json/outbound.json", false);
        request.send(null);
        let outbound = JSON.parse(request.responseText);
        outbound.Name = userName;
        outbound.Date = new Date();
        let count = JSON.parse(localStorage.getItem("count"));
        items.forEach((outboundItem, id) => {
            Object.keys(stock.currentStock).forEach(key => {
                Object.keys(stock.currentStock[key]).forEach(item => {
                    if (item == outboundItem.value) {
                        stock.currentStock[key][item] -= parseInt(quantities[id].value);
                        outbound.inventory[key][item] += parseInt(quantities[id].value);
                        count.outbound[key] += parseInt(quantities[id].value);
                        count.currentstock[key] -= parseInt(quantities[id].value);
                    }
                })
            })
        })
        localStorage.setItem("stock", JSON.stringify(stock));
        localStorage.setItem("count", JSON.stringify(count));
        let outboundlist = JSON.parse(localStorage.getItem("outbound"));
        outboundlist.push(outbound);
        localStorage.setItem("outbound", JSON.stringify(outboundlist));
        outboundDisplay();
    }
}

function deleteItem(id) {
    let div = document.getElementById(`itemdiv-${id}`);
    div.parentNode.removeChild(div);
}