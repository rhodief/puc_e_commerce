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
        // Redirecionar para a página de login ou início
    } else {
        alert('Usuário já cadastrado!');
    }
}