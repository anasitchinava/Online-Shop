document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    let total = urlParams.get("totalPrice");
    const totalSumValue = document.getElementById("totalSumValue");
    totalSumValue.textContent = total ? `${total} GEL` : 'N/A';
    const payButton = document.getElementById("payButton");

    payButton.addEventListener('click', (event) => {
        localStorage.removeItem('cartProducts');
        totalSumValue.textContent = `${total} GEL`;
        alert('Thanks for shopping with us!');
        history.replaceState({}, document.title, window.location.pathname);
        location.reload();
    });
});
