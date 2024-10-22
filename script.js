document.getElementById("reviewForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let hasErrors = false;

    // Obtener valores del formulario
    const username = document.getElementById("username").value.trim();
    const movie = document.getElementById("movie").value.trim();
    const rating = document.getElementById("rating").value.trim();
    const email = document.getElementById("email").value.trim();

    // Limpiar mensajes de error
    clearErrors();

    // Validar nombre de usuario
    if (username === "" || username.length > 10) {
        setError("username", "*Campo inválido. Máximo 10 caracteres.");
        hasErrors = true;
    }

    // Validar nombre de la película
    if (movie === "" || movie.length > 200) {
        setError("movie", "*Campo inválido. Máximo 200 caracteres.");
        hasErrors = true;
    }

    // Validar puntuación
    if (rating === "" || isNaN(rating) || rating < 1 || rating > 10) {
        setError("rating", "*Campo inválido. Debe ser un número entre 1 y 10.");
        hasErrors = true;
    }

    // Validar email si está ingresado
    if (email !== "" && !validateEmail(email)) {
        setError("email", "*Correo electrónico inválido.");
        hasErrors = true;
    }

    if (!hasErrors) {
        // Agregar la reseña
        addReview(username, movie, rating, email);
        // Limpiar el formulario
        document.getElementById("reviewForm").reset();
        // Colocar foco en el primer input
        document.getElementById("username").focus();
    }
});

function setError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    errorElement.textContent = message; // Mensaje de error en color rojo
    document.getElementById(fieldId).classList.add("error");
}

function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(error => error.textContent = "");

    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => input.classList.remove("error"));
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function addReview(username, movie, rating, email) {
    const reviewsList = document.getElementById("reviewsList");
    const li = document.createElement("li");

    if (email) {
        li.textContent = `${username} dice que ${movie} tiene una puntuación de ${rating}. Contacto: ${email}`;
    } else {
        li.textContent = `${username} dice que ${movie} tiene una puntuación de ${rating}.`;
    }

    reviewsList.appendChild(li);
}


