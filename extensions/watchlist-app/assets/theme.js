//import axios from '../assets/axios'; 
//const axios = require('../assets/axios.min.js');
var watchlistButton = document.querySelector('.watchlist-btn');
console.log(watchlistButton);
function addWatchlist(customer,product_id,appDomain,customer_email) {
          console.log({customerEmail: customerEmail }); 
          axios.post(appDomain+'/api/addToWatchlist', {shop_id: Shopify.shop,customer_id: customer, product_id: product_id, customerEmail: customerEmail })
              .then(response => {
                  if (response.status == 200) {
                     watchlistButton.innerHTML="Added To WishList"; 
                  }  
                  console.log("Response: ", response);
              })
              .catch( error => {
                  console.log("ERROR: ", error);
              });
     }

function removeWatchlist(customer, product_id) {
    axios.post(appDomain+'/api/removeWatchlist', {shop_id: Shopify.shop,customer_id: customer, product_id: product_id })
        .then(response => {
        if (response.status == 200) {
          watchlistButton.innerHTML="Add To WishList"; 
        }
            console.log("Response: ", response);
        })
        .catch( error => {
            console.log("ERROR: ", error);
        });
}

function checkWatchlist(customer, product_id) {
    console.log("111111");
    axios.post(appDomain+'/api/checkWatchlist', {shop_id: Shopify.shop,customer_id: customer, product_id: product_id })
        .then(response => {
            if (response.data == 1) {
                watchlistButton.classList.add('active');
                watchlistButton.innerHTML="Added To WishList";
            }
        })
        .catch( error => {
            console.log("ERROR: ", error);
        });
}

watchlistButton.addEventListener('click', function () {
    var customer = this.dataset.customer;
    if (!customer) {
        window.location = window.location.origin+'/account/login';
    } 
    var id = this.dataset.product;
    var appDomain = this.dataset.appDomain;
    if (this.classList.contains('active')) {
        removeWatchlist(customer, id,appDomain);
        this.classList.remove('active');
    }else{
        this.classList.add('active');
         console.log('This: ', this.dataset.customerEmail );
        addWatchlist(customer, id,appDomain);
    }

})

if (watchlistButton) {
    var customer = watchlistButton.dataset.customer;
    var customerEmail = watchlistButton.dataset.customerEmail;
    var id = watchlistButton.dataset.product;
    var appDomain = watchlistButton.dataset.appDomain;
    checkWatchlist(customer,id,appDomain,customerEmail);
}

