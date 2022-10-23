import Product from "./product.js";
import CartHelper from "./helper/CartHelper.js";
import ProductsHelper from "./helper/ProductsHelper.js";

let container = '';
let products = ProductsHelper.getProducts || [];
let count = 0;

export default function Home(selector) {
    container = document.getElementById(selector);
    loadProducts();
}

async function loadProducts() {
    products = ProductsHelper.getProducts;
    if (!products) {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        ProductsHelper.setProducts = data;
        products = ProductsHelper.getProducts;
    }

    displayProducts();
}

function displayProducts() {
    let productsHtml = `
        <h3 class="text-center mt-5 font-monospace">Best Products waiting for you</h3>
        <div class="d-flex flex-wrap container justify-content-evenly mt-5 mb-5">
    `;
    products.forEach(product => {
        productsHtml += new Product(product).createHTML();
    }); 
    productsHtml += '</div>';
    container.innerHTML += productsHtml;

    if (count === 0) {
        applyListeners();
        count = 1;
    }
}

function applyListeners() {
    document.addEventListener('click', ({ target }) => {
        const productAttr = target.attributes['data-product-id'] || target.parentNode.attributes['data-product-id'];
        if(target.matches('.pd-card-btn') || target.parentNode.matches('.pd-card-btn') && productAttr !== undefined) {
            const clickedProduct = products.find(item => item.id === Number(productAttr.value));
            CartHelper.addToCart(clickedProduct);
        }
    });
}
