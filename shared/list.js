function list(name, date, inventoryType) {
        let id = inventoryType+"Data",
        table = document.getElementById(id),
        list = JSON.parse(getItem(inventoryType));
    list.forEach(newlist => {
        if ((newlist.Name == name) && (newlist.Date == date)) {
            let row = `<h4> Name :   ${newlist.Name}   </h4>`,
                date = new Date(newlist.Date);
            date = date.toDateString();
            row += `<h4> Date :  ${date}  </h4>`;
            Object.keys(newlist.inventory).forEach(category => {
                Object.keys(newlist.inventory[category]).forEach(item => {
                    if (newlist.inventory[category][item]>0) {
                        row += `<ul><li> ${item}   : ${newlist.inventory[category][item]} ${((newlist.inventory[category][item] >= 1)? "boxes" : "box")}</li></ul>`;
                    }
                })
            })
            table.innerHTML += row;
        }

    })
}