function outboundList(name,date) {
    content('outbound/outbound-list/html/outbound-list.html');
    let data = getItem("outbound"),
    table = document.getElementById("outboundData"),
     outbound = JSON.parse(data);
    outbound.forEach(newoutbound => {
        if ((newoutbound.Name == name)  && (newoutbound.Date == date)){
            let row = `<h4> Name :   ${newoutbound.Name}   </h4>`,
             date = new Date(newoutbound.Date);
            date = date.toDateString();
            row += `<h4> Date :  ${date}  </h4>`;
            Object.keys(newoutbound.inventory).forEach(category => {
                Object.keys(newoutbound.inventory[category]).forEach(item => {
                    row += `<ul><li> ${item}   : ${newoutbound.inventory[category][item]} ${((newoutbound.inventory[category][item] >= 1)? "boxes" : "box")}</li></ul>`;  
                })
            })
            table.innerHTML += row;
        }

    })
}