let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-img');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
            dots[i].classList.add('active');
        }
    });
}

function setCurrentSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

function validateField(field) {
    var isValid = true;
    var errorMessage = "";

    var name = document.getElementById("Name");
    var gmail = document.getElementById("gmail");
    var number = document.getElementById("Number");
    var grado = document.getElementById("grado");
    var genero = document.getElementById("genero");
    var pin = document.getElementById("password2");  // PIN de seguridad

    // Validación de campo de nombre
    if (field === name && name.value.trim() === "") {
        isValid = false;
        errorMessage = "El nombre es obligatorio";
    }
    // Validación de campo de correo electrónico
    else if (field === gmail) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(gmail.value)) {
            isValid = false;
            errorMessage = "Ingrese un correo electrónico válido";
        }
    }
    // Validación del número de teléfono
    else if (field === number && !/^\d{8,}$/.test(number.value)) {
        isValid = false;
        errorMessage = "Ingrese un número de teléfono válido (mínimo 8 dígitos)";
    }
    // Validación de select de grado
    else if (field === grado && grado.value === "") {
        isValid = false;
        errorMessage = "Seleccione un grado y sección";
    }
    // Validación de select de género
    else if (field === genero && genero.value === "") {
        isValid = false;
        errorMessage = "Seleccione un género";
    }
    // Validación del PIN (4 dígitos)
    else if (field === pin && !/^\d{4}$/.test(pin.value)) {
        isValid = false;
        errorMessage = "El PIN debe ser un número de 4 dígitos";
    }

    // Si hay un error, marcarlo y mostrar el mensaje
    if (!isValid) {
        markError(field, field.id + "Error", errorMessage);
    } else {
        clearError(field);  // Limpia el error cuando es válido
    }

    return isValid;
}

function validateFormSingUP(event) {
    event.preventDefault();

    var fields = [
        document.getElementById("Name"),
        document.getElementById("gmail"),
        document.getElementById("Number"),
        document.getElementById("grado"),  // Validar select de grado
        document.getElementById("genero"),  // Validar select de género
        document.getElementById("password2")  // Validar el PIN
    ];

    var isValid = true;

    // Validar todos los campos
    fields.forEach(function(field) {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    if (isValid) {
        alert("Te has registrado con éxito.");
        setTimeout(function() {
            document.getElementById("loginForm").submit();
        }, 2000);  // Retraso de 2 segundos para enviar el formulario
    }
}

function markError(inputField, errorId, errorMessage) {
    inputField.classList.add("input-error");
    var errorElement = document.getElementById(errorId);
    errorElement.textContent = errorMessage;
    errorElement.classList.add("visible");
}

function clearError(inputField) {
    inputField.classList.remove("input-error");
    var errorElement = document.getElementById(inputField.id + "Error");
    if (errorElement) {
        errorElement.classList.remove("visible");
        errorElement.textContent = "";
    }else if (field === grado && grado.value === "") {
        isValid = false;
        errorMessage = "Seleccione un grado y sección";
    }
}

// Evento para validar el formulario
document.getElementById("loginForm").addEventListener("submit", validateFormSingUP);

// Validar cada campo en tiempo real
var fields = document.querySelectorAll(".form-container1 input, .form-container1 select");  // Incluye los select
fields.forEach(function(field) {
    field.addEventListener("input", function() {
        validateField(this);
    });
    field.addEventListener("change", function() {  // Para que los select también se validen al cambiar
        validateField(this);
    });
});

