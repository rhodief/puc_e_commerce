document.getElementById('hamburgerMenu').addEventListener('click', function() {
    var links = document.getElementById('navbarLinks');
    if (links.style.display === 'block') {
        links.style.display = 'none';
    } else {
        links.style.display = 'block';
    }
});


// Carregar produtos do 'products.json' e exibir no grid
function loadProducts() {
    fetch('products.json')
    .then(response => response.json())
    .then(products => {
        const grid = document.getElementById('productGrid');
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" style="width:100%; border-radius: 5px 5px 0 0;">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            `;
            grid.appendChild(productCard);
        });
    });
}

// Função para adicionar produtos ao carrinho de compras
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productExists = cart.some(product => product.id === productId);
    if (!productExists) {
        fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            if (product) {
                cart.push({...product, quantity: 1});
                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`${product.name} adicionado ao carrinho.`);
            }
        });
    } else {
        alert("Produto já está no carrinho.");
    }
}

// Inicializa a página com produtos carregados
document.addEventListener('DOMContentLoaded', loadProducts);

