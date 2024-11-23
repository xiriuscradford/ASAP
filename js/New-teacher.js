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

    switch(field.id) {
        case "Name":
            if (field.value.trim() === "") {
                isValid = false;
                errorMessage = "El nombre es obligatorio";
            }
            break;
        case "gmail":
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = "Ingrese un correo electrónico válido";
            }
            break;
        case "genero":
            if (field.value === "") {
                isValid = false;
                errorMessage = "Seleccione una materia impartida";
            }
            break;
        case "userId":
            if (field.value.trim() === "") {
                isValid = false;
                errorMessage = "El ID del Maestro es obligatorio";
            }
            break;
        case "password":
            if (field.value.length < 8) {
                isValid = false;
                errorMessage = "La contraseña debe tener al menos 8 caracteres";
            }
            break;
        case "passwordConfirm":
            var password = document.getElementById("password");
            if (field.value !== password.value) {
                isValid = false;
                errorMessage = "Las contraseñas no coinciden";
            }
            break;
        case "password1":
            if (!/^\d{4}$/.test(field.value)) {
                isValid = false;
                errorMessage = "El PIN debe ser un número de 4 dígitos";
            }
            break;
    }

    if (!isValid) {
        markError(field, field.id + "Error", errorMessage);
    } else {
        clearError(field);
    }

    return isValid;
}

function validateForm(event) {
    event.preventDefault();

    var fields = [
        document.getElementById("Name"),
        document.getElementById("gmail"),
        document.getElementById("genero"),
        document.getElementById("userId"),
        document.getElementById("password"),
        document.getElementById("passwordConfirm"),
        document.getElementById("password1")
    ];

    var isValid = true;

    fields.forEach(function(field) {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    if (isValid) {
        alert("Maestro registrado con éxito.");
        // Aquí puedes agregar el código para enviar el formulario
    }
}

function markError(inputField, errorId, errorMessage) {
    inputField.classList.add("input-error");
    var errorElement = document.getElementById(errorId);
    errorElement.textContent = errorMessage;
    errorElement.style.display = "flex";
}

function clearError(inputField) {
    inputField.classList.remove("input-error");
    var errorElement = document.getElementById(inputField.id + "Error");
    if (errorElement) {
        errorElement.style.display = "none";
        errorElement.textContent = "";
    }
}

document.getElementById("loginForm").addEventListener("submit", validateForm);

var fields = document.querySelectorAll(".form-container1 input, .form-container1 select");
fields.forEach(function(field) {
    field.addEventListener("input", function() {
        validateField(this);
    });
    field.addEventListener("change", function() {
        validateField(this);
    });
});