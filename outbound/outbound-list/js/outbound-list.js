function outboundList(name,date) {
    content('outbound/outbound-list/html/outbound-list.html');
    let data = localStorage.getItem("outbound");
    let table = document.getElementById("outboundData");
    let outbound = JSON.parse(data);
    outbound.forEach(newoutbound => {
        if ((newoutbound.Name == name)  && (newoutbound.Date == date)){
            let row = "<h4>" + "Name :  " + newoutbound.Name + "  </h4>"
            let date = new Date(newoutbound.Date);
            date = date.toDateString();
            row += "<h4>" + "Date :  " + date + "  </h4>"
            Object.keys(newoutbound.inventory).forEach(category => {
                Object.keys(newoutbound.inventory[category]).forEach(item => {
                    if (newoutbound.inventory[category][item] == 1) {
                        row += "<ul><li>" + item + " : " + newoutbound.inventory[category][item] + " box</li></ul>";
                    }
                    else if (newoutbound.inventory[category][item] > 1) {
                        row += "<ul><li>" + item + " : " + newoutbound.inventory[category][item] + " boxes</li></ul>";
                    }
                })
                

            })
            table.innerHTML += row;
        }

    })
}