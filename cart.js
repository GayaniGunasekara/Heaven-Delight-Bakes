document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.btn');
    let totalQuantity = 0;
    let totalPrice = 0;

    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const productBox = this.closest('.productBox');
            const priceElement = productBox.querySelector('.price');
            const price = parseFloat(priceElement.getAttribute('data-price'));

            totalQuantity += 1;
            totalPrice += price;

            document.getElementById('total-quantity').textContent = totalQuantity;
            document.getElementById('total-price').textContent = totalPrice.toFixed(2);
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.productBox .btn');
    const totalQuantityElement = document.getElementById('total-quantity');
    const totalPriceElement = document.getElementById('total-price');

    let totalQuantity = 0;
    let totalPrice = 0;

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();

            const productBox = button.parentElement;
            const priceElement = productBox.querySelector('.price');
            const itemQuantityElement = productBox.querySelector('.item-quantity');
            const price = parseFloat(priceElement.getAttribute('data-price'));
            let itemQuantity = parseInt(itemQuantityElement.textContent);

            // Increment item quantity
            itemQuantity += 1;
            itemQuantityElement.textContent = itemQuantity;

            // Update total quantity and total price
            totalQuantity += 1;
            totalPrice += price;

            totalQuantityElement.textContent = totalQuantity;
            totalPriceElement.textContent = totalPrice.toFixed(2);
        });
    });
});





let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
    let item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSummary();
}

function updateCartSummary() {
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    let totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total-quantity').textContent = totalQuantity;
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

window.onload = updateCartSummary;




function increaseQuantity(name) {
    let item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

function decreaseQuantity(name) {
    let item = cart.find(item => item.name === name);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
    } else if (item && item.quantity === 1) {
        cart = cart.filter(cartItem => cartItem.name !== name);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}


function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalQuantity = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        let subtotal = item.price * item.quantity;
        totalQuantity += item.quantity;
        totalPrice += subtotal;

        cartItemsContainer.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>LKR.${item.price.toFixed(2)}</td>
                <td>
                    <button onclick="decreaseQuantity('${item.name}')">-</button>
                    ${item.quantity}
                    <button onclick="increaseQuantity('${item.name}')">+</button>
                </td>
                <td>LKR.${subtotal.toFixed(2)}</td>
            </tr>
        `;
    });

    document.getElementById('total-quantity').textContent = totalQuantity;
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

window.onload = function() {
    updateCartSummary();
    loadCartItems();
};
