function outboundList(name) {
    content('outbound/outbound-list/html/outbound-list.html');
    var data = localStorage.getItem("outbound");
    var table = document.getElementById("outboundData");
    var outbound = JSON.parse(data);
    for (newoutbound of outbound) {
        if (newoutbound.Name == name) {
            var row = "<h4>" + "Name :  " + newoutbound.Name + "  </h4>"
            for (category in newoutbound.inventory) {
                for (item in newoutbound.inventory[category]) {
                    if (newoutbound.inventory[category][item] == 1) {
                        row += "<ul><li>" + item + " : " + newoutbound.inventory[category][item] + " box</li></ul>";
                    }
                    else if (newoutbound.inventory[category][item] > 1) {
                        row += "<ul><li>" + item + " : " + newoutbound.inventory[category][item] + " boxes</li></ul>";
                    }
                }
                

            }
            table.innerHTML += row;
        }

    }
}