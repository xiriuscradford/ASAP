// Función para actualizar la fecha y hora
function updateDateTime() {
    const now = new Date();
    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    
    const formattedTime = now.toLocaleString('es-ES', timeOptions).toUpperCase();
    const formattedDate = now.toLocaleString('es-ES', dateOptions);
    
    const formattedDateTime = `${formattedTime}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;${formattedDate}`;
    document.getElementById('datetime').innerHTML = formattedDateTime;
}

// Función para alternar el menú lateral
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");
    const dashboard = document.querySelector(".dashboard");
    const icons1 = document.querySelectorAll(".sidebar-icon");
    const icons2 = document.querySelectorAll(".icon2");
    
    document.querySelector(".btn-menu").classList.toggle("expanded");
    document.querySelector(".profile").classList.toggle("expanded");
    sidebar.classList.toggle("expanded");
    mainContent.classList.toggle("shrink");
    dashboard.classList.toggle("shrink");
   
    const justifyContent = sidebar.classList.contains("expanded") ? "flex-start" : "center";
    icons1.forEach(icon => icon.style.justifyContent = justifyContent);
    icons2.forEach(icon => icon.style.justifyContent = justifyContent);
}

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