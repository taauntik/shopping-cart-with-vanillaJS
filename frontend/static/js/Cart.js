import CartItem from "./CartItem.js";
import CartHelper from "./helper/CartHelper.js";

let container = '';
let count = 0;
let cart = CartHelper.getCart;


export default function Cart (selector) {
    container = document.getElementById(selector);
    cart = CartHelper.getCart;
    loadCart();
}

function loadCart() {
    let cartHtml = `
        <div class="shopping-cart container">
            <!-- Title -->
            <div class="title mt-5 mb-5">
                <h1>Total Price : <span id="cart-total-price">$${CartHelper.calcTotalPrice()}<span></h1>
            </div>
            <div class="cart-wrapper shadow-sm">
    `;
    
    if (cart.length <= 0) {
        container.innerHTML += `<h2 class="text-center mt-5">You don't have any item in the cart :(</h2>
            <div class="d-flex justify-content-center">
                <a href="/" data-link class="btn btn-primary">BACK TO HOME</a>
            </div>
        </div></div>`
    } else {
        cart.forEach(item => {
            cartHtml += new CartItem(item).createHTML();
        })
        cartHtml += '</div></div>'
        container.innerHTML += cartHtml;

        if (count === 0) {
            applyListeners();
            count = 1;
        }
    }
}

function applyListeners() {
    document.addEventListener('click', (e) => {
        const { target } = e;
        const productAttr = target.attributes['data-product-id'] || target.parentNode.attributes['data-product-id'] || undefined;
        if (productAttr && productAttr.value !== undefined) {
            let id = Number(productAttr.value);
            if(target.matches('.plus-btn') || target.parentNode.matches('.plus-btn')) {
                const clickedProduct = cart.find(item => item.id === id);
                CartHelper.addToCart(clickedProduct);
            }
            if (target.matches('.minus-btn') || target.parentNode.matches('.minus-btn') && productAttr !== undefined) {
                CartHelper.removeItemFromCart(id);
            }
            if (target.matches('.delete-btn') || target.parentNode.matches('.delete-btn') && productAttr !== undefined) {
                CartHelper.remove(id);
            }
            if (CartHelper.getCart.length <= 0) {
                cart = CartHelper.getCart;
                document.querySelector('.shopping-cart').remove();
                loadCart();
            }
        }
    });
}
