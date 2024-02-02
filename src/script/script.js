const x = document.getElementById("navbarNav");
async function navMenu() {
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

const categories = document.getElementById("categories");
const bestsellersContainer = document.getElementById("bestsellers");
const productsContainer = document.getElementById("category-products");

async function getPopularCategories() {
    return await fetch('https://fakestoreapi.com/products/categories').then(res => res.json());
}

async function getProductsByCategory(category) {
    const categoryProducts = await fetch(`https://fakestoreapi.com/products/category/${category}`).then(res => res.json());
    const result = categoryProducts.splice(0, 4);
    return result;
}

async function getBestsellers() {
    const allProducts = await fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => {
            const sortedProducts = products.sort((a, b) => b.rating.rate - a.rating.rate);
            const bestsellers = sortedProducts.slice(0, 4);
            return bestsellers;
        });
    return allProducts;
}

function setProductInfoInLocalStorage(product) {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
}

function redirectToSingleProductPage() {
    window.location.href = 'src/pages/singleProduct.html';
}

async function displayBestsellers() {
    const bestsellers = await getBestsellers();
    bestsellers.forEach(product => {
        const productHTML = `
            <div class="product">
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
            </div>
        `;

        const productElement = document.createElement('div');
        productElement.innerHTML = productHTML;
        productElement.addEventListener('click', () => {
            setProductInfoInLocalStorage(product);
            redirectToSingleProductPage();
        });

        bestsellersContainer.appendChild(productElement);
    });
}

async function displayProductsByCategory(category) {
    const products = await getProductsByCategory(category);

    products.forEach(product => {
        const productHTML = `
            <div class="product">
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
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

async function displayCategories() {
    const categoryIcons = {
        electronics: 'src/img/electronics-icon.png',
        jewelery: 'src/img/jewelry-icon.png',
        "men's clothing": 'src/img/male-clothes.png',
        "women's clothing": 'src/img/female-clothes.png'
    };

    const popularCategories = await getPopularCategories();
    popularCategories?.forEach(category => {
        const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
        const icon = categoryIcons[category] ? `<img src="${categoryIcons[category]}" alt="${capitalizedCategory} icon" class="category-icon">` : '';
        const categoryHTML = `
            <div class="category" data-category="${category}">
                ${icon} ${capitalizedCategory}
            </div>
        `;
        categories.innerHTML += categoryHTML;
    });

    categories.addEventListener('click', async (event) => {
        const selectedCategory = event.target.dataset.category;
        if (selectedCategory) {
            productsContainer.innerHTML = '';
            await displayProductsByCategory(selectedCategory);
        }
    });
}

displayBestsellers();
displayCategories();