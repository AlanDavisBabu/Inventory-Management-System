i =0;
function addInput() {
    var add= document.getElementById("add");
    add.innerHTML += "<div id='itemdiv["+i+"]'> </div>";
    
    var adddiv= document.getElementById("itemdiv["+i+"]");

    var item =  document.createElement("input");
    item.setAttribute("id","item");
    adddiv.appendChild(item);

    var quantity =  document.createElement("input");
    quantity.setAttribute("id","quantity");
    adddiv.appendChild(quantity);
    
    i++;
}