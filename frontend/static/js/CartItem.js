import CartHelper from "./helper/CartHelper.js";

export default class CartItem {
    constructor({ image, title, amount, id, price }) {
        this.image = image;
        this.title = title;
        this.amount = amount;
        this.price = price;
        this.id = id;
    }

    createHTML() {
        return `
        <div class="item" id="item-${this.id}">
            <div class="buttons">
                <span class="delete-btn" data-product-id="${this.id}">
                    <i class="fa-solid fa-xmark"></i>
                </span>
            </div>

            <div class="image">
                <img src="${this.image}" alt="" />
            </div>

            <div class="description">
                <span>${this.title}</span>
            </div>

            <div class="quantity">
                <button class="plus-btn" type="button" name="button" data-product-id="${this.id}">
                    <i class="fa-sharp fa-solid fa-plus"></i>
                </button>
                <input class="item-count" type="text" name="name" value="${this.amount}" id="${this.id}" readonly>
                <button class="minus-btn" type="button" name="button" data-product-id="${this.id}">
                    <i class="fa-solid fa-minus"></i>
                </button>
            </div>

            <div class="total-price" id="price-${this.id}">$${CartHelper.getCartItemPrice(this.price, this.amount)}</div>
        </div>
        `
    }
}