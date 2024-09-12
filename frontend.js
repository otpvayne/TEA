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
    const registroFormElement = document.querySelector('.Registro');
    
    registroFormElement.addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(registroFormElement);
        const data = {
            Nombre_Tutor: formData.get('Nombre_Tutor'),
            Nombre_Jugador: formData.get('Nombre_Jugador'),
            Contraseña: formData.get('Contraseña'),
            Edad_Jugador: formData.get('Edad_Jugador'),
            Correo: formData.get('Correo')
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
// const boton_registro = document.getElementById('create_regristration');
// boton_registro.addEventListener('click', function(event) {
//     event.preventDefault();
//     console.log("hola")
//     const formData = new FormData(document.querySelector('.Registro'));
//     const data = {
//         Nombre_Tutor: formData.get('Nombre_Tutor'),
//         Nombre_Jugador: formData.get('Nombre_Jugador'),
//         Contraseña: formData.get('Contraseña'),
//         Edad_Jugador: formData.get('Edad_Jugador'),
//         Correo: formData.get('Correo')
//     };
// });
document.addEventListener('DOMContentLoaded', function() {
    const registroFormElement = document.getElementById('registroForm');
    const botonRegistro = document.getElementById('create_registration');

    botonRegistro.addEventListener('click', async function() {
        // Accediendo a los elementos del formulario
        const nombreTutor = registroFormElement.querySelector('input[name="Nombre_Tutor"]').value;
        const nombreJugador = registroFormElement.querySelector('input[name="Nombre_Jugador"]').value;
        const contraseña = registroFormElement.querySelector('input[name="Contraseña"]').value;
        const correo = registroFormElement.querySelector('input[name="Correo"]').value;
        const edadJugador = registroFormElement.querySelector('input[name="Edad_Jugador"]').value;

        // Imprimiendo los datos en la consola
        console.log('Nombre del Tutor:', nombreTutor);
        console.log('Nombre del Jugador:', nombreJugador);
        console.log('Contraseña:', contraseña);
        console.log('Correo:', correo);
        console.log('Edad del Jugador:', edadJugador);
        const data = {
                    Nombre_Tutor: nombreTutor,
                    Nombre_Jugador: nombreJugador,
                    Contraseña: contraseña,
                    Edad_Jugador: edadJugador,
                    Correo: correo
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