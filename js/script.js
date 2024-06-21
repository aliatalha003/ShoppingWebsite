let userInfo = document.querySelector(".user_info")

let userData = document.querySelector("#user")

let links = document.querySelector("#links")


if (localStorage.getItem("email")) {
    links.remove()
    userInfo.style.display = "flex"
    userData.innerHTML += localStorage.getItem("firstName")

}


let logoutBtn = document.querySelector("#logout")
logoutBtn.addEventListener("click", function () {
    localStorage.clear()

    setTimeout(() => {
        window.location = "login.html"
    }, 1000);

})

let allProducts = document.querySelector(".products")
let products = [
    {
        id: 1,
        product: "Black Sofa",
        price: 1000,
        category: "Sofa & Seating",
        imageUrl: "images/BlackSofa.jpg"
    },
    {
        id: 2,
        product: "Black Lamb",
        price: 200,
        category: "Lighting",
        imageUrl: "images/blackLamb.jpg"
    }, {
        id: 3,
        product: "Brown Table",
        price: 700,
        category: "Dining",
        imageUrl: "images/brownTable.jpeg"
    }, {
        id: 4,
        product: "Beige Sofa",
        price: 1200,
        category: "Sofa & Seating",
        imageUrl: "images/beigeSofa.jpg"
    }, {
        id: 5,
        product: "Horse Decor Item",
        price: 40,
        category: "Decor",
        imageUrl: "images/decor3.jpg"
    }, {
        id: 6,
        product: "White Lamb",
        price: 80,
        category: "Lighting",
        imageUrl: "images/WhiteLamb.jpg"
    }, {
        id: 7,
        product: "Dining Buffet",
        price: 900,
        category: "Dining",
        imageUrl: "images/diningBuffet.jpg"
    }, {
        id: 8,
        product: "Pink Sofa",
        price: 1500,
        category: "Sofa & Seating",
        imageUrl: "images/pinkSofa.jpg"
    }, {
        id: 9,
        product: "White Table",
        price: 600,
        category: "Dining",
        imageUrl: "images/WhiteTable.jpg"
    }, {
        id: 10,
        product: "Deer Figurine",
        price: 25,
        category: "Decor",
        imageUrl: "images/DeerDecor.jpg"
    }, {
        id: 11,
        product: "Green Sofa",
        price: 1700,
        category: "Sofa & Seating",
        imageUrl: "images/GreenSofa.jpg"
    }, {
        id: 12,
        product: "Leaf Decor",
        price: 32,
        category: "Decor",
        imageUrl: "images/leafdecor.jpg"
    }
]
function drawItems(productsToDraw) {
    let y = productsToDraw.map((item) => {
        return `
            <div class="col-lg-3 col-md-6 col-sm-12">

            <div class="card product_item m-auto mb-5 mt-2" style="width: 17rem; border:none;">
                <img style="height:auto width:15rem"src="${item.imageUrl}" class="card-img-top m-auto" alt="bookImg">
                
                <div class="card-body" style="line-height:8px;">
                    <h4 class="card-text mb-2">${item.product}</h4>
                    <p class="card-text">${item.category}</p>
                    <p class="card-text">$${item.price} </p>
                    <button href="#" class="btn btn-outline-secondary" data-id="${item.id}" onclick="AddToCart(${item.id})">Add To Cart</button>
                <i class="far fa-heart heart_icon" data-id="${item.id}" onclick="AddToFav(${item.id})"  data-bs-toggle="tooltip" data-bs-placement="top" title="Add To Favorites"></i>
                </div>
                </div>
            </div>
            `
    }).join("")
    allProducts.innerHTML = y;
}
drawItems(products)
let badge = document.querySelector(".badge");
badge.innerHTML = 0;


let Opencart = document.querySelector(".cart-icon ")
let cartDiv = document.querySelector(".carts_products")
let TotalQuantity=0
Opencart.addEventListener("click", function () {
    if (cartDiv.style.display == "block") {
        cartDiv.style.display = "none"
    }
    else {
        cartDiv.style.display = "block"
    }
})



const inputText = document.getElementById("inputText");
const searchTypeSelect = document.getElementById("searchType");

inputText.addEventListener("input", () => {
    const text = inputText.value.toLowerCase();
    const searchType = searchTypeSelect.value;

    const filteredProducts = products.filter(item => {

        if (searchType == "name") {
            return item.product.toLowerCase().startsWith(text);
            //             return item.product.toLowerCase().includes(searchText);

        }
        else if (searchType == "category") {
            return item.category.toLowerCase().startsWith(text);
            //             return item.category.toLowerCase().includes(searchText);

        }
    });
    drawItems(filteredProducts);
})
const carts_products_items = document.querySelector(".carts_products div")
let cartItems = {}
function AddToCart(id) {
    if (localStorage.getItem("email")) {
        const pro = products.find((item) => item.id == id);
        let button = document.querySelector(`button[data-id="${id}"]`)
        if (button.innerHTML == "Add To Cart") {
            button.innerHTML = "Remove From Cart"
            button.classList.remove('btn-outline-secondary');
            button.style.backgroundColor="#868686d6"
        }

        else {
            button.innerHTML = "Add To Cart"
            badge.innerHTML = Number(badge.innerHTML) - 1;
            delete cartItems[id];
            button.classList.add('btn-outline-secondary');
            button.classList.add('btn');

            button.style.backgroundColor=""
            localStorage.setItem("ProductsInCart",JSON.stringify(cartItems))
            DrawCartItems();
            return;
        }
        badge.innerHTML = Number(badge.innerHTML) + 1;
        carts_products_items.innerHTML = pro.product;
        if (cartItems[id]) {
            cartItems[id].quantity++;
        }
        else {
            // console.log(pro)
            cartItems[id] = {
                item: pro,
                quantity: 1
            }
        }
        // console.log(pro)
        // console.log(cartItems)
        DrawCartItems();
        localStorage.setItem("ProductsInCart",JSON.stringify(cartItems))

    }
    else {
        window.location = "login.html";
    }
}
function DrawCartItems() {
    carts_products_items.innerHTML = ""
    for (itemId in cartItems) {
        let cartItem = cartItems[itemId];
        // console.log(itemId)

        carts_products_items.innerHTML += `<p>${cartItem.quantity}x ${cartItem.item.product} 
             <i class="fas fa-minus plus_minus_icons" onclick="MinusQuantity(${itemId})" style="float:right; "></i> 
             <i class="fas fa-plus me-2 plus_minus_icons" onclick="PlusQuantity('${itemId}')" style="float:right;"></i>
             </p> `;
    }
}
function PlusQuantity(id) {
    console.log(id)
    cartItems[id].quantity++;
    badge.innerHTML = Number(badge.innerHTML) + 1;
    localStorage.setItem("ProductsInCart",JSON.stringify(cartItems))

    DrawCartItems();
}
function MinusQuantity(id) {
    let button = document.querySelector(`button[data-id="${id}"]`)

    if (cartItems[id].quantity == 1) {
        delete cartItems[id]
        button.innerHTML = "Add To Cart"
        button.classList.add('btn-outline-secondary');
        button.classList.add('btn');

        button.style.backgroundColor=""
    }
    else
        cartItems[id].quantity--;
    badge.innerHTML = Number(badge.innerHTML) - 1;
    localStorage.setItem("ProductsInCart",JSON.stringify(cartItems))

    DrawCartItems();

}
let FavItems=[]
function AddToFav(id) {
    const heart_icon = document.querySelector(`.heart_icon[data-id="${id}"]`);
    if (localStorage.getItem("email")) {
        if (heart_icon.style.color === 'rgb(224, 62, 62)') {
            heart_icon.style.color = '';
        } else {
            heart_icon.style.color = '#e03e3e';
        }
        heart_icon.classList.toggle('fas');
        heart_icon.classList.toggle('far');
        let pro=products.find((item)=>item.id==id);
        FavItems.push(pro);
        localStorage.setItem("FavProducts",JSON.stringify(FavItems));


    }
    else {
        window.location = "login.html";
    }
}

//To maitain the same cart items if the page is changed
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("ProductsInCart")) {
        cartItems = JSON.parse(localStorage.getItem("ProductsInCart"));
        
        let totalCount = 0;
        for (const itemId in cartItems) {
            totalCount += cartItems[itemId].quantity;
            
            const button = document.querySelector(`button[data-id="${itemId}"]`);
            if (button) {
                button.innerHTML = "Remove From Cart";
                button.classList.remove('btn-outline-secondary');
            button.style.backgroundColor="#868686d6"
            }
        }
        badge.innerHTML = totalCount;
        
        // Redraw cart items
        DrawCartItems();
    }
});


