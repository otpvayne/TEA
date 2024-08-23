document.getElementById('loginLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir la acción por defecto del enlace
    document.getElementById('loginForm').style.display = 'block';
});
