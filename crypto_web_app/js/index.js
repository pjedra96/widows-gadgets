function getCryptoData(currency_arg){
    var container = document.querySelector('#gadgetContent');
    container.innerHTML = ''; // Empty the container

    var xhttp = new XMLHttpRequest();
    var url = "https://api.coingecko.com/api/v3/simple/";
    var params = `price?ids=bitcoin%2Cethereum%2Ctether%2CClitecoin%2Ccardano%2C&vs_currencies=${currency_arg}&include_24hr_change=true`;
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(this.responseText);
            const coins = Object.getOwnPropertyNames(json);
            
            for (let coin of coins) {
                const coinInfo = json[`${coin}`];
                const price = coinInfo[`${currency_arg}`];
                const change = coinInfo[`${currency_arg}_24h_change`].toFixed(5);

                container.innerHTML += `
                    <div class="coin ${change < 0 ? 'falling' : 'rising'}">
                        <div class="coin-logo">
                            <img src="images/${coin}.png">
                        </div>
                        <div class="coin-name">
                            <h3>${coin}</h3>
                        </div>
                        <div class="coin-price">
                            <span class="price">${getCurrencySymbols(currency_arg, price)}</span>
                            <span class="change">${getCurrencySymbols(currency_arg, change)}</span>
                        </div>
                    </div>
            `;
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