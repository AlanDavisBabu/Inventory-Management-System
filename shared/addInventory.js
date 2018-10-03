function additem() {
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
    let itemCount = getItem("itemCount"),
        add = document.getElementById("add");
    add.insertAdjacentHTML("beforeend", `<div id='itemdiv-${itemCount}' class="insertion"> </div>`);
    let adddiv = document.getElementById(`itemdiv-${itemCount}`),
        newitemdiv = `<div class="items" ><input list="itemlists" class="item" id='item-${itemCount}'/>
    <datalist id="itemlists"></datalist></div>`;
    adddiv.insertAdjacentHTML("beforeend", newitemdiv);
    let list = document.getElementById("itemlists");
    if (itemCount == 0) {
        let datalist = JSON.parse(getItem("datalist"));
        datalist.forEach(item => {
            list.insertAdjacentHTML("beforeend", ` <option value="${item}">`);
        })
    }
    let newquantitydiv = `<div class="quantities"><input class="quantity" type="number" id='quantity-${itemCount}' min="1" /></div>`;
    adddiv.insertAdjacentHTML("beforeend", newquantitydiv);
    let deleteItem = `<div class="itemDelete"><button type="button" id = "deleteButton" class="deleteItem" onclick="deleteItem('${itemCount}')"> Delete </button></div>`;
    adddiv.insertAdjacentHTML("beforeend", deleteItem);
    itemCount++;
    setItem("itemCount", itemCount);
}

function submit(inventoryType) {
    let errorDiv = Array.from(document.getElementsByClassName("errorMessage"));
    if (errorDiv.length > 0) {
        errorDiv.forEach(inputElement => {
            inputElement.classList.remove("errorMessage");
            let msgId = "errorMessage" + inputElement.id;
            document.getElementById(msgId).remove();
        })
    }
    let itemcheck = 0,
        items = Array.from(document.getElementsByClassName("item")),
        quantities = Array.from(document.getElementsByClassName("quantity")),
        stock = JSON.parse(getItem("stock")),
        check = 0,
        userName = document.getElementById("name").value;
    if (userName == "") {
        check = 1;
        markError("name", "*Please Enter Name");
    }
    if (items.length == 0) {
        check = 1;
        markError("home", "*Please Enter details");
    }
    items.forEach((item, id) => {
        itemcheck = 0;
        if (item == "") {
            check = 1;
            markError(("item-" + id), "*Please Enter Item");
        }
        if (quantities[id].value == "") {
            check = 1;
            markError(("quantity-" + id), "*Please Enter Quantity");
        }
        Object.keys(stock.currentStock).forEach(key => {
            Object.keys(stock.currentStock[key]).forEach(product => {
                if (product == item.value) {
                    itemcheck = 1;
                    if (inventoryType == "outbound") {
                        if (stock.currentStock[key][product] < parseInt(quantities[id].value)) {
                            check = 1;
                            markError(("quantity-" + id), "*Item out of stock");
                        }
                    }
                    return true;
                }

            })
        })
        if (itemcheck == 0) {
            check = 1;
            markError(("item-" + id), "*Please Enter Valid Item");
        }
        if (parseInt(quantities[id].value) <= 0) {
            check = 1;
            markError(("quantity-" + id), "*Please Enter Valid Quantity");
        }
    })
    if (check == 0) {
        let request = new XMLHttpRequest();
        request.open("GET", "outbound/json/outbound.json", false);
        request.send(null);
        let type = JSON.parse(request.responseText);
        type.Name = userName;
        type.Date = new Date();
        let count = JSON.parse(getItem("count"));
        items.forEach((item, id) => {
            Object.keys(stock.currentStock).forEach((key, itemId) => {
                Object.keys(stock.currentStock[key]).forEach(product => {
                    if (product == item.value) {
                        if (inventoryType == "outbound") {
                            stock.currentStock[key][product] -= parseInt(quantities[id].value);
                            count[itemId].currentstock -= parseInt(quantities[id].value);
                        } else if (inventoryType == "inbound") {
                            stock.currentStock[key][product] += parseInt(quantities[id].value);
                            count[itemId].currentstock += parseInt(quantities[id].value);
                        }
                        type.inventory[key][product] += parseInt(quantities[id].value);
                        count[itemId].type += parseInt(quantities[id].value);
                    }
                })
            })
        })
        setItem("stock", JSON.stringify(stock));
        setItem("count", JSON.stringify(count));
        let list = JSON.parse(getItem(inventoryType));
        list.push(type);
        setItem(inventoryType, JSON.stringify(list));
        if (inventoryType == "outbound") {
            outboundDisplay();
        } else if (inventoryType == "inbound") {
            inboundDisplay();
        }
    }
}

function deleteItem(id) {
    let div = document.getElementById(`itemdiv-${id}`);
    div.parentNode.removeChild(div);
}

function markError(id, error) {
    let inputElement = document.getElementById(id);
    inputElement.classList.add("errorMessage");
    let msgId = "errorMessage" + id;
    inputElement.insertAdjacentHTML('afterend', `<span class="message" id="${msgId}">${error}</span>`);
}