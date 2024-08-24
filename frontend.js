document.addEventListener("DOMContentLoaded", function() {
    const dropdownToggle = document.querySelector(".btn");
    const dropdownMenu = document.querySelector(".dropdown");
    const dropdownLinks = dropdownMenu.querySelectorAll("a");
    const loginLink = document.getElementById('loginLink');
    const loginForm = document.getElementById('loginForm');
    const registroLink = document.getElementById('registroLink');
    const registroForm = document.getElementById('registroForm');
    const registroLinkEnLogin = document.querySelector('.register-link a');

    function showForm(form) {
        loginForm.style.display = 'none';
        registroForm.style.display = 'none';
        form.style.display = 'block';
        dropdownMenu.classList.remove('show');
    }

    loginLink.addEventListener('click', function(event) {
        event.preventDefault();
        showForm(loginForm);
    });

    registroLink.addEventListener('click', function(event) {
        event.preventDefault();
        showForm(registroForm);
    });

    registroLinkEnLogin.addEventListener('click', function(event) {
        event.preventDefault();
        showForm(registroForm);
    });

    dropdownToggle.addEventListener("click", function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle("show");
    });


    dropdownLinks.forEach(link => {
        link.addEventListener("click", function() {
            dropdownMenu.classList.remove("show");
        });
    });

    // Manejo del formulario de login
    const loginFormElement = document.querySelector('.login form');
    loginFormElement.addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(loginFormElement);
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
                // Manejar la respuesta del servidor aquí
            } else {
                console.error('Error en el login:', response.statusText);
            }
        } catch (error) {
            console.error('Error al enviar datos:', error);
        }
    });

    // Manejo del formulario de registro
    const registroFormElement = document.querySelector('.registroForm');
    registroFormElement.addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(registroFormElement);
        const data = {
            Nombre: formData.get('Nombre'),
            Apellido: formData.get('Apellido'),
            Usuario: formData.get('Usuario'),
            Contraseña: formData.get('Contraseña'),
            Edad: formData.get('Edad'),
            Genero: formData.get('Genero'),
            Email: formData.get('Email')
        };

        try {
            const response = await fetch('/Registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Registro exitoso:', result);
                // Manejar la respuesta del servidor aquí
            } else {
                console.error('Error en el registro:', response.statusText);
            }
        } catch (error) {
            console.error('Error al enviar datos:', error);
        }
    });
});

