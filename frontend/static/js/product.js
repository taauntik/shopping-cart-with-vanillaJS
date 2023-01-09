export default class Product {
    constructor({ image, title, price, id }) {
        this.image = image;
        this.title = title;
        this.price = price;
        this.id = id;
    }

    createHTML() {
        const { id, image, title, price } = this;
        return `
            <div class="pd-card shadow-sm">
                <a data-link href="/product/${id}">
                    <div class="pd-card-image">
                        <img src="${image}" height="240" width="240" alt="${title}">
                    </div>
                </a>
                <div class="pd-card-body">
                    <h5 class="pd-card-title">${title}</h5>
                    <p class="pd-card-price"><i>$ ${price}</i></p>
                    <span class="pd-card-btn" data-product-id=${id}>
                        <i style="font-size: 20px" class="fa-solid fa-cart-shopping"></i>
                    </span>
                </div>
            </div>
        `;
    }
}