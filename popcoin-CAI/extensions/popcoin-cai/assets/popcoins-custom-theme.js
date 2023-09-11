// let cartICon = document.querySelector("#cart-icon-bubble");
// cartICon.addEventListener("click", function () {
//   console.log("clicked");
//   showPopCoins();
//   let drawerQty = document.querySelectorAll("#CartDrawer .quantity__button");
// // drawerQty.forEach((d)=>{
// //   d.addEventListener("click", function() {
// //     console.log("qty clicked");
// //   cartDrawer();
// //   cartDrawerSubTotalChanges();  
// //   });
// // });
// });
// if(window.location.href.indexOf("/product") != -1){

// let formBtn = document.querySelector(".product-form__submit");
//   formBtn.addEventListener("click", function() {
//     setTimeout(function() {
//       console.log("pdp form btn clicked");
//     showPopCoins();    
//     },1800)
//   });

// }
// let miniCart = document.querySelector("#CartDrawer");
// miniCartObserver = new MutationObserver(() => {
//   if (miniCart.classList.contains("active")) {
//       popcoinsBottomBtn.style.display = "none";
//     setTimeout(function() {
//     console.log("cart drawer active");
//     showPopCoins();
//     },1800)
//   }
//   else{
//     popcoinsBottomBtn.style.display ="block";
//   }
  
// });
// miniCartObserver.observe(miniCart, {
//   attributes: true,
//   attributeFilter: ["class"],
//   childList: true,
// });




// if(window.location.href.indexOf("/cart") != -1){
  
//    let cartText = document.querySelector("#cart-live-region-text");
//     cartTextObserver = new MutationObserver(() => {
//       console.log("in called *****************");
//       console.log("cart page active");
      
//       showPopCoins();
    
//   });
//   cartTextObserver.observe(cartText, {
//     attributes: true
//     // childList: true
//   });
// }



// let menuDrawer = document.querySelector("#Details-menu-drawer-container");
// let w = document.querySelector("#wa_btn_popup_icon");

// menuDrawerObserver = new MutationObserver(() => {
//   if (menuDrawer.hasAttribute("open")) {
//     console.log("menu drawer active");
//     popcoinsBottomBtn.style.display = "none";
//     m.style.display = "none";

//   } else {
//     popcoinsBottomBtn.style.display = "block";
//     m.style.display = "block";
//   }
// });
// menuDrawerObserver.observe(menuDrawer, {
//   attributes: open,
//   childList: true
// });
// let cartCheckbox = document.querySelector("#buy-with-pop-coins-cart-drawer-checkbox");
// cartCheckbox.addEventListener("change", function () {
//   showPopCoins();
// });
// window.addEventListener("change", function () {
//   setTimeout(function() {
//   console.log("window changed");
    
//   showPopCoins();
//   },1800)
// });

// // if (window.location.href.indexOf("/product") != -1) {
 
//   // window.onscroll = function () {
//   //   if (window.scrollY > 940) {
//   //     popcoinsBottomBtn.classList.add("stikcy-popcoins-bottom-btn");
      
//   //   } else {
//   //     popcoinsBottomBtn.classList.remove("stikcy-popcoins-bottom-btn");

//   //   }
//   // };
// // // }
// if (window.location.href.indexOf("/collection") != -1) {
//   let atc = document.querySelectorAll(".tab-cart-button .tab-show-now");
//   atc.forEach((a) => {
//     a.addEventListener("click", function() {
//       loading();
//       popcoinsBottomBtn.style.display = "none";

//     console.log("atc clicked");
//       setTimeout(function(){
        
//         showPopCoins();
//       },2500);

//     })
//   });
// }