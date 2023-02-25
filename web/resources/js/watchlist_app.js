

import "../css/custom.css";
// require("noty/src/noty.scss");
// require("noty/src/themes/mint.scss");

window.Noty = require('noty');
window.axios = require('axios');

// $shop = 'https://widget-app-laravel.myshopify.com/';

    var watchlistButton = document.querySelector('.watchlist-btn');


function addWatchlist(customer, product_id,appDomain,) {
       console.log({shop_id: Shopify.shop,customer_id: customer, product_id: product_id }); 
    axios.post(appDomain+'api/addToWatchlist', {shop_id: Shopify.shop,customer_id: customer, product_id: product_id })
        .then(response => {

            console.log("Response: ", response);
        })
        .catch( error => {
            console.log("ERROR: ", error);
        }); 


    // new Noty({
    //     type: 'success',
    //     layout: 'topRight',
    //     timeout: 3000,
    //     text: 'Added to Watchlist'
    // }).show();

    // ajax
}


function removeWatchlist(customer, product_id) {


    axios.post(appDomain+'api/removeWatchlist', {shop_id: Shopify.shop,customer_id: customer, product_id: product_id })
        .then(response => {
            console.log("Response: ", response);
        })
        .catch( error => {
            console.log("ERROR: ", error);
        });

    //  new Noty({
    //     type: 'warning',
    //     layout: 'topRight',
    //     timeout: 3000,
    //     text: 'Removed from Watchlist'
    // }).show();
}

function checkWatchlist(customer, product_id) {


    axios.post(appDomain+'/api/checkWatchlist', {shop_id: Shopify.shop,customer_id: customer, product_id: product_id })
        .then(response => {
            if (response.data == 1) {
                watchlistButton.classList.add('active');
            }
        })
        .catch( error => {
            console.log("ERROR: ", error);
        });

}


watchlistButton.addEventListener('click', function () {
    var customer = this.dataset.customer;
    var id = this.dataset.product;
    var appDomain = this.dataset.appDomain;
    if (this.classList.contains('active')) {
        removeWatchlist(customer, id,appDomain);
        this.classList.remove('active');

    }else{
        this.classList.add('active');
        // console.log('This: ', this.dataset.product );
        addWatchlist(customer, id,appDomain);

    }

})

if (watchlistButton) {
    // var customer = watchlistButton.dataset.customer;
    // var id = watchlistButton.dataset.product;
    // var appDomain = watchlistButton.dataset.appDomain;
    // checkWatchlist(customer,id,appDomain);
    watchlistButton.forEach(element => console.log(element));

}

