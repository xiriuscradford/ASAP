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
}

// Función de hora
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

const allStudents = {
    software: [
        { id: 1, name: "Carlos Manuel Peña Rivera", matricula: "2021-0101-S", curso: "Software-5A", status: "present" },
        { id: 2, name: "Ana María Sánchez Díaz", matricula: "2021-0102-S", curso: "Software-5A", status: "absent" },
        { id: 3, name: "José Daniel Martínez Cruz", matricula: "2021-0103-S", curso: "Software-5A", status: "present" },
        { id: 4, name: "Laura Patricia Vega Torres", matricula: "2021-0104-S", curso: "Software-5A", status: "excused" },
        { id: 5, name: "Miguel Ángel Rojas Lima", matricula: "2021-0105-S", curso: "Software-5A", status: "present" }
    ],
    multimedia: [
        { id: 1, name: "Isabel Cristina Morales Paz", matricula: "2021-0201-M", curso: "Multimedia-5B", status: "present" },
        { id: 2, name: "Roberto Alex Figueroa Soto", matricula: "2021-0202-M", curso: "Multimedia-5B", status: "present" },
        { id: 3, name: "Carmen Elena Torres Mora", matricula: "2021-0203-M", curso: "Multimedia-5B", status: "absent" },
        { id: 4, name: "Francisco Javier Luna Pérez", matricula: "2021-0204-M", curso: "Multimedia-5B", status: "excused" },
        { id: 5, name: "Diana Carolina Pardo Ruiz", matricula: "2021-0205-M", curso: "Multimedia-5B", status: "present" }
    ],
    redes: [
        { id: 1, name: "Pedro Antonio Castro Silva", matricula: "2021-0301-R", curso: "Redes-5C", status: "present" },
        { id: 2, name: "María Fernanda Ortiz Vargas", matricula: "2021-0302-R", curso: "Redes-5C", status: "excused" },
        { id: 3, name: "Juan Pablo Mendoza Ríos", matricula: "2021-0303-R", curso: "Redes-5C", status: "present" },
        { id: 4, name: "Valentina Andrea López Cruz", matricula: "2021-0304-R", curso: "Redes-5C", status: "absent" },
        { id: 5, name: "Ricardo José Herrera Monte", matricula: "2021-0305-R", curso: "Redes-5C", status: "present" }
    ]
};

let currentStudents = allStudents.software; 
let currentStudentId;

function getStatusIcon(status) {
    switch (status) {
        case 'present': return '✓';
        case 'excused': return '!';
        case 'absent': return '✗';
        default: return '';
    }
}
function renderStudentList(searchTerm = '') {
    const studentList = document.getElementById('student-list');
    const selectedCourse = document.getElementById('gradeSelect').value;
    studentList.innerHTML = '';
    
    const studentsToShow = allStudents[selectedCourse];
    
    const filteredStudents = studentsToShow.filter(student => 
        student.name.toUpperCase().includes(searchTerm.toUpperCase()) ||
        student.matricula.toUpperCase().includes(searchTerm.toUpperCase())
    );
    
    filteredStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.matricula}</td>
            <td>${student.curso}</td>
            <td><span class="attendance-status ${student.status}">${getStatusIcon(student.status)}</span></td>
            <td>
                <i class="fas fa-edit" onclick="openEditModal(${student.id}, '${selectedCourse}')"></i>
                <i class="fas fa-eye"></i>
                <i class="fas fa-ellipsis-h" onclick="openAttendanceModal(${student.id}, '${selectedCourse}')"></i>
            </td>
        `;
        studentList.appendChild(row);
    });
    
    currentStudents = studentsToShow;
}

// Función de búsqueda
function searchStudent() {
    const searchTerm = document.getElementById('search-input').value;
    renderStudentList(searchTerm);
}

// Modal de edición de perfil
function openEditModal(studentId, courseType) {
    currentStudentId = studentId;
    const student = allStudents[courseType].find(s => s.id === studentId);
    document.getElementById('edit-name').value = student.name;
    document.getElementById('edit-email').value = student.matricula;
    document.getElementById('edit-grade').value = student.curso;
    document.getElementById('edit-modal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

function saveEditChanges() {
    const name = document.getElementById('edit-name').value;
    const email = document.getElementById('edit-email').value;
    const grade = document.getElementById('edit-grade').value;
    const selectedCourse = document.getElementById('gradeSelect').value;

    const studentIndex = allStudents[selectedCourse].findIndex(s => s.id === currentStudentId);
    if (studentIndex !== -1) {
        allStudents[selectedCourse][studentIndex].name = name;
        allStudents[selectedCourse][studentIndex].matricula = email;
        allStudents[selectedCourse][studentIndex].curso = grade;
        renderStudentList();
        closeEditModal();
    }
}

// Modal de asistencia
function openAttendanceModal(studentId, courseType) {
    currentStudentId = studentId;
    const student = allStudents[courseType].find(s => s.id === studentId);
    document.getElementById('edit-attendance').value = student.status;
    document.getElementById('attendance-modal').style.display = 'block';
}

function closeAttendanceModal() {
    document.getElementById('attendance-modal').style.display = 'none';
}

function saveAttendanceChanges() {
    const newStatus = document.getElementById('edit-attendance').value;
    const selectedCourse = document.getElementById('gradeSelect').value;
    
    const studentIndex = allStudents[selectedCourse].findIndex(s => s.id === currentStudentId);
    if (studentIndex !== -1) {
        allStudents[selectedCourse][studentIndex].status = newStatus;
        renderStudentList();
        closeAttendanceModal();
    }
}

// Event Listeners - Inicialización
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    setInterval(updateDateTime, 60000);
    
    renderStudentList();
    
    document.getElementById('gradeSelect').addEventListener('change', function() {
        document.getElementById('search-input').value = '';
        renderStudentList();
    });
    
    document.getElementById('search-input').addEventListener('keyup', searchStudent);
    
    document.getElementById('close-edit-modal').addEventListener('click', closeEditModal);
    document.getElementById('save-edit-changes').addEventListener('click', saveEditChanges);
    
    document.getElementById('close-attendance-modal').addEventListener('click', closeAttendanceModal);
    document.getElementById('save-attendance').addEventListener('click', saveAttendanceChanges);
    
    window.addEventListener('click', function(event) {
        const editModal = document.getElementById('edit-modal');
        const attendanceModal = document.getElementById('attendance-modal');
        if (event.target === editModal) {
            closeEditModal();
        }
        if (event.target === attendanceModal) {
            closeAttendanceModal();
        }
    });
});



// Variable para almacenar la fila actual que se está editando
let currentRow;

// Función para abrir el modal de edición
function openEditModal(element) {
    currentRow = element.closest('tr');
    const name = currentRow.cells[0].innerText;
    const email = currentRow.cells[1].innerText;
    const grade = currentRow.cells[2].innerText;

    document.getElementById('edit-name').value = name;
    document.getElementById('edit-email').value = email;
    document.getElementById('edit-grade').value = grade;

    document.getElementById('edit-modal').style.display = 'block';
}

// Función para cerrar el modal de edición
function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

// Función para guardar los cambios del modal de edición
function saveEditChanges() {
    const newName = document.getElementById('edit-name').value;
    const newEmail = document.getElementById('edit-email').value;
    const newGrade = document.getElementById('edit-grade').value;

    currentRow.cells[0].innerText = newName;
    currentRow.cells[1].innerText = newEmail;
    currentRow.cells[2].innerText = newGrade;

    closeEditModal();
}

// Función para mostrar una pestaña específica
function showTab(tabId) {
    const tabs = document.getElementsByClassName('content');
    Array.from(tabs).forEach(tab => tab.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';

    const tabButtons = document.getElementsByClassName('tabs')[0].children;
    Array.from(tabButtons).forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');

    filterContent(tabId);
}

// Función para filtrar el contenido basado en la pestaña seleccionada
function filterContent(tabId) {
    const tables = document.getElementsByClassName("content");
    Array.from(tables).forEach(table => {
        const rows = table.getElementsByTagName("tr");
        Array.from(rows).slice(1).forEach(row => {
            const statusCell = row.getElementsByTagName("td")[3];
            if (statusCell) {
                const statusIcon = statusCell.getElementsByTagName("i")[0];
                const statusColor = window.getComputedStyle(statusIcon).color;
                switch (tabId) {
                    case 'exemplary-attendance':
                        row.style.display = statusColor === "rgb(0, 174, 239)" ? "" : "none";
                        break;
                    case 'attended':
                        row.style.display = statusColor === "rgb(255, 165, 0)" ? "" : "none";
                        break;
                    case 'not-attended':
                        row.style.display = statusColor === "rgb(255, 0, 0)" ? "" : "none";
                        break;
                }
            }
        });
    });
}

// Función para mover una fila a otra tabla
function moveToCatalog(element) {
    const currentRow = element.closest('tr');
    const targetTableId = prompt("Seleccione el catálogo de destino:\n1. Asistencia ejemplar\n2. Asistidos\n3. No asistido");

    if (targetTableId) {
        let targetTable, newStatus;
        switch (targetTableId) {
            case '1':
                targetTable = document.getElementById('exemplary-attendance').getElementsByTagName('tbody')[0];
                newStatus = '<i class="fas fa-check-circle" style="color: #00AEEF;"></i>';
                break;
            case '2':
                targetTable = document.getElementById('attended').getElementsByTagName('tbody')[0];
                newStatus = '<i class="fas fa-exclamation-circle" style="color: #FFA500;"></i>';
                break;
            case '3':
                targetTable = document.getElementById('not-attended').getElementsByTagName('tbody')[0];
                newStatus = '<i class="fas fa-exclamation-triangle" style="color: #FF0000;"></i>';
                break;
            default:
                alert("ID de catálogo no válido.");
                return;
        }

        currentRow.cells[3].innerHTML = newStatus;
        targetTable.appendChild(currentRow);

        const activeTab = document.querySelector('.tabs .active').getAttribute('data-tab');
        showTab(activeTab);
    } else {
        alert("Operación cancelada.");
    }
}

// Función para buscar usuarios
function searchUser() {
    const input = document.getElementById("search-input");
    const filter = input.value.toUpperCase();
    const activeTab = document.querySelector('.tabs .active').getAttribute('data-tab');
    const activeTable = document.getElementById(activeTab);

    const rows = activeTable.getElementsByTagName("tr");
    Array.from(rows).slice(1).forEach(row => {
        const nameCell = row.getElementsByTagName("td")[0];
        if (nameCell) {
            const txtValue = nameCell.textContent || nameCell.innerText;
            row.style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
        }
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    setInterval(updateDateTime, 60000);

    document.getElementById('close-edit-modal').addEventListener('click', closeEditModal);
    document.getElementById('save-edit-changes').addEventListener('click', saveEditChanges);
    
    window.addEventListener('click', function(event) {
        if (event.target == document.getElementById('edit-modal')) {
            closeEditModal();
        }
    });

    document.getElementById('search-input').addEventListener('keyup', searchUser);

    const tabButtons = document.getElementsByClassName('tabs')[0].children;
    Array.from(tabButtons).forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            showTab(tabId);
        });
    });

    showTab('exemplary-attendance');
});








var dom = document.getElementById('chart-container');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};

var option;

option = {
  series: [
    {
      type: 'gauge',
      progress: {
        show: true,
        width: 18
      },
      axisLine: {
        lineStyle: {
          width: 18
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        length: 15,
        lineStyle: {
          width: 2,
          color: '#999'
        }
      },
      axisLabel: {
        distance: 25,
        color: '#999',
        fontSize: 20
      },
      anchor: {
        show: true,
        showAbove: true,
        size: 25,
        itemStyle: {
          borderWidth: 10
        }
      },
      title: {
        show: false
      },
      detail: {
        valueAnimation: true,
        fontSize: 80,
        offsetCenter: [0, '70%']
      },
      data: [
        {
          value: 70
        }
      ]
    }
  ]
};



if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);