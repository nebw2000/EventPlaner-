import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA77Epd0AXYz41c47nXuJHP2EKqWbuneb4",
  authDomain: "gyraevent.firebaseapp.com",
  databaseURL: "https://gyraevent-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gyraevent",
  storageBucket: "gyraevent.firebasestorage.app",
  messagingSenderId: "1055376556998",
  appId: "1:1055376556998:web:cf91c05b247fcd8450a8c7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const btn = document.getElementById("loginBtn");
const errorBox = document.getElementById("errorBox");

btn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // FESTER ADMIN LOGIN
  if (email === "1" && password === "1") {
    window.location.href = "home.html";
    return;
  }

  // FIREBASE LOGIN
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "home.html";
    })
    .catch(() => {
      errorBox.style.display = "block";
      setTimeout(() => {
        errorBox.style.display = "none";
      }, 3000);
    });
});
