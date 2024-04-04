function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const itemsContainer = document.getElementById('cartItems');
    let total = 0;

    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width:50px; height:50px;">
            <p>${item.name}</p>
            <p>$${item.price}</p>
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
            <button onclick="removeFromCart(${index})">Remover</button>
        `;
        itemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
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

function checkout() {
    // Simulação de finalização de compra
    alert('Compra finalizada com sucesso!');
    localStorage.removeItem('cart'); // Limpa o carrinho
    loadCartItems(); // Recarrega os itens do carrinho vazio
}

document.addEventListener('DOMContentLoaded', loadCartItems);
