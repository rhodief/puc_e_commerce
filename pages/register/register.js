function register() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);

    if (!userExists) {
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Cadastro realizado com sucesso!');
        localStorage.setItem('loggedUser', JSON.stringify({name, email}))
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const thereIsItemInTheCart = Array.isArray(cart) && cart.length > 0
        if (thereIsItemInTheCart) {
            window.location = '/pages/checkout'
            return
        }
        window.location = '/'
    } else {
        alert('Usuário já cadastrado!');
        window.location = '/pages/login'
    }
}