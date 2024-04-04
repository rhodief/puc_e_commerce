function loadOrderSummary() {
    const orderSummary = JSON.parse(localStorage.getItem('cart')) || [];
    const summaryContainer = document.getElementById('orderSummary');
    let total = 0;

    orderSummary.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `<p>${item.name} - $${item.price} x ${item.quantity}</p>`;
        summaryContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    const totalElement = document.createElement('p');
    totalElement.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    summaryContainer.appendChild(totalElement);
}

function placeOrder() {
    // Implemente a lógica conforme necessário para o seu cenário
    alert('Pedido finalizado com sucesso!');
    localStorage.removeItem('cart'); // Limpa o carrinho após finalizar o pedido
}

document.addEventListener('DOMContentLoaded', loadOrderSummary);
