// Menu desplegable
function toggleMenu() {
    var sidebar = document.getElementById("sidebar");
    var mainContent = document.getElementById("main-content");
    var text =document.querySelectorAll("menu-text")
    var dashboard = document.querySelector(".dashboard");
    var icons1 = document.querySelectorAll(".sidebar-icon");
    var icons2 = document.querySelectorAll(".icon2");
    var icons3 = document.querySelectorAll(".icon3");
    
    document.querySelector(".btn-menu").classList.toggle("expanded");
    document.querySelector(".profile").classList.toggle("expanded");

    sidebar.classList.toggle("expanded");
    mainContent.classList.toggle("shrink");
    dashboard.classList.toggle("shrink");
    text.classList.toggle("expanded")
   
    if (sidebar.classList.contains("expanded")) {
        icons1.forEach(icon => icon.style.justifyContent = "flex-start");
        icons2.forEach(icon => icon.style.justifyContent = "flex-start");
        icons3.forEach(icon => icon.style.justifyContent = "flex-start");
    } else {
        icons1.forEach(icon => icon.style.justifyContent = "center");
        icons2.forEach(icon => icon.style.justifyContent = "center");
    }
}



// funcion de hora

function updateDateTime() {
    const now = new Date();

    const timeOptions = { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true
    };
    const formattedTime = now.toLocaleString('es-ES', timeOptions).toUpperCase();
    
    const dateOptions = { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric'
    };
    const formattedDate = now.toLocaleString('es-ES', dateOptions);
    
    const formattedDateTime = `${formattedTime}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;${formattedDate}`;
    
    document.getElementById('datetime').innerHTML = formattedDateTime;
}
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    setInterval(updateDateTime, 60000); 
    initializeSidebar();
});






// funcion de cartas


const gradosYSecciones = [
    { grado: "Primero", secciones: ["1ro A", "1ro B", "1ro C"], imagen: "img/school.png" },
    { grado: "Segundo", secciones: ["2do A", "2do B", "2do C"], imagen: "img/school.png" },
    { grado: "Tercero", secciones: ["3ro A", "3ro B", "3ro C"], imagen: "img/school.png" },
    { grado: "Cuarto", secciones: ["4to A", "4to B", "4to C"], imagen: "img/school.png" },
    { grado: "Quinto", secciones: ["5to A", "5to B", "5to C"], imagen: "img/school.png" },
    { grado: "Sexto", secciones: ["6to A", "6to B", "6to C"], imagen: "img/school.png" }
];

// Función para crear una tarjeta de sección
function crearTarjetaSeccion(seccion, imagen) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'card grado-card';
    tarjeta.style.backgroundColor = '#FFFFFF';
    tarjeta.style.color = '#000000';
    tarjeta.style.opacity = '0';
    tarjeta.style.transform = 'translateY(20px)';
    tarjeta.style.transition = 'opacity 0.5s, transform 0.5s';

    tarjeta.innerHTML = `
        <div class="card-content">
            <div>
                <h2>${seccion}</h2>
                <p>Resumen de asistencia para ${seccion}</p>
                <a href= "\Resumen-Asistencia.html" style ="text-decoration: none;">
                  <button class="action-button">Ver detalles</button>
                </a>
                
            </div>
        </div>
        <img src="${imagen}" alt="Imagen de ${seccion}" style="height: 45%; width: 40%; object-fit: contain;">
    `;

    return tarjeta;
}

// Función para mostrar las tarjetas filtradas
function mostrarTarjetasFiltradas(filtroGrado = '', filtroTexto = '') {
    const dashboard = document.querySelector('.dashboard');
    dashboard.innerHTML = ''; 

    gradosYSecciones.forEach((gradoData) => {
        if (filtroGrado === '' || gradoData.grado === filtroGrado) {
            gradoData.secciones.forEach((seccion) => {
                if (seccion.toLowerCase().includes(filtroTexto.toLowerCase())) {
                    const tarjeta = crearTarjetaSeccion(seccion, gradoData.imagen);
                    dashboard.appendChild(tarjeta);

                    setTimeout(() => {
                        tarjeta.style.opacity = '1';
                        tarjeta.style.transform = 'translateY(0)';
                    }, 100);
                }
            });
        }
    });
}

// Función para inicializar la vista de grados
function inicializarVistaGrados() {
    const containerInput = document.querySelector('.container-input');
    containerInput.style.display = 'flex';

    const searchInput = document.querySelector('.input');
    const selectGrado = document.querySelector('.custom-select');

    // Evento para la búsqueda
    searchInput.addEventListener('input', (e) => {
        const filtroTexto = e.target.value;
        const filtroGrado = selectGrado.value;
        mostrarTarjetasFiltradas(filtroGrado, filtroTexto);
    });

    // Evento para la selección de grado
    selectGrado.addEventListener('change', (e) => {
        const filtroGrado = e.target.value;
        const filtroTexto = searchInput.value;
        mostrarTarjetasFiltradas(filtroGrado, filtroTexto);
    });

    // Mostrar todas las tarjetas inicialmente
    mostrarTarjetasFiltradas();
}

// Evento para el botón "Ver más" de Resumen de Asistencia
document.addEventListener('DOMContentLoaded', () => {
    const botonVerMas = document.querySelector('.card:first-child .action-button');
    botonVerMas.addEventListener('click', inicializarVistaGrados);
});

// Estilos adicionales (puedes mover esto a tu archivo CSS)
const estilos = `
.grado-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFFFFF;
    color: #000000;
    border-radius: 40px;
    padding: 20px;
    height: 400px;
    width: 95%;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    margin-bottom: 20px;
}

.grado-card h2, .grado-card p {
    color: #000000;
}

.grado-card .action-button {
    background-color: #48B0EA;
    color: white;
}
`;

// Añadir estilos al documento
const styleElement = document.createElement('style');
styleElement.textContent = estilos;
document.head.appendChild(styleElement);




// perfil
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('settings-icon').addEventListener('click', function() {
        document.getElementById('settings-modal').style.display = 'block';
    });

    document.getElementById('close-modal').addEventListener('click', function() {
        document.getElementById('settings-modal').style.display = 'none';
    });

    // Guardar los cambios
    document.getElementById('save-changes').addEventListener('click', function() {
        var newUsername = document.getElementById('new-username').value;
        var newProfilePicture = document.getElementById('new-profile-picture').files[0];
        
        // Actualiza la imagen de perfil
        if (newProfilePicture) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('user-profile-picture').src = e.target.result;
            }
            reader.readAsDataURL(newProfilePicture);
        }
        
        // Actualiza el nombre de usuario
        if (newUsername) {
            document.getElementById('user-name').innerText = newUsername;
        }
        
        // Cierra el modal
        document.getElementById('settings-modal').style.display = 'none';
    });

    // Cierra el modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target == document.getElementById('settings-modal')) {
            document.getElementById('settings-modal').style.display = 'none';
        }
    });
});