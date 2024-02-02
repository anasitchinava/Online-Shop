const x = document.getElementById("navbarNav");
async function navMenu() {
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

const productsContainer = document.getElementById("products");

async function getProducts() {
    return await fetch('https://fakestoreapi.com/products').then(res => res.json());
}

function setProductInfoInLocalStorage(product) {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
}

function redirectToSingleProductPage() {
    window.location.href = './singleProduct.html';
}

async function displayAllProducts() {
    const productsData = await getProducts();
    productsData.forEach(product => {
        const productHTML = `
            <div class="product">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">Price: $${product.price}</p>
                <p class="product-rating">Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
            </div>
        `;

        const productElement = document.createElement('div');
        productElement.innerHTML = productHTML;

        productElement.addEventListener('click', () => {
            setProductInfoInLocalStorage(product);
            redirectToSingleProductPage();
        });

        productsContainer.appendChild(productElement);
    });
}

displayAllProducts();
