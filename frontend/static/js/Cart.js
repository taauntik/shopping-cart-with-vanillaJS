import CartItem from "./CartItem.js";
import CartHelper from "./helper/CartHelper.js";

let count = 0;
export default class Cart {
    constructor(selector) {
        this.container = document.getElementById(selector);
        this.cart = CartHelper.getCart;
        this.cartHTML = '';
        this.loadCart();
    }

    loadCart() {
        this.cartHTML = `
            <div id="sp-cart" class="shopping-cart container">
                <!-- Title -->
                <div class="title mt-5">
                    <h1>Total Price : <span id="cart-total-price">$${CartHelper.calcTotalPrice()}<span></h1>
                </div>
                <div class="mb-5">
                    <button class="btn btn-primary" id="clear-all">CLEAR ALL <i class="fa-sharp fa-solid fa-trash"></i></button>
                </div>
                <div class="cart-wrapper shadow-sm">
        `;
        
        if (this.cart.length <= 0) {
            this.cartHTML = `<h2 class="text-center mt-5">You don't have any item in the cart :(</h2>
                <div class="d-flex justify-content-center">
                    <a href="/" data-link class="btn btn-primary">BACK TO HOME</a>
                </div>
            </div></div>`;
        } else {
            this.cart.forEach(item => {
                this.cartHTML += new CartItem(item).createHTML();
            })
        }
        this.cartHTML += '</div></div>';
        this.container.innerHTML += this.cartHTML;

        if (count === 0) {
            this.applyListeners();
            count = 1;
        }
    }

    applyListeners() {
        document.addEventListener('click', (e) => {
                const { target } = e;
                let parent = target.parentNode.nodeName !== '#document' && target.parentNode.attributes['data-product-id'];
                const productAttr = target.attributes['data-product-id'] || parent;
            if (location.pathname === '/cart') {
                // clear the shopping-cart
                if (target.matches('#clear-all') || target.parentNode.matches('#clear-all')) {
                    CartHelper.setCart = [];
                    this.cart = CartHelper.getCart;
                    CartHelper.updateNavCartValue = CartHelper.getCartItemCount;
                }

                if (productAttr && typeof productAttr.value !== 'undefined') {
                    let id = Number(productAttr.value);

                    // increase the product amount
                    if(target.matches('.plus-btn') || target.parentNode.matches('.plus-btn')) {
                        this.cart = CartHelper.getCart;
                        const clickedProduct = this.cart.find(item => item.id === id);
                        if (clickedProduct) {
                            CartHelper.addToCart(clickedProduct);
                        }
                    }

                    // decrease the product amount
                    if (target.matches('.minus-btn') || target.parentNode.matches('.minus-btn')) {
                        CartHelper.removeItemFromCart(id);
                    }

                    // remove the clicked item
                    if (target.matches('.delete-btn') || target.parentNode.matches('.delete-btn')) {
                        CartHelper.remove(id);
                    }
                }

                // remove shopping-cart from the UI when cart is empty
                if (CartHelper.getCart.length <= 0) {
                    this.cart = CartHelper.getCart;
                    if(document.querySelector('.shopping-cart') !== null) {
                        document.querySelector('.shopping-cart').remove();
                        this.loadCart();
                    }
                }
            }
        });
    }
}