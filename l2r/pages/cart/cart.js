function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const itemsContainer = document.getElementById('cartItems');
    itemsContainer.innerHTML = ''
    let total = 0;
    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        const partialPrice =  (item.price * item.quantity)
        itemElement.innerHTML = `
            <img src="./../../${item.image}" alt="${item.name}" style="width:160px; height:100%;">
            <p>${item.name}</p>
            <p>$${item.price}</p>
            <div class="detail">
                <span>Quantidade:</span>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                <p>Total Pacial: $${partialPrice.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remover</button>
            </div>
        `;
        itemsContainer.appendChild(itemElement);
        total += partialPrice;
    });

    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

function updateQuantity(index, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems(); // Recarrega os itens do carrinho para atualizar o total
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems(); // Recarrega os itens do carrinho após a remoção
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 9000) + 1000;
}

function checkout() {
    const user = JSON.parse(localStorage.getItem('loggedUser'))
    if(!user) {
        window.location = '../login'
        return
    }
    window.location = '../checkout'
}

function logout() {
    localStorage.removeItem('loggedUser')
    window.location = '../../index.html'
}

function loadUserContext() {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser')) || null;
    const identifier = document.getElementById('indentifier')
    if (loggedUser) {
        const {name, email} = loggedUser
        identifier.innerHTML = `
        <div class="userInfo">
            <span class="thumb"><img src="../../assets/thumb.png"></span>
            <span class="info">
                <span>${name}</span>
                <span>${email}</span>
            </span>
            <button onclick="logout()">sair</button>
        </div>`
        return
    }
    identifier.innerHTML = `<a href="../login">Entrar</a>`
}

function loadHeader() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navbarLinks = document.getElementById('navbarLinks');
    const closeMenu = document.getElementById('closeMenu')

    hamburgerMenu.addEventListener('click', function() {
        navbarLinks.classList.toggle('overlay');
    });
    closeMenu.addEventListener('click', function() {
        navbarLinks.classList.toggle('overlay');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadUserContext()
    loadCartItems()
    loadHeader()
});
