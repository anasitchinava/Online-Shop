const x = document.getElementById("navbarNav");
async function navMenu() {
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    const checkoutContainer = document.getElementById('checkoutContainer');
    const goToCheckoutBtn = document.getElementById('goToCheckoutBtn');
    let totalPrice;

    if (cartProducts.length > 0) {
        cartProducts.forEach(product => {
            const productHTML = `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-details">
                        <h3>${product.title}</h3>
                        <p>Price: $${product.price}</p>
                        <p>Quantity: ${product.quantity}</p>
                    </div>
                    <div class="remove-item" data-product-id="${product.id}">
                        <div class="remove-icon">
                            <img src="../img/delete-icon.png" alt="Remove">
                        </div>
                    </div>
                </div>
            `;

            const productElement = document.createElement('div');
            productElement.innerHTML = productHTML;
            checkoutContainer.appendChild(productElement);
        });

        totalPrice = calculateTotalPrice(cartProducts);
        const totalHTML = `<div class="total-price">Total: $${totalPrice.toFixed(2)}</div>`;
        checkoutContainer.innerHTML += totalHTML;
    } else {
        checkoutContainer.innerHTML = '<h1>Your cart is empty.</h1>';
        goToCheckoutBtn.disabled = true;
    }

    checkoutContainer.addEventListener('click', (event) => {
        const removeIcon = event.target.closest('.remove-icon');
        if (removeIcon) {
            alert('Item will be removed!');
            const productId = removeIcon.parentElement.dataset.productId;
            removeFromCart(productId);
        }
    });

    goToCheckoutBtn.addEventListener('click', () => {
        window.location.href = `./checkout.html?totalPrice=${totalPrice?.toFixed(2)}`;
    });
});

function removeFromCart(productId) {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    const targetProductIndex = cartProducts.findIndex(product => product.id == productId);

    if (targetProductIndex !== -1) {
        const targetProduct = cartProducts[targetProductIndex];

        if (targetProduct.quantity > 1) {
            targetProduct.quantity -= 1;
        } else {
            cartProducts.splice(targetProductIndex, 1);
        }

        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        location.reload();
    }
}

function calculateTotalPrice(products) {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
}
