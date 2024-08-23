

document.getElementById('loginLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir la acción por defecto del enlace
    document.getElementById('loginForm').style.display = 'block';
});
document.addEventListener("DOMContentLoaded", function() {
    const dropdownToggle = document.querySelector(".btn");
    const dropdownMenu = document.querySelector(".dropdown");
    const dropdownLinks = dropdownMenu.querySelectorAll("a"); // Selecciona todos los enlaces en el menú desplegable

    // Abre o cierra el dropdown al hacer clic en el botón
    dropdownToggle.addEventListener("click", function(e) {
        e.stopPropagation(); // Evita que el clic se propague
        dropdownMenu.classList.toggle("show"); // Alterna la visibilidad del menú
    });

    // Cierra el dropdown si se hace clic fuera de él
    document.addEventListener("click", function(e) {
        if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove("show");
        }
    });

    // Cierra el dropdown al hacer clic en un enlace del menú
    dropdownLinks.forEach(button => {
        link.addEventListener("click", function() {
            dropdownMenu.classList.remove("show"); // Cierra el dropdown
        });
    });
});


