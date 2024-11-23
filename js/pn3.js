const students = {
    software: [
        { name: 'Jhoanny Reynoso', phone: '1234567(Software)', status: 'present' },
        { name: 'Luis David', phone: '1274567(Matematicas)', status: 'absent' },
        { name: 'María Hernández', phone: '5678901(Física)', status: 'absent' },
        { name: 'Rosa Jiménez', phone: '7890123(Arte)', status: 'present' },
        { name: 'José Castillo', phone: '8901234(Historia)', status: 'absent' },
        { name: 'Sofía Morales', phone: '7890123(Literatura)', status: 'absent' },
        { name: 'Natalia Mendoza', phone: '8765432(Historia)', status: 'pending' },
        { name: 'Javier Díaz', phone: '8901234(Computación)', status: 'absent' },

        
    ],
    multimedia: [
        { name: 'Ricardo Gómez', phone: '3210987(Química)', status: 'absent' },
        { name: 'Daniela Rodríguez', phone: '2109876(Arte)', status: 'present' },
        { name: 'Andrés Ramírez', phone: '1098765(Música)', status: 'pending' },
        { name: 'Verónica Jiménez', phone: '8901234(Matématicas)', status: 'present' },
        { name: 'Sofía Morales', phone: '7890123(Literatura)', status: 'absent' },
        { name: 'Diego Castro', phone: '4567890(Biología)', status: 'pending' },
        { name: 'Sergio Vargas', phone: '6789012(Computación)', status: 'absent' },
        { name: 'Diego Romero', phone: '7890123(Filosofía)', status: 'pending' },
        { name: 'Gloria Ortiz', phone: '8901234(Música)', status: 'present' },
    ],
    redes: [
        { name: 'Gabriel Torres', phone: '6543210(Inglés)', status: 'present' },
        { name: 'María López', phone: '9876543(Ciencias)', status: 'absent' },
        { name: 'José Martínez', phone: '5432109(Historia)', status: 'pending' },
        { name: 'Lucía Sánchez', phone: '8765432(Física)', status: 'present' },
        { name: 'Ricardo Gómez', phone: '3210987(Química)', status: 'absent' },
        { name: 'Daniela Rodríguez', phone: '2109876(Arte)', status: 'present' },
        { name: 'Andrés Ramírez', phone: '1098765(Música)', status: 'pending' },
        { name: 'Verónica Jiménez', phone: '8901234(Matématicas)', status: 'present' },
        { name: 'Sofía Morales', phone: '7890123(Literatura)', status: 'absent' },
        { name: 'Diego Castro', phone: '4567890(Biología)', status: 'pending' },
        { name: 'Javier Díaz', phone: '8901234(Computación)', status: 'absent' },

    ],
    software1: [
        { name: 'Jhoanny Reynoso', phone: '1234567(Software)', status: 'present' },
        { name: 'Luis David', phone: '1274567(Matematicas)', status: 'absent' },
        { name: 'Fernando Alvarado', phone: '2345678(Geografía)', status: 'present' },
        { name: 'Isabel Herrera', phone: '7654321(Filosofía)', status: 'absent' },
        { name: 'Oscar Pérez', phone: '3456789(Dibujo Técnico)', status: 'pending' },
        { name: 'Carmen Ruiz', phone: '5678901(Educación Física)', status: 'present' },
        { name: 'Javier Díaz', phone: '8901234(Computación)', status: 'absent' },
        { name: 'Andrea Castillo', phone: '6789012(Química)', status: 'present' },
    ],
    multimedia1: [
        { name: 'Jhoanny Reynoso', phone: '1234567(Software)', status: 'present' },
        { name: 'Luis David', phone: '1274567(Matematicas)', status: 'absent' },
        { name: 'Emilio González', phone: '9876543(Literatura)', status: 'absent' },
        { name: 'Natalia Mendoza', phone: '8765432(Historia)', status: 'pending' },
        { name: 'Daniela Rodríguez', phone: '2109876(Arte)', status: 'present' },
        { name: 'Sofía Morales', phone: '7890123(Literatura)', status: 'absent' },
        { name: 'Verónica Jiménez', phone: '8901234(Matématicas)', status: 'present' },
        { name: 'Sofía Morales', phone: '7890123(Literatura)', status: 'absent' },
        { name: 'Diego Castro', phone: '4567890(Biología)', status: 'pending' },
    ],
    redes1: [
        { name: 'Jhoanny Reynoso', phone: '1234567(Software)', status: 'present' },
        { name: 'Luis David', phone: '1274567(Matematicas)', status: 'absent' },
        { name: 'Carolina Mejía', phone: '9012345(Música)', status: 'pending' },
        { name: 'Laura González', phone: '0123456(Arte)', status: 'present' },
        { name: 'David Peña', phone: '1234567(Inglés)', status: 'absent' },
        { name: 'Camila Figueroa', phone: '2345678(Filosofía)', status: 'present' },
        { name: 'Esteban De la Cruz', phone: '3456789(Educación Física)', status: 'absent' }
    ]
};





function displayStudents(grade) {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';
    students[grade].forEach(student => {
        const studentBox = document.createElement('div');
        studentBox.className = 'student-box';
        studentBox.innerHTML = `
            <div class="student-avatar">U</div>
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
    { name: 'Victoria Severino', phone: '1234567(Administracion de asistencias)', status: 'present' },
    

];

let currentFilter = 'all';

function createUserBox(user, index) {
    const userBox = document.createElement('div');
    userBox.className = 'user-box1';
    userBox.innerHTML = `
        <div class="user-avatar1"> </div>
        <div class="user-info1">
            <div class="user-name1">${user.name}</div>
            <div class="user-phone1">${user.phone}</div>
        </div>
        <div class="user-actions1">
            <div class="action-icon1 ${getStatusIcon(user.status)}">${getStatusSymbol(user.status)}</div>
            <select class="status-select" onchange="changeStatus(${index}, this.value)">
                
            </select>
            <div class="action-icon1 trash-icon1" onclick="removeUser(${index})">🗑</div>
        </div>
    `;
    return userBox;
}

function getStatusIcon(status) {
    switch (status) {
        case 'present': return 'check-icon1';
        ;
        default: return '';
    }
}

function getStatusSymbol(status) {
    switch (status) {
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

buscador.addEventListener('input', function () {
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
document.addEventListener('DOMContentLoaded', function () {
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
