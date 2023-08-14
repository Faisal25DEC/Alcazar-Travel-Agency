// JavaScript code to handle cart and local storage
const cartItems = [];

// Function to add an item to the cart
function addToCart(item) {
  cartItems.push(item);
  updateCart();
}

// Function to update the cart display
function updateCart() {
  const cartList = document.getElementById('cart-items');
  cartList.innerHTML = '';

  cartItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    cartList.appendChild(listItem);
  });

  // Update local storage
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Check if there's any previously stored cart data in local storage
const storedCart = localStorage.getItem('cart');
if (storedCart) {
  const parsedCart = JSON.parse(storedCart);
  cartItems.push(...parsedCart);
  updateCart();
}
