function login() {
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    // Simulação simplificada: verificar se o email existe e a senha corresponde
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find(user => user.email === emailInput && user.password === passwordInput);
    console.log('User', userExists)
    if (userExists) {
        const name = userExists.name
        const email = userExists.email
        localStorage.setItem('loggedUser', JSON.stringify({name, email}))
        alert(`Olá ${name}!`);
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const thereIsItemInTheCart = Array.isArray(cart) && cart.length > 0
        if (thereIsItemInTheCart) {
            window.location = '../checkout'
            return
        }
        window.location = './../../index.html'
    } else {
        alert('Usuário ou senha incorretos!');
    }
}