export default class ProductsHelper {
    static get getProducts() {
        return JSON.parse(sessionStorage.getItem('products'));
    }

    static set setProducts(products) {
        sessionStorage.setItem('products', JSON.stringify(products));
    }
}