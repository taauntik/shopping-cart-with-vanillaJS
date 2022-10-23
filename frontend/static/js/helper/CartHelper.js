export default class CartHelper {
    static get getCart() {
        return JSON.parse(localStorage.getItem('cart'));
    }

    static get getCartItemCount() {
        let cart = this.getCart;
        if (cart?.length > 0) {
            return cart.reduce((ack, currItem) => ack + currItem.amount, 0);
        }
        return 0;
    }

    static set setCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    static set updateNavCartValue(value) {
        const cart = document.getElementById('nav-cart-item');
        cart.innerText = value;
    }

    static addToCart(product) {
        let cart = this.getCart;
        const isItemInCart = cart.find(item => item.id === product.id);

        if (isItemInCart) {
            cart = cart.map(item => 
                item.id === product.id
                ? { ...item, amount : item.amount + 1 }
                : item
            );
        } else {
            cart.push({ ...product, amount : 1 });
        }
        
        // set updated cart to localStorage
        this.setCart = cart;

        // update navbar cart item count
        this.updateNavCartValue = this.getCartItemCount;

        // In the cart page it should update it's own item count
        if (location.pathname === '/cart') {
            cart = this.getCart;
            const updatedItem = cart.find(item => item.id == product.id);
            const totalPrice = this.getCartItemPrice(updatedItem.price, updatedItem.amount);
            this.updateCartItemPrice(totalPrice, product.id);
            document.getElementById(product.id).value = updatedItem.amount;
        }
    }

    static removeItemFromCart(id) {
        let cart = this.getCart;
        cart = cart.reduce((ack, item) => {
            if (item.id === id) {
                if (item.amount === 1) return ack;
                return [...ack, { ... item, amount : item.amount - 1 }];
            } else {
                return [...ack, item];
            }
        }, []);

        // set updated cart to localStorage
        this.setCart = cart;

        // update navbar cart item count
        this.updateNavCartValue = this.getCartItemCount;

        // In the cart page it should update it's own item count and item
        if (location.pathname === '/cart') {
            const updatedItem = cart.find(item => item.id === id);
            if (updatedItem) {
                document.getElementById(id).value = updatedItem.amount;
                const totalPrice = this.getCartItemPrice(updatedItem.price, updatedItem.amount);
                this.updateCartItemPrice(totalPrice, id);
            } else {
                // document.getElementById(`item-${id}`).remove();
                alert('Can not go less than this');
            }
        }
    }

    static remove(id) {
        this.setCart = this.getCart.filter(item => item.id !== id);
        document.getElementById(`item-${id}`).remove();

        // update navbar cart count
        this.updateNavCartValue = this.getCartItemCount;
        this.updateCartTotalPrice(this.calcTotalPrice());
    }

    static getCartItemPrice(price, amount) {
        return (price * amount).toFixed(2);
    }

    static updateCartItemPrice(totalPrice, id) {
        document.getElementById(`price-${id}`).innerText = `$${totalPrice}`;
        this.updateCartTotalPrice(this.calcTotalPrice());
    }

    static calcTotalPrice() {
        return this.getCart.reduce((ack, item) => (item.amount * item.price) + ack, 0).toFixed(2);
    }

    static updateCartTotalPrice (totalPrice) {
        document.getElementById('cart-total-price').innerText = `$${totalPrice}`;
    }
}