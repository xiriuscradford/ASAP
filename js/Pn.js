const students = {
    software: [
        { name: 'Juan Pérez', phone: '1234567', status: 'present' },
        { name: 'Luis Gómez', phone: '2345678', status: 'absent' },
        { name: 'Carlos Sánchez', phone: '3456789', status: 'pending' },
        { name: 'Ana Martínez', phone: '4567890', status: 'present' },
        { name: 'María Hernández', phone: '5678901', status: 'absent' },
        { name: 'Pedro Ramírez', phone: '6789012', status: 'pending' },
        { name: 'Rosa Jiménez', phone: '7890123', status: 'present' },
        { name: 'José Castillo', phone: '8901234', status: 'absent' },
        { name: 'Miguel Tejada', phone: '9012345', status: 'pending' },
    ],
    multimedia: [
        { name: 'Cabra', phone: '0123456', status: 'pending' },
        { name: 'Carmen Núñez', phone: '1234567', status: 'pending' },
        { name: 'Felipe Rivera', phone: '2345678', status: 'present' },
        { name: 'Elena López', phone: '3456789', status: 'absent' },
        { name: 'Ricardo Pérez', phone: '4567890', status: 'absent' },
        { name: 'Patricia Morales', phone: '5678901', status: 'pending' },
        { name: 'Natalia Rodríguez', phone: '6789012', status: 'present' },
        { name: 'Sergio Vargas', phone: '7890123', status: 'absent' },
        { name: 'Diego Romero', phone: '8901234', status: 'pending' },
        { name: 'Gloria Ortiz', phone: '9012345', status: 'present' },
    ],
    redes: [
        { name: 'Carolina Mejía', phone: '0123456', status: 'pending' },
        { name: 'Laura González', phone: '1234567', status: 'present' },
        { name: 'David Peña', phone: '2345678', status: 'absent' },
        { name: 'Camila Figueroa', phone: '3456789', status: 'present' },
        { name: 'Esteban De la Cruz', phone: '4567890', status: 'absent' },
        { name: 'Susana Peralta', phone: '5678901', status: 'pending' },
        { name: 'Ignacio Paredes', phone: '6789012', status: 'present' },
        { name: 'Claudia Mota', phone: '7890123', status: 'absent' },
        { name: 'Francisco Martínez', phone: '8901234', status: 'pending' },
    ]
};




function displayStudents(grade) {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';
    students[grade].forEach(student => {
        const studentBox = document.createElement('div');
        studentBox.className = 'student-box';
        studentBox.innerHTML = `
            <div class="student-avatar"></div>
            <div class="student-info">
                <div class="student-name">${student.name}</div>
                <div class="student-phone">${student.phone}</div>
            </div>
            <div class="status-icon status-${student.status}"></div>
        `;
        studentList.appendChild(studentBox);
    });
}

document.getElementById('gradeSelect').addEventListener('change', function () {
    displayStudents(this.value);
});


displayStudents('software');




const users = [
    { name: 'Juan Pérez', phone: '1234567', status: 'present' },
    { name: 'Luis Gómez', phone: '2345678', status: 'absent' },
    { name: 'Ana Martínez', phone: '4567890', status: 'present' },
    { name: 'María Hernández', phone: '5678901', status: 'absent' },
    { name: 'María Hernández', phone: '5678901', status: 'absent' },
    { name: 'Rosa Jiménez', phone: '7890123', status: 'excused' },
    { name: 'José Castillo', phone: '8901234', status: 'absent' },
    { name: 'José Castillo', phone: '8901234', status: 'absent' },
    { name: 'Miguel Tejada', phone: '9012345', status: 'excused' },
    
];

let currentFilter = 'all';

function createUserBox(user, index) {
    const userBox = document.createElement('div');
    userBox.className = 'user-box1';
    userBox.innerHTML = `
        <div class="user-avatar1"></div>
        <div class="user-info1">
            <div class="user-name1">${user.name}</div>
            <div class="user-phone1">${user.phone}</div>
        </div>
        <div class="user-actions1">
            <div class="action-icon1 ${getStatusIcon(user.status)}">${getStatusSymbol(user.status)}</div>
            <select class="status-select" onchange="changeStatus(${index}, this.value)">
                <option value="present" ${user.status === 'present' ? 'selected' : ''}>Presente</option>
                <option value="absent" ${user.status === 'absent' ? 'selected' : ''}>Ausente</option>
                <option value="excused" ${user.status === 'excused' ? 'selected' : ''}>Excusado</option>
            </select>
            <div class="action-icon1 trash-icon1" onclick="removeUser(${index})">🗑</div>
        </div>
    `;
    return userBox;
}

function getStatusIcon(status) {
    switch(status) {
        case 'present': return 'check-icon1';
        case 'absent': return 'x-icon1';
        case 'excused': return 'excused-icon1';
        default: return '';
    }
}

function getStatusSymbol(status) {
    switch(status) {
        case 'present': return '✓';
        case 'absent': return 'X';
        case 'excused': return 'E';
        default: return '';
    }
}

function changeStatus(index, newStatus) {
    users[index].status = newStatus;
    displayUsers();
}

function displayUsers() {
    const userList = document.getElementById('userList1');
    userList.innerHTML = '';
    users.forEach((user, index) => {
        if (currentFilter === 'all' || user.status === currentFilter) {
            userList.appendChild(createUserBox(user, index));
        }
    });
}

function setupFilterButtons() {
    const Asistidos = document.getElementById('Asistidos');
    const Ausentes = document.getElementById('Ausentes');
    const Excusas = document.getElementById('Excusas');

    Asistidos.addEventListener('click', function (evento) {
        evento.preventDefault();
        currentFilter = 'present';
        displayUsers();
    });

    Ausentes.addEventListener('click', function (evento) {
        evento.preventDefault();
        currentFilter = 'absent';
        displayUsers();
    });

    Excusas.addEventListener('click', function (evento) {
        evento.preventDefault();
        currentFilter = 'excused';
        displayUsers();
    });
}

function removeUser(index) {
    const isConfirmed = confirm('¿Estás seguro de que quieres eliminar este elemento?');
    if (isConfirmed) {
        users.splice(index, 1);
        displayUsers();
    }
}

// Inicializar la lista de usuarios y configurar los botones de filtro
setupFilterButtons();
displayUsers();

// Mantenemos la funcionalidad de búsqueda existente para la Caja 1
const buscador = document.getElementById('buscador');
const lista = document.getElementById('studentList');

buscador.addEventListener('input', function() {
    const filtro = buscador.value.toLowerCase();
    const studentBoxes = lista.getElementsByClassName('student-box');

    Array.from(studentBoxes).forEach(box => {
        const nombre = box.querySelector('.student-name').textContent.toLowerCase();
        const telefono = box.querySelector('.student-phone').textContent.toLowerCase();
        
        if (nombre.includes(filtro) || telefono.includes(filtro) || filtro === "") {
            box.style.display = "";
        } else {
            box.style.display = "none";
        }
    });
});


// hora

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

// Menu desplegable
function toggleMenu() {
    var sidebar = document.getElementById("sidebar");
    var mainContent = document.getElementById("main-content");
    var dashboard = document.querySelector(".dashboard");
    var icons1 = document.querySelectorAll(".sidebar-icon");
    var icons2 = document.querySelectorAll(".icon2");
    
    document.querySelector(".btn-menu").classList.toggle("expanded");
    document.querySelector(".profile").classList.toggle("expanded");

    sidebar.classList.toggle("expanded");
    mainContent.classList.toggle("shrink");
    dashboard.classList.toggle("shrink");
   
    if (sidebar.classList.contains("expanded")) {
        icons1.forEach(icon => icon.style.justifyContent = "flex-start");
        icons2.forEach(icon => icon.style.justifyContent = "flex-start");
    } else {
        icons1.forEach(icon => icon.style.justifyContent = "center");
        icons2.forEach(icon => icon.style.justifyContent = "center");
    }
}

