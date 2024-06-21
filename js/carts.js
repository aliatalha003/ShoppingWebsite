let ProductsInCart = localStorage.getItem("ProductsInCart")
let allProducts = document.querySelector(".products")

let price = document.querySelector(".total_price")
function calculateTotalPrice(products) {
    let totalPrice = 0;
    for (const item of products) {
        totalPrice += item.item.price * item.quantity;
    }
    return totalPrice;
}
if (ProductsInCart) {
    let item = JSON.parse(ProductsInCart);
    const product = Object.values(item).map(item => item);
    // console.log(product)

    drawCartProducts(product);
    price.innerHTML = "Total:$" + calculateTotalPrice(product);

}

function drawCartProducts(products) {

    let y = products.map((item) => {

        return `
        <div class="product_item card mb-3 mt-2 ms-4 p-2" style="max-width: 550px; height:auto ">
            <div class="row g-0">
                <div class="col-md-5">
                <img style="height:220px; width:220px;" src="${item.item.imageUrl}" class="img-fluid rounded product_item_img ms-0" alt="product img">
                </div>
                <div class="col-md-7 ">
                    <div class="card-body">
                    <h4 class="card-text mb-2">${item.item.product}</h4>
                                <p class="card-text">${item.item.category}</p>
                                <p class="card-text">$${item.item.price} </p>
                    </p>
                    <p class="card-text">Quantity:${item.quantity}
                    <i class="fas fa-plus me-2 plus_minus_icons ms-4" onclick="PlusQuantity('${item.item.id}')" "></i>
                    <i class="fas fa-minus plus_minus_icons" onclick="MinusQuantity(${item.item.id})"  "></i> 
             
                    </p>
                    <div class="product_item_action"">
                    <button  style="display: inline; background-color:#868686d6 "class="btn add_to_cart" onclick="removeFromCart(${item.item.id})">Remove</button>
                    </div>
                </div>
            </div>
            
            
        </div>
    </div>
        `
    }).join("")
    allProducts.innerHTML = y;
}


function removeFromCart(id) {
    let ProductsInCart = localStorage.getItem("ProductsInCart");
    if (ProductsInCart) {
        let cartItems = JSON.parse(ProductsInCart);
        // console.log(cartItems[id])
        delete cartItems[id];
        localStorage.setItem("ProductsInCart", JSON.stringify(cartItems));
        drawCartProducts(Object.values(cartItems));
        price.innerHTML = "Total:$" + calculateTotalPrice(Object.values(cartItems));
    }
}

function PlusQuantity(id) {
    let ProductsInCart = localStorage.getItem("ProductsInCart");
    if (ProductsInCart) {
        let cartItems = JSON.parse(ProductsInCart);
        if (cartItems[id]) {
            cartItems[id].quantity++;
            localStorage.setItem("ProductsInCart", JSON.stringify(cartItems));
            drawCartProducts(Object.values(cartItems));
            price.innerHTML = "Total:$" + calculateTotalPrice(Object.values(cartItems));

        }
    }
}

function MinusQuantity(id) {
    let ProductsInCart = localStorage.getItem("ProductsInCart");
    if (ProductsInCart) {
        let cartItems = JSON.parse(ProductsInCart);
        if (cartItems[id]) {
            if (cartItems[id].quantity == 1) {
                delete cartItems[id];
            } else {
                cartItems[id].quantity--;
            }
            localStorage.setItem("ProductsInCart", JSON.stringify(cartItems));
            drawCartProducts(Object.values(cartItems));
            price.innerHTML = "Total:$" + calculateTotalPrice(Object.values(cartItems));

        }
    }
}



let FavItems = localStorage.getItem("FavProducts");

if (FavItems) {
    let favProducts = JSON.parse(FavItems);
    drawFavoriteProducts(favProducts);
}

function drawFavoriteProducts(products) {
    let favoriteProductsContainer = document.querySelector(".Favproducts");

    let favoriteProductsHTML = products.map(product => {
        return `
            <div class="favorite-product">
                <img src="${product.imageUrl}" alt="${product.product}" class="favorite-product-image">
                <div class="favorite-product-details">
                    <h3>${product.product}</h3>
                    <p>${product.category}</p>
                    <p>$${product.price}</p>
                    <i class="fas fa-heart heart-icon" style="color: red; cursor:pointer;" data-id="${product.id}" onclick="removeFromFavorites(${product.id})"></i>
                </div>
            </div>
        `;
    }).join("");

    favoriteProductsContainer.innerHTML = favoriteProductsHTML;
}

function removeFromFavorites(id) {
    let FavItems = localStorage.getItem("FavProducts");
    if (FavItems) {
        let favProducts = JSON.parse(FavItems);
        let updatedFavProducts = favProducts.filter(product => product.id !== id);
        localStorage.setItem("FavProducts", JSON.stringify(updatedFavProducts));
        drawFavoriteProducts(updatedFavProducts);
    }
}
