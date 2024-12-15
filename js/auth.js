// Datos quemados para pruebas


//AQUI ES DONDE DEBO PONER LA LOGICA IMPLEMENTADA EN EL USER PARA CREAR USUARIOS, AQUI SE REFLEJAN LOS USUARIOS 
//GUARDADOS AHÍ
const registeredUsers = [
  { phone: "3001234567", password: "1234" },
  { phone: "3109876543", password: "5678" }
];

let currentUser = null;

document.addEventListener("DOMContentLoaded", () => {
  // Lógica para la vista de login.html
  if (window.location.pathname.includes("login.html")) {
    const loginButton = document.getElementById("login-btn");
    const phoneInput = document.getElementById("phone");
    const errorMessage = document.getElementById("error-message");

    loginButton.addEventListener("click", () => {
      const phoneValue = phoneInput.value.trim();

      if (!phoneValue) {
        errorMessage.textContent = "Por favor, ingrese un número de teléfono.";
        errorMessage.style.display = "block";
        return;
      }

      if (phoneValue.length !== 10 || isNaN(phoneValue)) {
        errorMessage.textContent = "Número de teléfono no válido. Debe contener 10 dígitos.";
        errorMessage.style.display = "block";
        return;
      }

      const user = registeredUsers.find(user => user.phone === phoneValue);
      if (!user) {
        errorMessage.textContent = "Número no registrado.";
        errorMessage.style.display = "block";
        return;
      }

      // Usuario encontrado, redirigir a password.html
      currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      window.location.href = "password.html";
    });
  }

  // Lógica para la vista de password.html
  if (window.location.pathname.includes("password.html")) {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    const passwordInputs = document.querySelectorAll(".pin");
    const numpadButtons = document.querySelectorAll(".numpad button");
    const errorMessage = document.getElementById("error-message");
    const acceptButton = document.getElementById("accept-btn");

    if (!savedUser) {
      window.location.href = "login.html";
      return;
    }

    let enteredPassword = "";

    numpadButtons.forEach(button => {
      button.addEventListener("click", () => {
        const value = button.textContent;

        if (!button.classList.contains("delete") && enteredPassword.length < 4) {
          enteredPassword += value;
          passwordInputs[enteredPassword.length - 1].value = "*";
        }

        if (button.classList.contains("delete") && enteredPassword.length > 0) {
          passwordInputs[enteredPassword.length - 1].value = "";
          enteredPassword = enteredPassword.slice(0, -1);
        }
      });
    });

    acceptButton.addEventListener("click", () => {
      if (enteredPassword === savedUser.password) {
        window.location.href = "home.html";
      } else {
        errorMessage.textContent = "Contraseña incorrecta";
        errorMessage.style.display = "block";
        enteredPassword = "";
        passwordInputs.forEach(input => {
          input.value = "";
        });
      }
    });
  }
});
