const routes = [
    {
    html: 'welcome/html/welcome.html',
    javascriptFunction: '',
    name: 'welcome',
    script: '',
    style: '<link rel="stylesheet" href="home/css/welcome.css" />',
    },
    {
    html: 'login/html/login.html',
    javascriptFunction: 'checkSubmit',
    name: 'login',
    script: 'login/js/login.js',
    style: '<link rel="stylesheet" href="login/css/login.css" />',
    },
    {
    html: 'dashboard/html/dashboard.html',
    javascriptFunction: 'loadChart',
    name: 'dashboard',
    script: 'dashboard/js/dashboard.js',
    style: '<link rel="stylesheet" href="dashboard/css/dashboard.css" />',
    url: 'dashboard'
    },
    {
    html: 'current-stock/html/current-stock.html',
    javascriptFunction: 'displayCurrentStock',
    name: 'current-stock',
    script: 'current-stock/js/current-stock.js',
    style: '<link rel="stylesheet"  href="current-stock/css/current-stock.css" />',
    url: 'current-stock'
    },
    {
    html: 'inbound/inbound-list/html/inbound-list.html',
    javascriptFunction: 'inventory',
    name: 'inbound',
    script: 'shared/js/inventory-list.js',
    style: '<link rel="stylesheet"  href="shared/css/inventory-list.css" />',
    url: 'inbound'
    },
    {
    html: 'inbound/newinbound/html/newinbound.html',
    javascriptFunction: 'createNewInventory',
    name: 'newinbound',
    script: 'shared/js/new-inventory.js',
    style: '<link rel="stylesheet" href="shared/css/newinventory.css" />',
    },
    {
    html: 'inbound/inbound-product-list/html/inbound-product-list.html',
    javascriptFunction: 'productList',
    name: 'inbound-product-list',
    script: 'shared/js/inventory-product-list.js',
    style: '<link rel="stylesheet" href="shared/css/inventory-product-list.css" />',
    url: 'inbound/inbound-product-list'
    }
    ]
    function redirectTo(name, inventoryType, inventoryName, inventoryDate) {
    //Route details are read.
    var route = routes.filter(function (newRoute) { return newRoute.name === name })[0];
    

    
    //load the required CSS files.
    document.getElementById("styles").innerHTML = route.style;
    
    //The corresponding html section is rendered.
    containerContent(route.html);
    
    //The corresponding script file is loaded.
    let parent = document.getElementById("JSscripts");
    let childScript = document.createElement("script");
    childScript.src = route.script;
    childScript.onload = function () {
    //inventoryName, inventoryDate is only for the function redirectTo('inventory-product-list').
    if (route.javascriptFunction) window[route.javascriptFunction](inventoryType, inventoryName, inventoryDate);
    }
    parent.innerHTML = '';
    parent.appendChild(childScript);
    }
    
    