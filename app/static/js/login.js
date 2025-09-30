//wird nicht benötigt, standard validierung amcht der brwoser

// 1. Finde das Formular-Element im HTML
const loginForm = document.getElementById('login-form');

// 2. Füge einen Event-Listener für das "submit"-Event hinzu
loginForm.addEventListener('submit', function(event) {
    // 3. Hole die Werte aus den Input-Feldern über ihre ID
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    // 5. Einfache Validierung
    if (emailValue === '' || passwordValue === '') {
        alert('Bitte fülle beide Felder aus!');
    }
});