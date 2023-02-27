function getCryptoData(currency_arg){
    // If no argument provided get the settings value
    if(!currency_arg) currency_arg = System.Gadget.Settings.read("currency");

    var xhttp = new XMLHttpRequest();
    var url = "https://api.coingecko.com/api/v3/simple/";
    var params = `price?ids=bitcoin%2Cethereum%2Ctether%2CClitecoin%2Ccardano%2C&vs_currencies=${currency_arg}&include_24hr_change=true`;
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            var coins = Object.getOwnPropertyNames(json);
            
            var rows = document.getElementsByClassName("coin");
            for (let i = 0; i < rows.length; i++) {
                for (let coin of coins) {
                    const coinInfo = json[`${coin}`];
                    const price = coinInfo[`${currency_arg}`];
                    const change = coinInfo[`${currency_arg}_24h_change`].toFixed(3);
                    
                    rows[i].classList.add(change < 0 ? 'falling' : 'rising');
                    rows[i].childNodes[5].childNodes[1].innerText = getCurrencySymbols(currency_arg, price); // Current price
                    rows[i].childNodes[5].childNodes[3].innerText = getCurrencySymbols(currency_arg, change);; // change
                }
            }
        }
    }
    xhttp.open("GET", url +params, true);
    xhttp.send();
}

function getCurrencySymbols(currency, price){
    switch(currency){
        case "pln":
            return price + " PLN";
        case "gbp":
            return "£" + price;
        case "eur":
            return "€" + price;
        case "usd":
            return "$" + price;
        default:
            return price + " PLN";
    }
}