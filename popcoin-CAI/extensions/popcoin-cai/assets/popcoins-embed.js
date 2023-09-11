console.log('CIA 8.0');
//variables
const popcoinsBottomBtn = document.querySelector("#popcoinsBottomBtn");

const popcoinBtnSpan = document.querySelector("#popcoinBtnSpan");
const popcoinsModalCloseBtn = document.querySelector("#popcoinsModalCloseBtn");

const popcoinsIframeModal = document.querySelector("#popcoinsIframeModal");
const popCoinsIframe = document.querySelector("#popcoinsIframe");
const defaultIframeURL = "https://coins.mypopcoins.com/?brand=thecaistore";
const key = customCookie();
const parameters = "?shop=" + Shopify.shop + "&key=" + key;

const rewardsName = "The CAI Club Rewards";
const rewardsCallOut = "Get upto 30% Off using";

const getAvailablePopcoinsURL =
  "https://prodreplica.mypopcoins.com/api/get-available-coins";
const getBrandURL = "https://prodreplica.mypopcoins.com/api/get-brand?shop=";
const getCartDiscountURL =
  "https://prodreplica.mypopcoins.com/api/get-coins-cart-discount";
const removeDiscountCode =
  "https://prodreplica.mypopcoins.com/api/remove-discount-code";

let popCoinsAvailable = false;
let popCoinsLoginFlag = document.querySelector("#pop-club-login-flag");
let popCoins = 0;

//PLP
// let productCard = document.querySelectorAll(".product-item .card");
// let popcoinsListingDiv = document.getElementsByClassName("pop-club-listing");

//PDP

//CART DRAWER
let cartDrawerPopcoinsLabel = document.querySelector(
  "#buy-with-pop-coins-cart-drawer-label"
);

//CART PAGE
let cartPagePopcoinsLabel = document.querySelector(
  "#buy-with-pop-coins-cart-page-label"
);

let externalCheckout = ".cart__checkout-button";
let externalCheckoutOnPDP = "#gokwik-buy-now";
const lottieAnimation = "<lottie-player class='popcoins-lottie-animation'src='https://ik.imagekit.io/t2vt6tx4m/media/112490-new-tag.json' background='transparent'  speed='1'  style='width: 60px; height: 40px;' autoplay></lottie-player>";
const rewardNameLottieAnimationLink = `The CAI Club Rewards <lottie-player class='popcoins-lottie-animation'src='https://ik.imagekit.io/t2vt6tx4m/media/112490-new-tag.json' background='transparent'  speed='1'  style='width: 60px; height: 40px;' loop autoplay></lottie-player>`;
saveBrandData();
function saveBrandData() {
  fetch(getBrandURL + Shopify.shop)
    .then((response) => response.json())
    .then((data) => {
      // myKey is not set in localStorage
      localStorage.setItem("popCoinsIframeUrl", defaultIframeURL);
      if (localStorage.getItem("popCoinsIssuance") !== null) {
        // myKey is set in localStorage
      } else {
        // myKey is not set in localStorage
        localStorage.setItem("popCoinsIssuance", data.issuance);
      }
      // myKey is not set in localStorage
      localStorage.setItem("popCoinsRedeem", data.redeem);

    })
    .catch((error) => {
      console.log("Error in brand api - popcoins ", error);
    });
}
// Cart Note Creator
// var session_key = document.cookie
//   .split('; ')
//   .find((row) => row.startsWith('_popcoin_session='))
//   ?.split('=')[1];
// if (session_key) {
//   console.log('cookies available');
// } else {
//   console.log('cookies not available');
//   let key_session = document.cookie
//     .split('; ')
//     .find((row) => row.startsWith('_shopify_s='))
//     ?.split('=')[1];
//   console.log(key_session);
//   if ((key_session === null) || (key_session === undefined)) {
//     console.log('cokkies null & undefined show');
//   } else {
//     console.log('cokkies not available & generated');
//     var now = new Date();
//     var time = now.getTime();
//     time += 3600 * 1000;
//     now.setTime(time);
//     var session_value = "first";
//     document.cookie = "_popcoin_session=" + session_value + "; expires=" + now.toUTCString() + "; path=/";
//     console.log(Shopify.shop);
//     fetch('https://prodreplica.mypopcoins.com/api/get/active/sessions?session_id=' + key_session + '&shop=' + Shopify.shop)
//       .then((response) => response.json())
//       .then((data1) => {
//         console.log(data1);
//       })
//       .catch(error => {
//         // Handle fetch error
//         console.error(error);
//       });
//   }
// }
// fetch(window.Shopify.routes.root + 'cart.js')
//   .then((response) => response.json())
//   .then((data) => {
//     let key = document.cookie.split('; ').find((row) => row.startsWith('_shopify_s='))?.split('=')[1];
//     if (key == data['note']) {
//       console.log('data same value');
//     } else {
//       let updatesnew = {
//         note: key
//       };
//       fetch(window.Shopify.routes.root + 'cart/update.js', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(updatesnew)
//       })
//         .then(response => {
//           return response.json();
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//         });
//     }
//   })

function load_iframe(isCart = false) {
  let key = document.cookie
    .split('; ')
    .find((row) => row.startsWith('_shopify_s='))
    ?.split('=')[1];
  if (window.location.href.indexOf("/products/") != -1) {
    var redeemPrices = document.getElementById("pop-club-redeem-price").value;
    let redeemCoins = redeemPrices;
    document.getElementById('popcoinsIframe').src = defaultIframeURL + "&key=" + key + "&page=pdp&discount=" + redeemCoins + '&url=' + window.location.href + ((isCart) ? '-cart' : '');
  } else {
    let cartPage = "";
    if (window.location.href.indexOf("/cart") != -1) {
      cartPage = "&page=cart";
    }
    document.getElementById('popcoinsIframe').src = defaultIframeURL + "&key=" + key + cartPage + '&url=' + window.location.href + ((isCart) ? '-cart' : '');
  }
  body.removeEventListener("mousemove", loadIframe);
  body.removeEventListener("touchstart", loadIframe);
}
const body = document.querySelector("body");
function loadIframe() {
  load_iframe();
}
function openPopcoinsModal() {
  customAddClass("body", "popcoinsModalActive");
  popcoinsIframeModal.style.display = "block";
}

function create(el) {
  var d = document;
  var element = d.createElement(el);
  element.classList.add("manual-class");
  return element;
}
body.addEventListener("mousemove", loadIframe);
body.addEventListener("touchstart", loadIframe);
document.addEventListener('DOMContentLoaded', init, { once: true });
const isMobile = window.matchMedia('(max-width: 767px)').matches;
if (isMobile) {
  document.addEventListener('DOMContentLoaded', init, { once: true });
}

function init() {
  console.log('Init called');
  setTimeout(function () {
    load_iframe();
  }, 200)
}
document.addEventListener("DOMContentLoaded", function () {
  // addPopcoinsInMenu();
  showPopCoins();

  if (window.location.href.indexOf("/cart") != -1) {
    cartPage();
    custom_checkout_btn_box();
  }
});

/* event listeners */
popcoinsBottomBtn.addEventListener("click", function () {
  if (document.querySelector("#popcoinsIframe").src.toString().includes('-cart') == false) {
    // load_iframe(true);
    openPopcoinsModal();
  }
  else {
    load_iframe(false);
    openPopcoinsModal();
  }
});

//floater close btn
popcoinsModalCloseBtn.addEventListener("click", function () {
  showPopCoins();
  popcoinsIframeModal.style.display = "none";
  customRemoveClass("body", "popcoinsModalActive");
});
if (window.location.href.indexOf("/products")) {

  let variantSelect = document.querySelector(".product-form__input select");
  if (variantSelect) {
    variantSelect.addEventListener("change", function () {
      setTimeout(function () {
        showPopCoins();
      }, 1000)
    })
  }
}
let checkBoxCart = document.querySelector('#buy-with-pop-coins-cart-page-checkbox');
if (checkBoxCart) {
  checkBoxCart.addEventListener('change', function () {
    cartPageSubTotalChanges();
  });
}
function customCookie() {
  let key = document.cookie
    .split("; ")
    .find((row) => row.startsWith("_shopify_s="))
    ?.split("=")[1];

  var name1 = "_shopify_s";
  var customCookies = document.cookie.match(
    new RegExp("(^| )" + name1 + "=([^;]+)")
  );

  if (
    key == "undefined" ||
    key == undefined ||
    key == "" ||
    customCookies == null ||
    customCookies == ""
  ) {
    // location.reload();
  }
  return key;
}

function customAddClass(identifier, className) {
  let element = document.querySelector(identifier);
  element.classList.add(className);
}

function customRemoveClass(identifier, className) {
  let element = document.querySelector(identifier);
  element.classList.remove(className);
}

function loading() {
  let popLabels = document.querySelectorAll(".popcoinsLabel");
  let popCheckboxes = document.querySelectorAll(".popcoins-login-checkbox");
  let popText = 'Calculating <img width="30" height="30" src="https://testpopcoin.looksguru.com/sandtime.gif">';
  popLabels.forEach((l) => {
    l.innerHTML = popText;
  });
  popCheckboxes.forEach((c) => {
    c.style.display = "none";
  });
}

function showPopCoins() {
  console.log("showPopCoins called");
  loading();
  showpopCoinsOnPDP();
  showpopCoinsQuickViewOnPDP();
  let plpDiv = document.querySelectorAll('.custom_collection_pop');
  fetch(getAvailablePopcoinsURL + parameters)
    .then((response) => response.json())
    .then((data) => {
      popCoins = data.coins;
      let drawerCheck = document.getElementById('buy-with-pop-coins-cart-drawer-checkbox');
      if (data.success == true) {
        if (plpDiv) {
          plpDiv.forEach(function (el) {
            el.style.display = "block";
          })
        }
        popCoinsLoginFlag.value = "true";
        popCoinsAvailable = true;
        if (window.location.href.indexOf("/cart") != -1) {
          document.getElementById('buy-with-pop-coins-cart-page-checkbox').checked = true;
        }
        if (drawerCheck) {
          drawerCheck.checked = true;
        }
      } else {
        if (plpDiv) {
          plpDiv.forEach(function (el) {
            el.style.display = "none";
          })
        }
        if (drawerCheck) {
          drawerCheck.checked = false;
        }
        popCoinsLoginFlag.value = "false";
        popCoinsAvailable = false;
        if (window.location.href.indexOf("/cart") != -1) {
          document.getElementById('buy-with-pop-coins-cart-page-checkbox').checked = false;
        }
      }
      let checkBoxCartdrawer = document.querySelector('#buy-with-pop-coins-cart-drawer-checkbox');
      if (checkBoxCartdrawer) {
        custom_checkout_btn_drawer_box();

      }
      showPopcoinsListing(data);
      popCoinsBottomBar(data);
      showPopcoinOnQuick();
      quickVariantSelector()
      quickBuyButton();
      cartDrawerSubTotalChanges();
      popcartDrawer();
      if (window.location.href.indexOf("/products") != -1) {
        variantSelector();
        popCoinsBottomBar(data);
        showpopCoinsOnPDP();
        // QUANTITY SELECTOR ON PDP
        if (window.location.href.indexOf("/product") != -1) {
          plusQtyIcon = document.querySelector(
            ".product-form__quantity .quantity"
          );
          if (plusQtyIcon) {
            plusQtyIcon.addEventListener("click", function (e) {
              popCoinsBottomBar(data);
            });
          }
        }
      }
      if (window.location.href.indexOf("/cart") != -1) {
        cartPage();
        cartPageSubTotalChanges();
        custom_checkout_btn_box()
      }
    });
  quickviewBuy_nowButton()
}
let variantChanges = document.querySelector('.product__info-container variant-radios');
if (variantChanges) {
  variantChanges.addEventListener('change', function () {
    setTimeout(function () {
      showPopCoins();
    }, 1000);
  })
}
$(document).on('change', '#buy-with-pop-coins-cart-drawer-checkbox', function () {
  cartDrawerSubTotalChanges();
})
function showPopcoinsListing(data) {
  let popcoinsDiv = document.getElementsByClassName("pop-club-listing");
  for (let i = 0; i < popcoinsDiv.length; i++) {

    let price = popcoinsDiv[i].getAttribute("price");
    if (data.success == true && price > 99) {
      if (data.coins > 0) {
        let redeemCoins = Math.round(
          (localStorage.getItem("popCoinsRedeem") / 100) * price
        );
        if (redeemCoins > data.coins && data.success == true) {
          redeemCoins = data.coins;
        }
        let redeemPrice = Math.round(price - redeemCoins);
        let popHTML =
          "<p>or Rs. " +
          redeemPrice +
          " + <span class='pop-img'><img src='https://d20pzmflnl47dv.cloudfront.net/media/coin-flat.png'> </span> " +
          redeemCoins +
          "</p>";
        popcoinsDiv[i].innerHTML = popHTML;
      }
      else {
        popcoinsDiv[i].innerHTML = "";
      }
    }
    else {
      if (price > 99) {
        let redeemCoins = Math.round(
          (localStorage.getItem("popCoinsRedeem") / 100) * price
        );
        if (redeemCoins > data.coins && data.success == true) {
          redeemCoins = data.coins;
        }
        let redeemPrice = Math.round(price - redeemCoins);
        let popHTML =
          "<p>or Rs. " +
          redeemPrice +
          " + <span class='pop-img'><img src='https://d20pzmflnl47dv.cloudfront.net/media/coin-flat.png'> </span> " +
          redeemCoins +
          "</p>";
        popcoinsDiv[i].innerHTML = popHTML;
      }
      else {
        popcoinsDiv[i].innerHTML = "";
      }
    }
  }
}
// quick view popu

function showpopCoinsQuickViewOnPDP() {
  variantSelector();
  let popcoinsPdpDiv = document.querySelector(".modal--is-active .pop-club-product");
  if (popcoinsPdpDiv) {
    let price = popcoinsPdpDiv.getAttribute("price");
    if (price > 99) {
      var priceValue = Math.floor(price);

      if (priceValue.toString().length > 2) {
        var modulePrice = priceValue % 100;
        var roundedPrice = priceValue - modulePrice;
      } else {
        var roundedPrice = 0;
      }
      let issueCoins = Math.round(
        (localStorage.getItem("popCoinsIssuance") / 100) * roundedPrice
      );
      popHTML =
        "<p id='product-issuance-msg' class='popCoinsEarnCallout'>Earn<span class='pop-img'> <img src='https://d20pzmflnl47dv.cloudfront.net/media/coin-flat.png'> </span> " +
        issueCoins +
        " on this product </p>";

      let productIssuanceMsg = document.getElementById("product-issuance-msg");
      if (productIssuanceMsg) {
        popcoinsPdpDiv.innerHTML = popHTML;
      } else {
        popcoinsPdpDiv.insertAdjacentHTML("afterbegin", popHTML);
      }
    }
  }
}
//This function
function showpopCoinsOnPDP() {
  variantSelector();
  let popcoinsPdpDiv = document.querySelector(".pop-club-product");

  if (popcoinsPdpDiv) {
    let price = popcoinsPdpDiv.getAttribute("price");
    if (price > 99) {
      var priceValue = Math.floor(price);

      if (priceValue.toString().length > 2) {
        var modulePrice = priceValue % 100;
        var roundedPrice = priceValue - modulePrice;
      } else {
        var roundedPrice = 0;
      }
      let issueCoins = Math.round(
        (localStorage.getItem("popCoinsIssuance") / 100) * roundedPrice
      );
      popHTML =
        "<p id='product-issuance-msg' class='popCoinsEarnCallout'>Earn<span class='pop-img'> <img src='https://d20pzmflnl47dv.cloudfront.net/media/coin-flat.png'> </span> " +
        issueCoins +
        " on this product </p>";

      let productIssuanceMsg = document.getElementById("product-issuance-msg");
      if (productIssuanceMsg) {
        popcoinsPdpDiv.innerHTML = popHTML;
      } else {
        popcoinsPdpDiv.insertAdjacentHTML("afterbegin", popHTML);
      }
    }
  }
}


function popCoinsBottomBar(data) {
  let popCoins = data.coins;
  let popcoinsPdpDiv = document.querySelector(".pop-club-product");

  if (popCoinsAvailable) {
    if (window.location.href.indexOf("/product") != -1) {
      if (popcoinsPdpDiv) {
        let price = popcoinsPdpDiv.getAttribute("price");
        let pdpQty = 1;
        // pdpQty = document.querySelector(
        //   ".product-form__quantity .quantity .quantity__input"
        // ); //quantity selector
        if (pdpQty) {


          let totalProductPrice = price * parseInt(1);
          let redeemCoins = Math.round(
            (localStorage.getItem("popCoinsRedeem") / 100) * totalProductPrice
          );

          document.getElementById("pop-club-redeem-price").value = redeemCoins;

          if (redeemCoins > popCoins && data.success == true) {
            redeemCoins = popCoins;
            document.getElementById("pop-club-redeem-price").value = redeemCoins;
          }
          if (popCoins == 0) {
            let popCoinBarHTML =
              '<div class="available_popcoins"><img width="30" height="30" src="https://d20pzmflnl47dv.cloudfront.net/media/coin-flat.png" loading="lazy">' +
              redeemCoins +
              '</div><span class="zeroPopcoinsCallout">Shop and Earn POPcoins</span> <img class="arrow" width="16" height="13" src="https://ecomapp-dev.s3.ap-south-1.amazonaws.com/media/arrow-right.png" loading="lazy">';
            popcoinBtnSpan.innerHTML = popCoinBarHTML;
          } else {
            let popCoinBarHTML =
              '<span class="rewards-title">' +
              rewardsName +
              "</span>" +
              rewardsCallOut +
              ' <div class="available_popcoins"><img width="30" height="30" src="https://d20pzmflnl47dv.cloudfront.net/media/coin-flat.png" loading="lazy">' +
              redeemCoins +
              '</div><img class="arrow" width="16" height="13" src="https://ecomapp-dev.s3.ap-south-1.amazonaws.com/media/arrow-right.png" loading="lazy">';
            popcoinBtnSpan.innerHTML = popCoinBarHTML;
          }
        }
      }
    } else {
      if (popCoins == 0) {
        let popCoinBarHTML =
          '<div class="available_popcoins"><img width="30" height="30" src="https://d20pzmflnl47dv.cloudfront.net/media/coin-flat.png" loading="lazy">' +
          popCoins +
          '</div><span class="zeroPopcoinsCallout">Shop and Earn POPcoins</span><img class="arrow" width="16" height="13" src="https://ecomapp-dev.s3.ap-south-1.amazonaws.com/media/arrow-right.png" loading="lazy">';
        popcoinBtnSpan.innerHTML = popCoinBarHTML;
      } else {
        let popCoinBarHTML =
          '<span class="rewards-title">' +
          rewardsName +
          "</span>" +
          rewardsCallOut +
          '<div class="available_popcoins"><img width="30" height="30" src="https://d20pzmflnl47dv.cloudfront.net/media/coin-flat.png" loading="lazy">' +
          popCoins +
          '</div><img class="arrow" width="16" height="13" src="https://ecomapp-dev.s3.ap-south-1.amazonaws.com/media/arrow-right.png" loading="lazy">';
        popcoinBtnSpan.innerHTML = popCoinBarHTML;
      }
    }
  }
}

function addPopcoinsInMenu() {

  let desktop_nav = document.querySelector("#SiteHeader .site-nav.site-navigation ");

  let li_menu = document.createElement("li");
  li_menu.setAttribute("class", "popcoinsMenu site-nav__item site-nav__expanded-item");

  let menu = document.createElement("a");
  menu.setAttribute(
    "class",
    "site-nav__link site-nav__link--underline"
  );
  menu.setAttribute("onclick", "openPopcoinsModal()");

  let menuSpan = document.createElement("span");
  menuSpan.setAttribute(
    "class",
    "text"
  );
  menuSpan.innerHTML = rewardNameLottieAnimationLink;
  menu.appendChild(menuSpan);
  li_menu.appendChild(menu);
  desktop_nav.appendChild(li_menu);

  // mobile menu
  let mobile_nav = document.querySelector("#NavDrawer .mobile-nav");
  let li_mob_menu = document.createElement("li");
  li_mob_menu.setAttribute("class", "mobile-nav__item appear-animation appear-delay-9 popcoinMobMenu");

  let mob_menu = document.createElement("a");
  mob_menu.setAttribute("onclick", "openPopcoinsModal()")
  mob_menu.setAttribute("class", "mobile-nav__link mobile-nav__link--top-level");
  mob_menu.innerHTML = rewardNameLottieAnimationLink;

  li_mob_menu.appendChild(mob_menu);
  mobile_nav.appendChild(li_mob_menu);
  jQuery('.appear-delay-8').after(jQuery('.popcoinMobMenu'));


}
function popcartDrawer() {
  let cartDrawerParentElement = document.querySelectorAll(
    ".drawer__inner .cart__items .cart__item"
  );
  let cartDrawerChildElement = ".drawer__inner .cart__items .cart__item-sub .cart__item-price-col";
  let cartDrawerPopcoinsLabel = document.querySelector(
    "#buy-with-pop-coins-cart-drawer-label"
  );
  if (cartDrawerPopcoinsLabel) {
    cartDrawerPopcoinsLabel.addEventListener("click", function () {
      if (popCoinsLoginFlag.value == "false") {
        if (document.querySelector("#popcoinsIframe").src.toString().includes('-cart') == true) {
          // load_iframe(true);
          openPopcoinsModal();
        }
        else {
          load_iframe(true);
          openPopcoinsModal();
        }
      }
    });
  }

  fetch(window.Shopify.routes.root + "cart.js", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((cartData) => {
      if (cartData["items"].length != 0) {
        let j = 0;
        cartDrawerParentElement.forEach((lineItem) => {
          let priceLenght = cartData["items"][j].price.toString().length - 2;
          let quantity = cartData["items"][j].quantity;
          let price =
            cartData["items"][j].price.toString().slice(0, priceLenght) +
            "." +
            cartData["items"][j].price.toString().slice(priceLenght);

          let priceValue = Math.floor(price);
          if (priceValue.toString().length > 2) {
            var modulePrice = priceValue % 100;
            var roundedPrice = priceValue - modulePrice;
          } else {
            var roundedPrice = 0;
          }
          let issueCoins = Math.round(
            (localStorage.getItem("popCoinsIssuance") / 100) *
            roundedPrice *
            quantity
          );
          if (issueCoins >= 5) {
            let lineItemPopcoins =
              "<p id='product-issuance-msg' class='popCoinsEarnCallout'>Earn<span class='pop-img'> <img src='https://d20pzmflnl47dv.cloudfront.net/media/coin-flat.png' loading='lazy'> </span> " +
              issueCoins.toString() +
              " </p>";

            lineItem
              .querySelector(cartDrawerChildElement)
              .appendChild(create("div"));
            lineItem
              .querySelector(cartDrawerChildElement)
              .querySelector(".manual-class").innerHTML = lineItemPopcoins;
          }

          j++;
        });
      }
    })
    .catch((error) => {
      console.log("Cart js error - popcoins", error);
    });
}

function cartPage() {
  let cartPageParentElement = document.querySelectorAll(
    ".cart__page .cart__page-col .cart__item"
  );
  let cartPageChildElement = ".cart__page .cart__page-col .cart__item .cart__item-sub .cart__item-price-col";

  if (cartPagePopcoinsLabel) {
    cartPagePopcoinsLabel.addEventListener("click", function () {
      if (popCoinsLoginFlag.value == "false") {
        openPopcoinsModal();
      }
    });
  }
  fetch(window.Shopify.routes.root + "cart.js")
    .then((response) => response.json())
    .then((cartData) => {
      if (cartData["items"].length > 0) {
        let c = 0;
        cartPageParentElement.forEach((lineItem) => {
          let priceLenght = cartData["items"][c].price.toString().length - 2;
          let quantity = cartData["items"][c].quantity;
          let price =
            cartData["items"][c].price.toString().slice(0, priceLenght) +
            "." +
            cartData["items"][c].price.toString().slice(priceLenght);
          let priceValue = Math.floor(price);
          if (priceValue.toString().length > 2) {

            let modulePrice = priceValue % 100;
            roundedPrice = priceValue - modulePrice;
          }
          else {
            roundedPrice = 0;
          }

          let issueCoins = Math.round((localStorage.getItem("popCoinsIssuance") / 100) * roundedPrice * quantity);
          if (issueCoins > 0) {
            var newstring =
              "<p id='product-issuance-msg' class='popCoinsEarnCallout'>Earn<span class='pop-img'> <img src='https://d20pzmflnl47dv.cloudfront.net/media/coin-flat.png' width='20' height='21' loading='lazy'> </span> " +
              issueCoins +
              " </p>";
            var coinDiv = lineItem.querySelector(".cart__item-price-col").querySelector(".manual-class");
            if (coinDiv != null) {
              lineItem.querySelectorAll(".manual-class").forEach((old_item) => {
                old_item.remove();
              });
            }
            lineItem.querySelector(".cart__item-price-col").appendChild(create("div"));
            lineItem.querySelector(".cart__item-price-col").querySelector(".manual-class").innerHTML = newstring;
            c++;

          }
        });
      }
    });
}

function variantSelector() {
  let regular_price = document.querySelector(".price__container .price__regular .price-item");
  if (regular_price) {
    let temp_str = regular_price.innerHTML.replace("Rs.", "").replace(",", "");
    let variantPrice = parseFloat(temp_str.trim());
    let popClubProductPrice = document.querySelector(
      ".product__info-container .pop-club-product"
    );

    if (popClubProductPrice) {
      popClubProductPrice.setAttribute("price", variantPrice);
    }
  }
}

function quickVariantSelector() {
  let regular_qv_price = document.querySelector('quick-add-modal[open] .price__container .price__regular .price-item');
  if (regular_qv_price) {
    let temp_str = regular_qv_price.innerHTML.replace("Rs.", "").replace(",", "");
    let variantPrice = parseFloat(temp_str.trim());
    let popClubProductPrice = document.querySelector(
      "quick-add-modal[open] .product__info-container .pop-club-product"
    );

    if (popClubProductPrice) {
      popClubProductPrice.setAttribute("price", variantPrice);
    }
  }
}
function showPopcoinOnQuick() {
  let popcoinsPdpDiv = document.querySelector("quick-add-modal[open] .pop-club-product");

  if (popcoinsPdpDiv) {
    let price = popcoinsPdpDiv.getAttribute("price");
    if (price > 99) {
      var priceValue = Math.floor(price);

      if (priceValue.toString().length > 2) {
        var modulePrice = priceValue % 100;
        var roundedPrice = priceValue - modulePrice;
      } else {
        var roundedPrice = 0;
      }
      let issueCoins = Math.round(
        (localStorage.getItem("popCoinsIssuance") / 100) * roundedPrice
      );
      popHTML =
        "<p id='product-issuance-msg' class='popCoinsEarnCallout'>Earn<span class='pop-img'> <img src='https://d20pzmflnl47dv.cloudfront.net/media/coin-flat.png'> </span> " +
        issueCoins +
        " on this product </p>";

      let productIssuanceMsg = document.getElementById("product-issuance-msg");
      if (productIssuanceMsg) {
        popcoinsPdpDiv.innerHTML = popHTML;
      } else {
        popcoinsPdpDiv.insertAdjacentHTML("afterbegin", popHTML);
      }
    }
  }
}
function cartPageSubTotalChanges() {
  let cartPagePopcoinsLabel = document.querySelector(
    "#buy-with-pop-coins-cart-page-label"
  );
  let cartPagePopcoinsCheckbox = document.querySelector(
    "#buy-with-pop-coins-cart-page-checkbox"
  );

  function prices_val() {
    const afterPopDiscountPrice = document.querySelector(
      ".cart__item-sub .subtotal-cart-box"
    );

    let price_value = "Rs." + " " + afterPopDiscountPrice.textContent.split(" ")[1];
    afterPopDiscountPrice.innerHTML = price_value;
  }
  fetch(getAvailablePopcoinsURL + parameters)
    .then((response) => response.json())
    .then((data) => {
      fetch(window.Shopify.routes.root + "cart.js", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((cartData) => {
          let priceLength = cartData["items_subtotal_price"].toString().length - 2;
          let price =
            cartData["items_subtotal_price"].toString().slice(0, priceLength) +
            "." +
            cartData["items_subtotal_price"].toString().slice(priceLength);
          let dataRedeem = localStorage.getItem("popCoinsRedeem");
          let dataCoins = data.coins;
          let redeemCoins = Math.round((dataRedeem / 100) * price);
          let redeemPrice = Math.round(price - redeemCoins);

          if (redeemCoins > dataCoins && popCoinsLoginFlag.value == "true") {
            redeemCoins = dataCoins;
          }
          if (cartPagePopcoinsCheckbox && cartPagePopcoinsLabel) {
            if (popCoinsLoginFlag.value == "true") {
              if (dataCoins > 0) {

                cartPagePopcoinsCheckbox.style.display = "block";
              }
              else {
                cartPagePopcoinsCheckbox.style.display = "none";
              }
              if (cartPagePopcoinsCheckbox.checked) {
                if (redeemCoins == 0) {
                  popHTML = "You have 0 POPcoins. Shop now & earn coins." + lottieAnimation;
                  cartPagePopcoinsCheckbox.checked = false;
                  cartPagePopcoinsCheckbox.style.display = "none";
                  prices_val();
                } else {
                  popHTML = "Rs. " + redeemCoins + " | Saved using POPcoins" + lottieAnimation;
                  prices_val();
                }
                const paragraph = document.querySelector(".cart__item-sub .subtotal-cart-box");

                let paragraph3 = paragraph.textContent;
                let paragraph1 = paragraph3.split(" ");
                let subTotal = paragraph1[1].replace(",", "");
                let main_value = price - redeemCoins;
                let main_value1 = parseFloat(main_value).toFixed(2);

                paragraph.innerText = paragraph1[0] + " " + main_value1;
                subTotal = price;

              } else {
                const paragraph = document.querySelector(".cart__item-sub .subtotal-cart-box");

                var paragraph3 = paragraph.textContent;
                let paragraph1 = paragraph3.split(" ");

                paragraph.innerText = paragraph1[0] + " " + price;


                if (redeemCoins == 0) {
                  popHTML = "You have 0 POPcoins. Shop now & earn coins." + lottieAnimation;
                  cartPagePopcoinsCheckbox.checked = false;
                  prices_val();
                } else {
                  popHTML =
                    "Save Rs. " + redeemCoins + " using POPcoins" + lottieAnimation;
                  prices_val();
                }
              }
            } else {
              cartPagePopcoinsCheckbox.checked = false;
              cartPagePopcoinsCheckbox.style.display = "none";
              popHTML =
                "<span class='popCoinsClickBtn'>Click</span><span class='popCoinsClickCallout'> & get upto 30% off using POPcoins</span>" + lottieAnimation;
            }
            cartPagePopcoinsLabel.innerHTML = popHTML;
          }
        });
    })
}

function cartDrawerSubTotalChanges() {
  let cartDrawerPopcoinsLabel = document.querySelector(
    "#buy-with-pop-coins-cart-drawer-label"
  );
  let cartDrawerPopcoinsCheckbox = document.querySelector(
    "#buy-with-pop-coins-cart-drawer-checkbox"
  );

  function cartDrawer_prices_val() {
    const afterPopDiscountPrice = document.querySelector(
      ".cart__item-sub .subtotal-drawer-box"
    );

    let price_value = "Rs." + " " + afterPopDiscountPrice.textContent.split(" ")[1];
    afterPopDiscountPrice.innerHTML = price_value;
  }

  fetch(window.Shopify.routes.root + "cart.js", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((cartData) => {
      let priceLength = cartData["items_subtotal_price"].toString().length - 2;
      let price =
        cartData["items_subtotal_price"].toString().slice(0, priceLength) +
        "." +
        cartData["items_subtotal_price"].toString().slice(priceLength);
      let dataRedeem = localStorage.getItem("popCoinsRedeem");
      let dataCoins = popCoins;
      let redeemCoins = Math.round((dataRedeem / 100) * price);
      let redeemPrice = Math.round(price - redeemCoins);

      if (redeemCoins > dataCoins && popCoinsLoginFlag.value == "true") {
        redeemCoins = dataCoins;
      }
      if (cartDrawerPopcoinsCheckbox && cartDrawerPopcoinsLabel) {
        if (popCoinsLoginFlag.value == "true") {
          if (dataCoins > 0) {

            cartDrawerPopcoinsCheckbox.style.display = "block";
          }
          else {
            cartDrawerPopcoinsCheckbox.style.display = "none";
          }
          if (cartDrawerPopcoinsCheckbox.checked) {
            if (redeemCoins == 0) {
              console.log('hey here?');
              popHTML = "You have 0 POPcoins. Shop now & earn coins.";
              cartDrawerPopcoinsCheckbox.checked = false;
              cartDrawerPopcoinsCheckbox.style.display = "none";
              cartDrawer_prices_val();
            } else {
              cartDrawer_prices_val();
              popHTML =
                "Rs. " +
                redeemCoins +
                " | Saved using POPcoins";
            }

            const paragraph = document.querySelector(".cart__item-sub .subtotal-drawer-box");

            let paragraph3 = paragraph.textContent;
            let paragraph1 = paragraph3.split(" ");
            let subTotal = paragraph1[1].replace(",", "");
            let main_value = price - redeemCoins;
            let main_value1 = parseFloat(main_value).toFixed(2);

            paragraph.innerText = paragraph1[0] + " " + main_value1;
            subTotal = price;

          } else {
            const paragraph = document.querySelector(".cart__item-sub .subtotal-drawer-box");

            var paragraph3 = paragraph.textContent;
            let paragraph1 = paragraph3.split(" ");

            paragraph.innerText = paragraph1[0] + " " + price;

            if (redeemCoins == 0) {
              popHTML = "You have 0 POPcoins. Shop now & earn coins.";
              cartDrawerPopcoinsCheckbox.checked = false;
              cartDrawer_prices_val();
            } else {
              popHTML = "Save Rs." + redeemCoins + " using POPcoins";
              cartDrawer_prices_val();
            }
          }
        } else {
          cartDrawerPopcoinsCheckbox.checked = false;
          cartDrawerPopcoinsCheckbox.style.display = "none";
          popHTML =
            "<span class='popCoinsClickBtn'>Click</span><span class='popCoinsClickCallout'> & get upto 30% off using POPcoins</span>";
        }
        cartDrawerPopcoinsLabel.innerHTML = popHTML + lottieAnimation;
      }
    });
}
// without dynamic checkout 
function createPopCheckoutCart() {
  fetch(window.Shopify.routes.root + 'cart.js')
    .then((response) => response.json())
    .then((data) => {
      let key = document.cookie
        .split('; ')
        .find((row) => row.startsWith('_shopify_s='))
        ?.split('=')[1];
      var name1 = '_shopify_s';
      var hiteshcokkies = document.cookie.match(new RegExp('(^| )' + name1 + '=([^;]+)'));
      if (key == 'undefined' || key == undefined || key == '' || hiteshcokkies == null || hiteshcokkies == '') {
      }

      let priceLenght = (data['items_subtotal_price'].toString().length) - 2;
      let price = data['items_subtotal_price'].toString().slice(0, priceLenght) + "." + data['items_subtotal_price'].toString().slice(priceLenght);
      let variants = '';
      for (let i = 0; i < data['items'].length; i++) {
        variants += data['items'][i]['variant_id'] + '-' + data['items'][i]['quantity'] + ',';
      }
      let parameters = '?cart=' + price + '&shop=' + Shopify.shop + '&key=' + key + '&variants=' + variants;
      fetch('https://prodreplica.mypopcoins.com/api/get-coins-cart' + parameters)
        .then((response) => response.json())
        .then((data) => {
          if (data.success == true) {
            window.location = data.url;
          } else if (data.success == false) {
            openPopModal3(key);
          }
        });
    });
}

function createPopCheckout() {
  let variantId = document.getElementById("pop-club-product-id");
  let quantity = document.getElementsByName("quantity");
  var qty = quantity.length < 1 ? 1 : quantity[0].value;

  let key = document.cookie
    .split('; ')
    .find((row) => row.startsWith('_shopify_s='))
    ?.split('=')[1];
  var name1 = '_shopify_s';
  var hiteshcokkies = document.cookie.match(new RegExp('(^| )' + name1 + '=([^;]+)'));

  if (key == 'undefined' || key == undefined || key == '' || hiteshcokkies == null || hiteshcokkies == '') {
  }
  let parameters;
  parameters = '?variant=' + variantId.value + '&shop=' + Shopify.shop + '&key=' + key + '&quantity=' + qty;
  fetch('https://prodreplica.mypopcoins.com/api/get-coins' + parameters)
    .then((response) => response.json())
    .then((data) => {
      if (data.success == true) {
        window.location = data.url;
      } else if (data.success == false) {
        openPopModal3(key);
      }
    });
}

// quick buy now button
function createPopCheckoutQuickbuy() {
  let variantId = document.querySelector(".modal--is-active #pop-club-product-id-modal");
  let quantity = document.getElementsByName("quantity");
  var qty = quantity.length < 1 ? 1 : quantity[0].value;

  let key = document.cookie
    .split('; ')
    .find((row) => row.startsWith('_shopify_s='))
    ?.split('=')[1];
  var name1 = '_shopify_s';
  var hiteshcokkies = document.cookie.match(new RegExp('(^| )' + name1 + '=([^;]+)'));

  if (key == 'undefined' || key == undefined || key == '' || hiteshcokkies == null || hiteshcokkies == '') {
  }
  let parameters;
  parameters = '?variant=' + variantId.value + '&shop=' + Shopify.shop + '&key=' + key + '&quantity=' + qty;
  fetch('https://prodreplica.mypopcoins.com/api/get-coins' + parameters)
    .then((response) => response.json())
    .then((data) => {
      if (data.success == true) {
        window.location = data.url;
      } else if (data.success == false) {
        openPopModal3(key);
      }
    });
}
// end
function custom_checkout_btn_drawer_box() {
  let shopifyCheckoutWithDiscount_drawer = document.querySelector('.custom-checkout-button');
  if (shopifyCheckoutWithDiscount_drawer) {
    shopifyCheckoutWithDiscount_drawer.addEventListener('click', function (e) {
      let checkboxPopCoins_drawer = document.getElementById("buy-with-pop-coins-cart-drawer-checkbox").checked;
      if (checkboxPopCoins_drawer) {
        e.preventDefault();
        createPopCheckoutCart();
      } else {
        $(".shopify-checkout").click();
      }
    })
  }

}

function custom_checkout_btn_box() {
  let shopifyCheckoutWithDiscount = document.querySelector('.custom-page-checkout-button');
  if (shopifyCheckoutWithDiscount) {
    shopifyCheckoutWithDiscount.addEventListener('click', function (e) {
      let checkboxPopCoins = document.getElementById("buy-with-pop-coins-cart-page-checkbox").checked;
      if (checkboxPopCoins) {
        e.preventDefault();
        createPopCheckoutCart();
      } else {
        $(".shopify-checkout-page").click();
      }
    })
  }
}
function quickBuyButton() {
  const quickBuyDefaultButton = document.getElementById('shopify-payment-button-popapp');
  if (quickBuyDefaultButton) {
    quickBuyDefaultButton.addEventListener("click", function (e) {
      e.preventDefault();
      if (document.getElementById("pop-club-login-flag").value == "true" && document.getElementById("pop-club-redeem-price").value > 0) {
        createPopCheckout();
      } else {
        document.querySelector('[data-testid="Checkout-button"]').click();
      }
    });
  }
}
// end

// quickviewIDbuynow
function quickviewBuy_nowButton() {
  const quickBuyDefaultButton = document.querySelector('.modal--is-active #shopify-payment-button-popapp-modal');
  if (quickBuyDefaultButton) {
    quickBuyDefaultButton.addEventListener("click", function (e) {
      e.preventDefault();
      if (document.getElementById("pop-club-login-flag").value == "true") {
        createPopCheckoutQuickbuy();
      } else {
        document.querySelector('[data-testid]').click();
      }
    });
  }
}
if (window.location.href.indexOf("/product") != -1) {
  $(document).ready(function () {
    setTimeout(function () {
      if ($('.pre-order-2-button').length != 0) {
        $('#shopify-payment-button-popapp').hide();
      }
    }, 1000)
  })
}