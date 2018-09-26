function inboundList(name,date) {
    content('inbound/inbound-list/html/inbound-list.html');
    let data = localStorage.getItem("inbound");
    let table = document.getElementById("inboundData");
    let inbound = JSON.parse(data);
    for (newInbound of inbound) {
        if ((newInbound.Name == name) && (newInbound.Date == date)) {
            let row = "<h4>" + "Name :  " + newInbound.Name + "  </h4>"
            for (category in newInbound.inventory) {
                for (item in newInbound.inventory[category]) {
                    if (newInbound.inventory[category][item] == 1) {
                        row += "<ul><li>" + item + " : " + newInbound.inventory[category][item] + " box</li></ul>";
                    } else if (newInbound.inventory[category][item] > 1) {
                        row += "<ul><li>" + item + " : " + newInbound.inventory[category][item] + " boxes</li></ul>";
                    }
                }


            }
            table.innerHTML += row;
        }

    }
}