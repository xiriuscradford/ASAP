// Menu desplegable
function toggleMenu() {
    var sidebar = document.getElementById("sidebar");
    var mainContent = document.getElementById("main-content");
    var text = document.querySelectorAll("menu-text");
    var dashboard = document.querySelector(".dashboard");
    var icons1 = document.querySelectorAll(".sidebar-icon");
    var icons2 = document.querySelectorAll(".icon2");
    var icons3 = document.querySelectorAll(".icon3");
    
    document.querySelector(".btn-menu").classList.toggle("expanded");
    document.querySelector(".profile").classList.toggle("expanded");

    sidebar.classList.toggle("expanded");
    mainContent.classList.toggle("shrink");
    if (dashboard) dashboard.classList.toggle("shrink");
    text.forEach(t => t.classList.toggle("expanded"));
   
    if (sidebar.classList.contains("expanded")) {
        icons1.forEach(icon => icon.style.justifyContent = "flex-start");
        icons2.forEach(icon => icon.style.justifyContent = "flex-start");
        icons3.forEach(icon => icon.style.justifyContent = "flex-start");
    } else {
        icons1.forEach(icon => icon.style.justifyContent = "center");
        icons2.forEach(icon => icon.style.justifyContent = "center");
    }
}// Función de hora
function updateDateTime() {
    const now = new Date();
    const timeOptions = { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true
    };
    const dateOptions = { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric'
    };
    
    const formattedTime = now.toLocaleTimeString('es-ES', timeOptions).toUpperCase();
    const formattedDate = now.toLocaleDateString('es-ES', dateOptions);
    const formattedDateTime = `${formattedTime}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;${formattedDate}`;
    
    const datetimeElement = document.getElementById('datetime');
    if (datetimeElement) {
        datetimeElement.innerHTML = formattedDateTime;
    }
}

// Actualizar la hora cada segundo
setInterval(updateDateTime, 1000);
updateDateTime(); // Actualización inicial

// Estado global para las excusas
let excusasState = {
    todas: [
        {
            id: 1,
            nombre: "Carlos Manuel Peña Rivera",
            matricula: "20210101",
            curso: "1ro C",
            tutor: "María Rivera",
            telefono: "829-555-0101",
            fecha: "2024-10-20",
            detalles: "No pude asistir a clases debido a una cita médica de emergencia en el hospital. Adjunto el certificado médico correspondiente.",
            evidencia: "📄 Certificado Médico",
            estado: "pendiente",
            imagenUrl: null
        },
        {
            id: 2,
            nombre: "Ana María Sánchez Díaz",
            matricula: "20210102",
            curso: "2do A",
            tutor: "José Díaz",
            telefono: "809-555-0202",
            fecha: "2024-10-19",
            detalles: "Tuve que ausentarme debido a la participación en las olimpiadas nacionales de matemáticas representando al colegio.",
            evidencia: "🏆 Constancia de Participación",
            estado: "pendiente",
            imagenUrl: null
        },
        {
            id: 3,
            nombre: "José Daniel Martínez Cruz",
            matricula: "20210103",
            curso: "3ro B",
            tutor: "Carmen Cruz",
            telefono: "849-555-0303",
            fecha: "2024-10-18",
            detalles: "Por motivos familiares tuve que viajar a Santiago. Mi abuela fue hospitalizada y somos el único apoyo familiar que tiene.",
            evidencia: "📄 Carta Familiar",
            estado: "pendiente",
            imagenUrl: null
        },
        {
            id: 4,
            nombre: "Mauren Orozco",
            matricula: "20210104",
            curso: "4to D",
            tutor: "Pedro Orozco",
            telefono: "809-555-0404",
            fecha: "2024-10-19",
            detalles: "No pude asistir debido a las fuertes lluvias que causaron inundaciones en mi sector, imposibilitando la salida de mi residencial.",
            evidencia: "📷 Fotos del Área",
            estado: "pendiente",
            imagenUrl: null
        },
        {
            id: 5,
            nombre: "Luis Enrique Mendoza",
            matricula: "20210105",
            curso: "1ro A",
            tutor: "Ana Mendoza",
            telefono: "829-555-0505",
            fecha: "2024-10-20",
            detalles: "Tuve una competencia deportiva representando al colegio en el torneo intercolegial de volleyball.",
            evidencia: "🏆 Constancia Deportiva",
            estado: "pendiente",
            imagenUrl: null
        }
    ],
    filtradas: []
};

function clearLocalStorage() {
    localStorage.removeItem('excuseList');
}

function generateId() {
    return Math.max(0, ...excusasState.todas.map(e => e.id)) + 1;
}

function loadExcusasFromStorage() {
    const storedExcusas = localStorage.getItem('excuseList');
    if (storedExcusas) {
        const formExcusas = JSON.parse(storedExcusas);
        
        // Limpiar las excusas existentes excepto las predeterminadas
        const defaultExcusas = excusasState.todas.filter(e => e.id <= 5);
        
        const newExcusas = formExcusas.map(formData => ({
            id: generateId(),
            nombre: formData.studentName,
            matricula: formData.matricula,
            curso: formData.course,
            tutor: formData.tutorName,
            telefono: formData.phone,
            fecha: new Date(formData.timestamp).toISOString().split('T')[0],
            detalles: formData.description,
            evidencia: "📄 Documento adjunto",
            estado: "pendiente",
            imagenUrl: formData.imagenUrl
        }));

        // Combinar las excusas predeterminadas con las nuevas
        excusasState.todas = [...defaultExcusas, ...newExcusas];
        
        // Actualizar localStorage con todas las excusas
        const allExcusas = excusasState.todas.slice(5).map(excusa => ({
            studentName: excusa.nombre,
            matricula: excusa.matricula,
            course: excusa.curso,
            tutorName: excusa.tutor,
            phone: excusa.telefono,
            description: excusa.detalles,
            timestamp: new Date(excusa.fecha).toISOString(),
            imagenUrl: excusa.imagenUrl
        }));
        
        localStorage.setItem('excuseList', JSON.stringify(allExcusas));
    }
}

function searchStudent() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const estadoSeleccionado = document.getElementById('gradeSelect').value;
    
    let excusasFiltradas = excusasState.todas;
    
    if (estadoSeleccionado !== 'todos') {
        const estadoMap = {
            'software': 'aprobada',
            'multimedia': 'rechazada',
            'pendiente': 'pendiente'
        };
        excusasFiltradas = excusasState.todas.filter(excusa => 
            excusa.estado === estadoMap[estadoSeleccionado]
        );
    }
    
    if (searchInput) {
        excusasFiltradas = excusasFiltradas.filter(excusa => 
            excusa.nombre.toLowerCase().includes(searchInput) ||
            excusa.matricula.toLowerCase().includes(searchInput)
        );
    }
    
    excusasState.filtradas = excusasFiltradas;
    renderExcusaList();
}

function verDetalles(id) {
    const excusa = excusasState.todas.find((e) => e.id === id);
    if (!excusa) {
        console.error('No se encontró la excusa con ID:', id);
        return;
    }

    const popupInfo = document.getElementById('popup-info');
    
    const desExcusa = popupInfo.querySelector('.des-excusa');
    desExcusa.innerHTML = `
        <span><b>Nombre:</b> ${excusa.nombre}</span>
        <span><b>Matrícula:</b> ${excusa.matricula}</span>
        <span><b>Curso:</b> ${excusa.curso}</span>
        <span><b>Tutor:</b> ${excusa.tutor}</span>
        <span><b>Teléfono:</b> ${excusa.telefono}</span>
        <span><b>Fecha:</b> ${excusa.fecha}</span>
    `;

    const descripcionTextarea = popupInfo.querySelector('.descripcion-textarea');
    descripcionTextarea.innerHTML = `
        <span>Descripción de excusa:</span>
        <p style="margin: 15px; margin-top:5px; line-height: 1.5;" class="p-textarea">${excusa.detalles}</p>
    `;

    const imgEvidence = popupInfo.querySelector('.img-evidence');
    const img = imgEvidence.querySelector('.img-prueba');
    const fileIcon = imgEvidence.querySelector('svg');
    
    if (excusa.imagenUrl) {
        img.src = excusa.imagenUrl;
        img.style.display = 'block';
        fileIcon.style.display = 'none';
    } else {
        img.style.display = 'none';
        fileIcon.style.display = 'block';
    }

    popupInfo.style.display = 'flex';
}

function getEstadoIcon(estado) {
    return `<span class="estado-dot estado-${estado}"></span>`;
}

function renderExcusaList() {
    const excusaList = document.getElementById('excusa-list');
    if (!excusaList) return;
    
    excusaList.innerHTML = '';

    const excusasAMostrar = excusasState.filtradas.length > 0 ? excusasState.filtradas : excusasState.todas;

    excusasAMostrar.forEach((excusa) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${excusa.nombre}</td>
            <td>${excusa.matricula}</td>
            <td>${excusa.curso}</td>
            <td>
                <i class="fas fa-eye" onclick="verDetalles(${excusa.id})" style="cursor: pointer; margin-right: 10px;"></i>
                ${excusa.estado === 'pendiente' ? 
                    `<button onclick="abrirAdmin(${excusa.id})" style="border: none; background: none; cursor: pointer;" class="buton-ver">⋮</button>` : 
                    getEstadoIcon(excusa.estado)}
            </td>
        `;
        excusaList.appendChild(row);
    });
}

function abrirAdmin(id) {
    window.currentExcusaId = id;
    document.getElementById('popup-admin').style.display = 'flex';
}

function cerrarAdmin() {
    document.getElementById('popup-admin').style.display = 'none';
}

function cerrarInfo() {
    document.getElementById('popup-info').style.display = 'none';
}

function aceptarExcusa() {
    const index = excusasState.todas.findIndex(e => e.id === window.currentExcusaId);
    if (index !== -1) {
        excusasState.todas[index].estado = 'aprobada';
        guardarEstadoExcusas();
    }
    renderExcusaList();
    cerrarAdmin();
    searchStudent();
}

function rechazarExcusa() {
    const index = excusasState.todas.findIndex(e => e.id === window.currentExcusaId);
    if (index !== -1) {
        excusasState.todas[index].estado = 'rechazada';
        guardarEstadoExcusas();
    }
    renderExcusaList();
    cerrarAdmin();
    searchStudent();
}

function guardarEstadoExcusas() {
    const excusasParaGuardar = excusasState.todas.slice(5).map(excusa => ({
        studentName: excusa.nombre,
        matricula: excusa.matricula,
        course: excusa.curso,
        tutorName: excusa.tutor,
        phone: excusa.telefono,
        description: excusa.detalles,
        timestamp: new Date(excusa.fecha).toISOString(),
        imagenUrl: excusa.imagenUrl
    }));
    
    localStorage.setItem('excuseList', JSON.stringify(excusasParaGuardar));
}

document.addEventListener('DOMContentLoaded', () => {
    loadExcusasFromStorage();
    renderExcusaList();
    updateDateTime();
    
    const searchInput = document.getElementById('search-input');
    const gradeSelect = document.getElementById('gradeSelect');
    
    if (searchInput) {
        searchInput.addEventListener('input', searchStudent);
    }
    
    if (gradeSelect) {
        gradeSelect.addEventListener('change', searchStudent);
    }
});