document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-personaliza");
  const listaCarrito = document.getElementById("lista-carrito");
  const totalDisplay = document.getElementById("total");
  const formCorreo = document.getElementById("form-correo");
  const mensaje = document.getElementById("mensaje-confirmacion");
  const btnEliminar = document.getElementById("btn-eliminar"); // Botón eliminar pedido

    // Referencias para el formulario de inicio de sesión (¡NUEVO!)
    const formInicioSesion = document.getElementById('form-inicio-sesion');
    const mensajeConfirmacionLogin = document.createElement('p'); // Elemento para el mensaje de login
    mensajeConfirmacionLogin.id = 'mensaje-login';
    mensajeConfirmacionLogin.style.marginTop = '15px';
    mensajeConfirmacionLogin.style.fontWeight = 'bold';
    mensajeConfirmacionLogin.style.display = 'none'; // Oculto inicialmente

  let carrito = [];
  let total = 0;

  const precios = {
    sabores: { limon: 500, frutilla: 600, mango: 650, naranja: 550, sandia: 580 },
    toppings: { gomitas: 150, chocolate: 200, frutas: 180, crema: 170, granola: 190 },
    alcohol: 250
  };

  // Función para actualizar la lista y total en pantalla
  function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    carrito.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.descripcion} - $${item.precio}`;
      listaCarrito.appendChild(li);
    });
    totalDisplay.textContent = total;

    // Mostrar u ocultar formulario de correo y botón eliminar según si hay productos
    if (carrito.length > 0) {
      formCorreo.style.display = "block";
      btnEliminar.style.display = "block";
      mensaje.textContent = ""; // Limpiar mensaje si hay ítems
    } else {
      formCorreo.style.display = "none";
      btnEliminar.style.display = "none";
      mensaje.textContent = "El carrito está vacío.";
      mensaje.style.color = "red";
    }
  }

  // Evento para agregar producto al carrito
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const sabor = form.sabor.value;
    const topping = form.topping.value;
    const alcohol = form.alcohol.checked;

    if (!sabor || !topping) {
        alert('Por favor, selecciona un sabor y un topping.');
        return;
    }

    const precio = (precios.sabores[sabor] || 0) + (precios.toppings[topping] || 0) + (alcohol ? precios.alcohol : 0);
    const descripcion = `Granizado de ${sabor} con ${topping}${alcohol ? ' y alcohol' : ''}`;

    carrito.push({ descripcion, precio });
    total += precio;

    actualizarCarrito();
    form.reset();
    alert('¡Granizado agregado al carrito!'); // Confirmación visual
  });

  // Evento para enviar recibo por correo
  formCorreo.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = e.target.email.value;
    const resumen = carrito.map(item => item.descripcion + " ($" + item.precio + ")").join("\n");
    const contenido = `Gracias por tu pedido.\n\n${resumen}\n\nTotal: $${total}`;

    alert(`Recibo enviado a ${email}\n\n${contenido}`);
    mensaje.textContent = `¡Tu pedido ha sido confirmado y se ha enviado un recibo a ${email}!`;
    mensaje.style.color = "green";
    formCorreo.reset();
    carrito = []; // Vaciar carrito después de enviar
    total = 0;
    actualizarCarrito();
  });

  // Evento para eliminar todo el pedido
  btnEliminar.addEventListener("click", () => {
    carrito = [];
    total = 0;
    actualizarCarrito();
    mensaje.textContent = "El pedido ha sido eliminado.";
    mensaje.style.color = "red";
    setTimeout(() => mensaje.textContent = "", 3000); // Borrar mensaje después de 3 seg.
  });

  // Inicializa la página ocultando el formulario de correo y mensaje
  actualizarCarrito();

    // --- LÓGICA DE INICIO DE SESIÓN (¡AÑADIDA AQUÍ!) ---
    if (formInicioSesion) {
        // Añade el elemento del mensaje al DOM, por ejemplo, después del formulario
        formInicioSesion.parentNode.insertBefore(mensajeConfirmacionLogin, formInicioSesion.nextSibling);

        formInicioSesion.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita que el formulario se recargue la página

            const email = document.getElementById('email-login').value;
            const password = document.getElementById('password-login').value;

            // --- SIMULACIÓN DE INICIO DE SESIÓN ---
            // Usuario y contraseña "fijos" para pruebas:
            const usuarioValido = "granizados@gmail.com";
            const contrasenaValida = "granizo"; // Contraseña vacía

            if (email === usuarioValido && password === contrasenaValida) {
                mensajeConfirmacionLogin.textContent = '¡Inicio de sesión correcto!';
                mensajeConfirmacionLogin.style.color = 'green'; // Color para éxito
                mensajeConfirmacionLogin.style.display = 'block'; // Muestra el mensaje
                formInicioSesion.reset(); // Limpia los campos del formulario
                console.log('Inicio de sesión exitoso para:', email);

                // Opcional: Ocultar el mensaje después de unos segundos
                setTimeout(() => {
                    mensajeConfirmacionLogin.style.display = 'none';
                }, 3000); // 3 segundos
            } else {
                mensajeConfirmacionLogin.textContent = 'Error: Correo o contraseña incorrectos.';
                mensajeConfirmacionLogin.style.color = 'red'; // Color para error
                mensajeConfirmacionLogin.style.display = 'block'; // Muestra el mensaje
                console.log('Fallo de inicio de sesión para:', email);

                // Opcional: Ocultar el mensaje después de unos segundos
                setTimeout(() => {
                    mensajeConfirmacionLogin.style.display = 'none';
                }, 3000); // 3 segundos
            }
        });
    }
});