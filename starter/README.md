# HTML code description
## Navbar html
```
<nav class="navbar shadow-sm sticky-top">
   <div class="container">
      <a class="navbar-brand font-monospace" data-link href="/">Shopping Cart</a>
      <a href="/cart" data-link id="cart-route" onclick="route()">
         <div class="ms-auto" id="cart" style="text-decoration: none; color : black">
            <i style="font-size: 20px" class="fa-solid fa-cart-shopping"></i>
            <span class="cartItem"id="nav-cart-item">0</span>
         </div>
      </a>
   </div>
</nav>
```

## Home page

### Home page container html
```
<h3 class="text-center mt-5 font-monospace">Best Products waiting for you</h3>
<div class="d-flex flex-wrap container justify-content-evenly mt-5 mb-5">
    ** Product Card goes here **
</div>
```

### Product Card html
```
<div class="pd-card shadow-sm">
    <div class="pd-card-image">
        <img src=".../link" height="240" width="240" alt="name">
    </div>
    <div class="pd-card-body">
        <h5 class="pd-card-title">Product name goes here</h5>
        <p class="pd-card-price"><i>$ 23 product price goes here</i></p>
        <span class="pd-card-btn" data-product-id="productId">
            <i style="font-size: 20px" class="fa-solid fa-cart-shopping"></i>
        </span>
    </div>
</div>
```

---------------------------------------------------
## Shopping Cart page


### Shopping Cart Container HTML Below
```
<div id="sp-cart" class="shopping-cart container">
    <!-- Title -->
    <div class="title mt-5">
        <h1>Total Price : <span id="cart-total-price">$2040 Total price here<span></h1>
    </div>
    <div class="mb-5">
        <button class="btn btn-primary" id="clear-all">CLEAR ALL <i class="fa-sharp fa-solid fa-trash"></i></button>
    </div>
    <div class="cart-wrapper shadow-sm">
        ** CartItem goes here **
    </div>
</div>
```

### CartItem html below
```
<div class="item" id="item-${this.id}">
    <div class="buttons">
        <span class="delete-btn" data-product-id="${this.id}">
            <i class="fa-solid fa-xmark"></i>
        </span>
    </div>

    <div class="image">
        <img src=".../link" alt="" />
    </div>

    <div class="description">
        <span>Product Name here</span>
    </div>

    <div class="quantity">
        <button class="plus-btn" type="button" name="button" data-product-id="productId">
            <i class="fa-sharp fa-solid fa-plus"></i>
        </button>
        <input class="item-count" type="text" name="name" value="20" id="productId" readonly>
        <button class="minus-btn" type="button" name="button" data-product-id="productId">
            <i class="fa-solid fa-minus"></i>
        </button>
    </div>

    <div class="total-price" id="price-productId">$24 Item total price here</div>
</div>
```

### Empty cart html below

```
<h2 class="text-center mt-5">You don't have any item in the cart :(</h2>
    <div class="d-flex justify-content-center">
        <a href="/" data-link class="btn btn-primary">BACK TO HOME</a>
    </div>
</div>
```

