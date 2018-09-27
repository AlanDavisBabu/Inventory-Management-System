function inboundList(name,date) {
    content('inbound/inbound-list/html/inbound-list.html');
    let table = document.getElementById("inboundData");
    let inbound = JSON.parse(get("inbound"));
    inbound.forEach(newInbound => {
        if ((newInbound.Name == name) && (newInbound.Date == date)) {
            console.log(newInbound.Name);
            let row = "<h4>" + "Name :  " + newInbound.Name + "  </h4>" 
            let date = new Date(newInbound.Date);
            date = date.toDateString();
            row += "<h4>" + "Date :  " + date + "  </h4>"
            Object.keys(newInbound.inventory).forEach(category => {
                Object.keys(newInbound.inventory[category]).forEach(item => {
                    if (newInbound.inventory[category][item] == 1) {
                        row += "<ul><li>" + item + " : " + newInbound.inventory[category][item] + " box</li></ul>";
                    } else if (newInbound.inventory[category][item] > 1) {
                        row += "<ul><li>" + item + " : " + newInbound.inventory[category][item] + " boxes</li></ul>";
                    }
                })
            })
            table.innerHTML += row;
        }
    })
}