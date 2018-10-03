function insertOutbound() {
    setItem("itemCount", 0);
    content('outbound/outbound-insertion/html/outbound-insertion.html');
}

function outboundSubmit() 
{
    submit("outbound");
}
