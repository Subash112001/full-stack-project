// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
        description: "High-quality wireless headphones with noise cancellation",
        category: "Electronics"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
        description: "Feature-rich smartwatch with health tracking",
        category: "Electronics"
    },
    {
        id: 3,
        name: "Premium Backpack",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
        description: "Durable laptop backpack with multiple compartments",
        category: "Fashion"
    },
    {
        id: 4,
        name: "Coffee Maker",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
        description: "Premium coffee maker with smart features",
        category: "Home"
    },
    {
        id: 5,
        name: "Running Shoes",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
        description: "Comfortable running shoes with advanced cushioning",
        category: "Fashion"
    },
    {
        id: 6,
        name: "Smart Speaker",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1543512214-318c7553f230?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
        description: "Voice-controlled smart speaker with premium sound",
        category: "Electronics"
    },
    {
        id: 7,
        name: "Desk Lamp",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
        description: "Modern LED desk lamp with adjustable brightness",
        category: "Home"
    },
    {
        id: 8,
        name: "Leather Wallet",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
        description: "Genuine leather wallet with RFID protection",
        category: "Fashion"
    }
];

// Shopping cart state
let cart = [];
let currentFilter = 'All';

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeBtn = document.querySelector('.close');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

// Display products
function displayProducts(filter = 'All') {
    const filteredProducts = filter === 'All' 
        ? products 
        : products.filter(product => product.category === filter);

    productGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div>
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                    <i class="fas fa-minus"></i>
                </button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                    <i class="fas fa-plus"></i>
                </button>
                <button onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity = newQuantity;
        updateCartUI();
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    showNotification('Item removed from cart');
}

// Show notification
function showNotification(message) {
    const notificationContainer = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        ${message}
    `;
    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Cart modal
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Filter products
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.textContent;
        displayProducts(currentFilter);
    });
});

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    alert('Thank you for your purchase! This is where the checkout process would continue.');
    cart = [];
    updateCartUI();
    cartModal.style.display = 'none';
    showNotification('Purchase completed successfully!');
});

// Initialize the page
displayProducts();
updateCartUI();

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        if (email) {
            showNotification('Thank you for subscribing to our newsletter!');
            newsletterForm.querySelector('input').value = '';
        }
    });
}