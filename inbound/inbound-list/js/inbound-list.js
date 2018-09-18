function inboundList(name) {
    content('../inbound/inbound-list/html/inbound-list.html');
    var data = localStorage.getItem("inbound");
    var table = document.getElementById("inboundData");
    var inbound = JSON.parse(data);
    for (newInbound of inbound) {
        if (newInbound.Name == name) {
            var row = "<h4>" + "Name :  " + newInbound.Name + "  </h4>"
            console.log(name);
            for (category in newInbound.inventory) {
                for (item in newInbound.inventory[category]) {
                    if (newInbound.inventory[category][item] == 1) {
                        row += "<ul><li>" + item + " : " + newInbound.inventory[category][item] + " box</li></ul>";
                    }
                    else if (newInbound.inventory[category][item] > 1) {
                        row += "<ul><li>" + item + " : " + newInbound.inventory[category][item] + " boxes</li></ul>";
                    }
                }
                

            }
            table.innerHTML += row;
        }

    }
}