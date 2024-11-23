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


// formulario validacion

function validateField(field) {
    var isValid = true;
    var errorMessage = "";

    var name = document.getElementById("Name");
    var gmail = document.getElementById("gmail");
    var number = document.getElementById("Number");
    var userId = document.getElementById("userId");
    var password = document.getElementById("password");
    var passwordConfirm = document.getElementById("passwordConfirm");
    var pin = document.getElementById("password1");

    if (field === name && name.value.trim() === "") {
        isValid = false;
        errorMessage = "El nombre es obligatorio";
    }
    
    else if (field === gmail) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(gmail.value)) {
            isValid = false;
            errorMessage = "Ingrese un correo electrónico válido";
        }
    }
    else if (field === number && !/^\d{8,}$/.test(number.value)) {
        isValid = false;
        errorMessage = "Ingrese un número de teléfono válido (mínimo 8 dígitos)";
    }
    else if (field === userId && userId.value.trim() === "") {
        isValid = false;
        errorMessage = "El ID de usuario es obligatorio";
    }
    else if (field === password && password.value.length < 8) {
        isValid = false;
        errorMessage = "La contraseña debe tener al menos 8 caracteres";
    }
    else if (field === passwordConfirm && passwordConfirm.value !== password.value) {
        isValid = false;
        errorMessage = "Las contraseñas no coinciden";
    }
    else if (field === pin && !/^\d{4}$/.test(pin.value)) {
        isValid = false;
        errorMessage = "El PIN debe ser un número de 4 dígitos";
    }

    if (!isValid) {
        markError(field, field.id + "Error", errorMessage);
    } else {
        clearError(field);
    }

    return isValid;
}

function validateFormSingUP(event) {
    event.preventDefault();

    var fields = [
        document.getElementById("Name"),
        document.getElementById("gmail"),
        document.getElementById("Number"),
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
        alert("Te has registrado con éxito.");
        setTimeout(function() {
            document.getElementById("loginForm").submit();
        }, 1000); 
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
    }
}

document.getElementById("loginForm").addEventListener("submit", validateFormSingUP);

var fields = document.querySelectorAll(".form-container1 input");
fields.forEach(function(field) {
    field.addEventListener("input", function() {
        validateField(this);
    });
});
