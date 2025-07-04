// Konfigurasi password - ubah sesuai kebutuhan
const CORRECT_PASSWORD = "smansa123";

// Elemen DOM
const loginContainer = document.getElementById("loginContainer");
const protectedContent = document.getElementById("protectedContent");
const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const togglePassword = document.getElementById("togglePassword");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");

// Cek apakah user sudah login sebelumnya
let isLoggedIn = false;

// Toggle show/hide password
togglePassword.addEventListener("click", function () {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});

// Handle form submission
passwordForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const enteredPassword = passwordInput.value;

  // Reset pesan sebelumnya
  hideMessages();

  // Validasi password
  if (enteredPassword === CORRECT_PASSWORD) {
    showSuccessMessage("Password benar! Mengalihkan...");

    // Delay untuk efek visual
    setTimeout(() => {
      loginContainer.style.display = "none";
      protectedContent.style.display = "block";
      isLoggedIn = true;
    }, 1000);
  } else {
    showErrorMessage("Password salah! Silakan coba lagi.");
    passwordInput.value = "";
    passwordInput.focus();

    // Efek shake pada container
    loginContainer.style.animation = "shake 0.5s";
    setTimeout(() => {
      loginContainer.style.animation = "";
    }, 500);
  }
});

// Fungsi untuk menampilkan pesan error
function showErrorMessage(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add("show");
}

// Fungsi untuk menampilkan pesan sukses
function showSuccessMessage(message) {
  successMessage.textContent = message;
  successMessage.classList.add("show");
}

// Fungsi untuk menyembunyikan semua pesan
function hideMessages() {
  errorMessage.classList.remove("show");
  successMessage.classList.remove("show");
}

// Fungsi logout
function logout() {
  loginContainer.style.display = "block";
  protectedContent.style.display = "none";
  passwordInput.value = "";
  isLoggedIn = false;
  hideMessages();
}

// Animasi shake untuk error
const shakeKeyframes = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `;

// Tambahkan keyframes ke stylesheet
const styleSheet = document.createElement("style");
styleSheet.textContent = shakeKeyframes;
document.head.appendChild(styleSheet);

// Auto focus pada input password saat halaman dimuat
window.addEventListener("load", function () {
  passwordInput.focus();
});

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  // ESC untuk logout jika sudah login
  if (e.key === "Escape" && isLoggedIn) {
    logout();
  }

  // Enter untuk submit form
  if (e.key === "Enter" && !isLoggedIn) {
    passwordForm.dispatchEvent(new Event("submit"));
  }
});
