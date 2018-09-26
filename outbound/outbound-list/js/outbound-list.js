function outboundList(name,date) {
    content('outbound/outbound-list/html/outbound-list.html');
    let data = localStorage.getItem("outbound");
    let table = document.getElementById("outboundData");
    let outbound = JSON.parse(data);
    for (newoutbound of outbound) {
        if ((newoutbound.Name == name)  && (newoutbound.Date == date)){
            let row = "<h4>" + "Name :  " + newoutbound.Name + "  </h4>"
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