document.addEventListener("DOMContentLoaded", function() {
    const dropdownToggle = document.querySelector(".btn");
    const dropdownMenu = document.querySelector(".dropdown");
    const dropdownLinks = dropdownMenu.querySelectorAll("a"); // Selecciona todos los enlaces en el menú desplegable
    const loginLink = document.getElementById('loginLink');
    const loginForm = document.getElementById('loginForm');

    // Muestra el formulario de login al hacer clic en el enlace de login
    loginLink.addEventListener('click', function(event) {
        event.preventDefault(); // Previene el comportamiento por defecto del enlace
        loginForm.style.display = 'block'; // Muestra el formulario
        dropdownMenu.classList.remove('show'); // Cierra el dropdown
    });

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
    dropdownLinks.forEach(link => {
        link.addEventListener("click", function() {
            dropdownMenu.classList.remove("show"); // Cierra el dropdown
        });
    });
});

// Enviar datos del formulario al servidor
form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario

    const formData = new FormData(form);
    const data = {
        username: formData.get('Username'),
        password: formData.get('Password')
    };

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Login exitoso:', result);
            // Manejar la respuesta del servidor aquí (por ejemplo, redirigir o mostrar un mensaje)
        } else {
            console.error('Error en el login:', response.statusText);
        }
    } catch (error) {
        console.error('Error al enviar datos:', error);
    }
});

