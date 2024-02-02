const x = document.getElementById("navbarNav");
async function navMenu() {
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

    if (selectedProduct) {
        const productContainer = document.getElementById('singleProductContainer');
        const productDetailsContainer = document.getElementById('productDetails');
        const productHTML = `
            <div class="single-product product-container">
                <img src="${selectedProduct.image}" alt="${selectedProduct.title}" class="product-image">
                <div class="product-details">
                    <h3 class="product-title">${selectedProduct.title}</h3>
                    <p class="product-description">Description: ${selectedProduct.description}</p>
                    <p class="product-rating">Rating: ${selectedProduct.rating.rate} (${selectedProduct.rating.count} reviews)</p>
                    <p class="product-price">Price: $${selectedProduct.price}</p>
                    <button class="cart-btn" id="addToCartBtn">Add to Cart</button>
                </div>
            </div>
        `;

        productContainer.innerHTML = productHTML;
        const addToCartBtn = document.getElementById('addToCartBtn');
        addToCartBtn.addEventListener('click', () => {
            addToCart(selectedProduct);
        });
        productDetailsContainer?.classList.add('product-details-container');
    }
});

function addToCart(product) {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    const existingProduct = cartProducts.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
        alert('Increased quantity!');
    } else {
        cartProducts.push({ ...product, quantity: 1 });
        alert('Product added to cart!');
    }
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
}
