(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });


    // Progress Bar
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Calender
    $('#calender').datetimepicker({
        inline: true,
        format: 'L'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav : false
    });


    // Chart Global Color
    Chart.defaults.color = "#6C7293";
    Chart.defaults.borderColor = "#000000";


    // Worldwide Sales Chart
    var ctx1 = $("#worldwide-sales").get(0).getContext("2d");
    var myChart1 = new Chart(ctx1, {
        type: "bar",
        data: {
            labels: ["Semana1", "Semana2", "Semana3", "Semana4", "Semana5", "Semana6", "Semana7"],
            datasets: [{
                    label: "Masculino",
                    data: [15, 30, 55, 65, 60, 80, 95],
                    backgroundColor: "rgba(0, 168, 232, 1)"
                },
                {
                    label: "Femenino",
                    data: [8, 35, 40, 60, 70, 55, 75],
                    backgroundColor: "rgba(0, 168, 232, 0.8)"
                },
                {
                    label: "Total",
                    data: [12, 25, 45, 55, 65, 70, 60],
                    backgroundColor: "rgba(0, 168, 232, 0.4)"
                }
            ]
            },
        options: {
            responsive: true
        }
    });


    // Salse & Revenue Chart
    var ctx2 = $("#salse-revenue").get(0).getContext("2d");
var myChart2 = new Chart(ctx2, {
    type: "line",
    data: {
        labels: ["Semana1", "Semana2", "Semana3", "Semana4", "Semana5", "Semana6", "Semana7"],
        datasets: [{
                label: "Excusas",
                data: [15, 30, 55, 45, 70, 65, 85],
                backgroundColor: "rgba(0, 168, 232, 1)",
                fill: true,
                borderWidth: 0
            },
            {
                label: "Faltas",
                data: [99, 135, 170, 130, 190, 180, 270],
                backgroundColor: "rgba(0, 168, 232, 0.5)",
                fill: true,
                borderWidth: 0
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false // Quitar las líneas de la cuadrícula del eje X
                }
            },
            y: {
                grid: {
                    display: false // Quitar las líneas de la cuadrícula del eje Y
                }
            }
        },
        plugins: {
            legend: {
                display: true // Mostrar la leyenda para ambos datasets
            }
        }
    }
});

    


    // Single Line Chart
    var ctx3 = $("#line-chart").get(0).getContext("2d");
    var myChart3 = new Chart(ctx3, {
        type: "line",
        data: {
            labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
            datasets: [{
                label: "Salse",
                fill: false,
                backgroundColor: "rgba(235, 22, 22, .7)",
                data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Single Bar Chart
    var ctx4 = $("#bar-chart").get(0).getContext("2d");
    var myChart4 = new Chart(ctx4, {
        type: "bar",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Pie Chart
    var ctx5 = $("#pie-chart").get(0).getContext("2d");
    var myChart5 = new Chart(ctx5, {
        type: "pie",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Doughnut Chart
    var ctx6 = $("#doughnut-chart").get(0).getContext("2d");
    var myChart6 = new Chart(ctx6, {
        type: "doughnut",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });

    
})(jQuery);















                    
document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const recordatorioForm = document.getElementById('recordatorio-form');
    const recordatorioBtn = document.getElementById('recordatorio-btn');
    const recordatorioLista = document.getElementById('recordatorio-lista');

    // Función para crear un nuevo recordatorio
    function crearRecordatorio(texto) {
        // Crear el contenedor principal
        const div = document.createElement('div');
        div.className = 'd-flex align-items-center border-bottom py-2';
        
        // Crear el checkbox
        const checkbox = document.createElement('input');
        checkbox.className = 'form-check-input m-0';
        checkbox.type = 'checkbox';
        
        // Crear el contenedor interno
        const innerDiv = document.createElement('div');
        innerDiv.className = 'w-100 ms-3';
        
        // Crear el contenedor para el texto y el botón
        const contentDiv = document.createElement('div');
        contentDiv.className = 'd-flex w-100 align-items-center justify-content-between';
        
        // Crear el span para el texto
        const span = document.createElement('span');
        span.textContent = texto;
        
        // Crear el botón de eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm';
        deleteBtn.innerHTML = '<i class="fa fa-times"></i>';
        
        // Agregar evento para eliminar el recordatorio
        deleteBtn.addEventListener('click', function() {
            div.remove();
        });
        
        // Ensamblar todos los elementos
        contentDiv.appendChild(span);
        contentDiv.appendChild(deleteBtn);
        innerDiv.appendChild(contentDiv);
        div.appendChild(checkbox);
        div.appendChild(innerDiv);
        
        // Insertar el nuevo recordatorio después del formulario
        const formulario = recordatorioLista.querySelector('.d-flex.mb-2');
        formulario.insertAdjacentElement('afterend', div);
    }

    // Evento para agregar recordatorio al hacer clic en el botón
    recordatorioBtn.addEventListener('click', function() {
        const texto = recordatorioForm.value.trim();
        if (texto !== '') {
            crearRecordatorio(texto);
            recordatorioForm.value = ''; // Limpiar el input
        }
    });

    // Evento para agregar recordatorio al presionar Enter
    recordatorioForm.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const texto = recordatorioForm.value.trim();
            if (texto !== '') {
                crearRecordatorio(texto);
                recordatorioForm.value = ''; // Limpiar el input
            }
        }
    });

    // Agregar funcionalidad de eliminación a los recordatorios existentes
    document.querySelectorAll('#recordatorio-lista .fa-times').forEach(icon => {
        icon.closest('button').addEventListener('click', function() {
            this.closest('.d-flex.align-items-center').remove();
        });
    });
});
               


    
























