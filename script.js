//carrusel
let currentIndex = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  // Ocultar todas las diapositivas y quitar la clase 'active' de todos los puntos
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
  });

  dots.forEach((dot) => {
    dot.classList.remove('active');
  });

  // Mostrar la diapositiva activa y activar el punto correspondiente
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

function nextSlide() {
  const slides = document.querySelectorAll('.slide');
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  const slides = document.querySelectorAll('.slide');
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

// Función para ir a la diapositiva correspondiente desde los puntos de navegación
function goToSlide(index) {
  currentIndex = index;
  showSlide(currentIndex);
}

setInterval(nextSlide, 3000);

// Agregar eventos a los botones de navegación
document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);

function ordenarAhora() {
  alert('¡Ordena tus platos favoritos ahora!');
}

// Mostrar y ocultar el carrito
document.getElementById('carritoToggle').addEventListener('click', function() {
  var carritoSection = document.getElementById('cont-carrito-section');
  if (carritoSection.style.display === "none" || carritoSection.style.display === "") {
    carritoSection.style.display = "flex"; 
    setTimeout(function() {
      carritoSection.style.opacity = 1; 
    }, 10);
  } else {
    carritoSection.style.opacity = 0; 
    setTimeout(function() {
      carritoSection.style.display = "none"; 
    }, 300); // Esto debe coincidir con la duración de la transición
  }
});

// Agregar un producto sugerido al carrito
function addSuggestedItem(nombreProducto, precio) {
  var productosCarrito = document.getElementById('productosCarrito');
  var newProduct = document.createElement('div');
  newProduct.classList.add('producto-carrito');
  newProduct.innerHTML = `
      <p>${nombreProducto}</p>
      <p>$${precio}</p>
  `;
  productosCarrito.appendChild(newProduct);
  updateTotal(precio); // Actualizar el total con el precio del producto agregado
}

// Actualizar el total del carrito
function updateTotal(precio) {
  var total = document.getElementById('totalCarrito');
  var currentTotal = parseFloat(total.innerText.replace('$', ''));
  currentTotal += precio;
  total.innerText = `$${currentTotal.toFixed(2)}`; // Redondear a 2 decimales
}

// Procesar el pago
function processPayment(tipo = 'en línea') {
  alert(`Procesando pago: ${tipo}`);
  // Aquí agregarás la lógica para realizar el pago según el tipo
}

// Cerrar el carrito al hacer clic en el botón de cierre
document.getElementById('closeCarrito').addEventListener('click', function() {
  var carritoSection = document.getElementById('cont-carrito-section');
  carritoSection.style.opacity = 0;
  setTimeout(function() {
    carritoSection.style.display = "none"; 
  }, 300); 
});


//formulario 
function toggleForm(formId, action) {
  const form = document.getElementById(formId);
  form.style.display = action === 'show' ? 'flex' : 'none';
}
// Mostrar el formulario de login
document.getElementById('usuarioIcon').addEventListener('click', function() {
  document.getElementById('login-section').style.display = 'flex';
});
//cierre de loging

document.getElementById('close-login').addEventListener('click', function() {
  document.getElementById('login-section').style.display = 'none';
});


// Mostrar el formulario de registro
document.getElementById('register-link').addEventListener('click', function () {
  const section = document.getElementById('create-account-section');
  section.style.display = 'flex'; 
});

// Cerrar el formulario de registro
document.getElementById('close-create-account').addEventListener('click', function () {
  const section = document.getElementById('create-account-section');
  section.style.display = 'none';
});


// JavaScript para cambiar de secciones
// Selecciona todos los enlaces del menú
const links = document.querySelectorAll('.nav-links a');

// Añadir evento de clic para cambiar de sección
links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Evitar que se recargue la página
    const sectionId = e.target.getAttribute('data-section');
    
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
      section.classList.add('hidden');
    });

    // Mostrar la sección correspondiente
    document.getElementById(sectionId).classList.remove('hidden');
  });
});
function showSection(sectionId) {
  // Ocultar todas las secciones
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('hidden');
  });

  // Mostrar la sección seleccionada
  document.getElementById(sectionId).classList.remove('hidden');
}


//coneccion con el login.php
document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault(); 

  let formData = new FormData(this);

  fetch("login.php", {
      method: "POST",
      body: formData
  })
  .then(response => response.text())
  .then(data => {
      if (data === "success") {
          window.location.href = "dashboard.php"; // Redirige después del login
      } else {
          document.getElementById("login-error").style.display = "block";
      }
  })
  .catch(error => console.error("Error:", error));
});

docu










  
  