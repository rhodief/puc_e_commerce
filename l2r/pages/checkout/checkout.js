let paymentMethodIsOk = false;

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
    const totalHigherThatZero = getTotal() > 0
    if (!totalHigherThatZero) {
        alert('Selecione algum produto')
        return
    }
    if (!paymentMethodIsOk) {
        alert('Selecione um método de pagamento')
        return
    }
    alert('Parabéns. Você adquiriu os melhores produtos da face da terra!');
    localStorage.removeItem('cart'); // Limpa o carrinho após finalizar o pedido
    window.location = '../../index.html'
}

function getTotal() {
    const orderSummary = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    orderSummary.forEach(item => {
        total += item.price * item.quantity;
    });
    return total;
}

function getFormattedDatePlusDays(days) {
    const today = new Date();
    today.setDate(today.getDate() + days);

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
}


function handlePaymentMethodChange(event) {
    const selectedValue = event.target.value;
    const additionalOptionsDiv = document.getElementById('additionalOptions');
    additionalOptionsDiv.innerHTML = ''; // Clear previous content
    const total = getTotal()
    const fees = 0.05
    if (['creditCard', 'boleto', 'pix'].indexOf(selectedValue) > -1) {
        paymentMethodIsOk = true
    } else {
        paymentMethodIsOk = false
    }
    if (selectedValue === 'creditCard') {
        const installmentsSelect = document.createElement('select');
        installmentsSelect.id = 'installments';
        for (let i = 1; i <= 12; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${i} parcela${i > 1 ? 's' : ''} - juros de ${(fees * 100).toFixed(2)}%aa | Total: ${((total / i) + (total * fees)).toFixed(2)}`;
            installmentsSelect.appendChild(option);
        }
        additionalOptionsDiv.appendChild(installmentsSelect);
    } else if (selectedValue === 'boleto') {
        const boletoTemplate = document.createElement('div');
        boletoTemplate.className = 'boleto-template';
        const expirationDay = getFormattedDatePlusDays(5);
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser')) || {name: ''};
        boletoTemplate.innerHTML = `
                    <h3>Boleto</h3>
                    <p>Beneficiário: L2R Inc.</p>
                    <p>Pagador: ${loggedUser.name}</p>
                    <p>Valor: R$ ${(total).toFixed(2)}</p>
                    <p>Vencimento: ${expirationDay}</p>
                    <p>Código de barras: 1234.5678.9012.3456.7890.123456</p>
                `;
        additionalOptionsDiv.appendChild(boletoTemplate);
    } else if (selectedValue === 'pix') {
        const qrcode = document.createElement('img');
        qrcode.src = 'https://s3-sa-east-1.amazonaws.com/loja2/45e362050257d38ac6a7a762f437d9a0.jpg'; // Placeholder for QR code image
        qrcode.alt = 'QR Code';
        qrcode.className = 'qrcode';
        additionalOptionsDiv.appendChild(qrcode);
    }
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
    loadOrderSummary()
    loadUserContext()
    loadHeader()
});
const paymentMethodSelect = document.getElementById('paymentMethod');
paymentMethodSelect.addEventListener('change', handlePaymentMethodChange);
