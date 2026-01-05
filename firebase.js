// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// DEINE Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyA77Epd0AXYz41c47nXuJHP2EKqWbuneb4",
  authDomain: "gyraevent.firebaseapp.com",
  projectId: "gyraevent",
  storageBucket: "gyraevent.firebasestorage.app",
  messagingSenderId: "1055376556998",
  appId: "1:1055376556998:web:cf91c05b247fcd8450a8c7"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);

// Firestore initialisieren
export const db = getFirestore(app);
