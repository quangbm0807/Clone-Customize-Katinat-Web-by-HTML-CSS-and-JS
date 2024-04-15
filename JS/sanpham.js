function formatPrice(price) {
    return price.toLocaleString('vi-VN') + 'đ';
}

function updateCartCounter() {
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
    let totalItems = 0;
    if (cartItems) {
        totalItems = Object.values(cartItems).reduce((acc, item) => acc + item.quantity, 0);
    }
    document.getElementById('total-items').textContent = totalItems;
}

function addToCart(productName, price, imageSrc) {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || {};
    if (cartItems[productName]) {
        cartItems[productName].quantity++;
    } else {
        cartItems[productName] = { name: productName, price: price, quantity: 1, image: imageSrc };
    }
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCounter();
}

document.addEventListener('DOMContentLoaded', function () {
    updateCartCounter();
});
const addButtons = document.querySelectorAll('.add1, .add2, .add3, .add4, .add5, .add6, .add7, .add8, .add9');

addButtons.forEach(button => {
    button.style.display = 'none';

    button.parentElement.addEventListener('mouseover', () => {
        button.style.display = 'block';
    });

    button.parentElement.addEventListener('mouseout', () => {
        button.style.display = 'none';
    });
});