// Login form validation

function validateField(field) {
    var isValid = true;
    var errorMessage = "";

    var userId = document.getElementById("userId");
    var password = document.getElementById("password");

    if (field === userId && userId.value.trim() === "") {
        isValid = false;
        errorMessage = "El ID de usuario es obligatorio";
    }
    else if (field === password && password.value.trim() === "") {
        isValid = false;
        errorMessage = "La contraseña es obligatoria";
    }

    if (!isValid) {
        markError(field, field.id + "Error", errorMessage);
    } else {
        clearError(field);
    }

    return isValid;
}

function validateFormLogin(event) {
    event.preventDefault();

    var fields = [
        document.getElementById("userId"),
        document.getElementById("password")
    ];

    var isValid = true;

    fields.forEach(function(field) {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    if (isValid) {
        alert("Iniciando sesión...");
        setTimeout(function() {
            document.getElementById("loginForm").submit();
        }, 2000);
    }
}

function markError(inputField, errorId, errorMessage) {
    inputField.classList.add("input-error");
    var errorElement = document.getElementById(errorId);
    if (!errorElement) {
        errorElement = document.createElement("span");
        errorElement.id = errorId;
        errorElement.className = "error-message";
        inputField.parentNode.insertBefore(errorElement, inputField.nextSibling);
    }
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

document.getElementById("loginForm").addEventListener("submit", validateFormLogin);

var fields = document.querySelectorAll("#loginForm input");
fields.forEach(function(field) {
    field.addEventListener("input", function() {
        validateField(this);
    });
});