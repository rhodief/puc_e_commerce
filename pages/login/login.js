function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulação simplificada: verificar se o email existe e a senha corresponde
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find(user => user.email === email && user.password === password);

    if (userExists) {
        alert('Login bem-sucedido!');
        // Redirecionar para a página inicial ou de perfil do usuário
    } else {
        alert('Usuário ou senha incorretos!');
    }
}