function inboundList(name,date) {
    content('inbound/inbound-list/html/inbound-list.html');
    let table = document.getElementById("inboundData"),
    inbound = JSON.parse(getItem("inbound"));
    inbound.forEach(newInbound => {
        if ((newInbound.Name == name) && (newInbound.Date == date)) {
            let row = `<h4> Name :   ${newInbound.Name}   </h4>`,
            date = new Date(newInbound.Date);
           date = date.toDateString();
           row += `<h4> Date :  ${date}  </h4>`;
            Object.keys(newInbound.inventory).forEach(category => {
                Object.keys(newInbound.inventory[category]).forEach(item => {
                    row += `<ul><li> ${item}   : ${newInbound.inventory[category][item]} ${((newInbound.inventory[category][item] >= 1)? "boxes" : "box")}</li></ul>`;
                })
            })
            table.innerHTML += row;
        }
    })
}