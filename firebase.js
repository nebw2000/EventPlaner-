// =====================
// Firebase Initialisierung
// =====================
const firebaseConfig = {
  apiKey: "AIzaSyA77Epd0AXYz41c47nXuJHP2EKqWbuneb4",
  authDomain: "gyraevent.firebaseapp.com",
  databaseURL: "https://gyraevent-default-rtdb.firebaseio.com",
  projectId: "gyraevent",
  storageBucket: "gyraevent.firebasestorage.app",
  messagingSenderId: "1055376556998",
  appId: "1:1055376556998:web:cf91c05b247fcd8450a8c7"
};

// Firebase App initialisieren
firebase.initializeApp(firebaseConfig);

// Realtime Database Referenz
const db = firebase.database();

// =====================
// Globale Variablen
// =====================
let editId = null;

// =====================
// Login
// =====================
function login() {
  const pass = document.getElementById("password").value;
  if (pass === "GyraTechnik") {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    loadTheme();
    loadInventar();
    loadInfos();
  } else {
    alert("Falsches Passwort!");
  }
}

// =====================
// Seiten wechseln
// =====================
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// =====================
// Dark Mode
// =====================
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", document.body.classList.contains("dark"));
}

function loadTheme() {
  if (localStorage.getItem("dark") === "true") {
    document.body.classList.add("dark");
  }
}

// =====================
// Formular öffnen/schließen
// =====================
function openForm() {
  document.getElementById("form").classList.remove("hidden");
}

function closeForm() {
  document.getElementById("form").classList.add("hidden");
  editId = null;
}

// =====================
// Inventar speichern
// =====================
function saveItem() {
  const nameVal = document.getElementById("name").value.trim();
  const anzahlVal = document.getElementById("anzahl").value;
  const gruppeVal = document.getElementById("gruppe").value;
  const statusVal = document.getElementById("status").value;

  if (!nameVal) return alert("Name darf nicht leer sein!");

  const data = {
    name: nameVal,
    anzahl: anzahlVal,
    gruppe: gruppeVal,
    status: statusVal
  };

  if (editId) {
    db.ref("inventar/" + editId).set(data);
  } else {
    db.ref("inventar").push(data);
  }

  closeForm();
}

// =====================
// Inventar löschen
// =====================
function deleteItem(id) {
  if (confirm("Eintrag wirklich löschen?")) {
    db.ref("inventar/" + id).remove();
  }
}

// =====================
// Inventar laden
// =====================
function loadInventar() {
  const filter = document.getElementById("filterGroup").value;
  const query = document.getElementById("search").value.toLowerCase();

  db.ref("inventar").on("value", snapshot => {
    const tbody = document.getElementById("inventarListe");
    tbody.innerHTML = "";

    snapshot.forEach(child => {
      const data = child.val();

      if (filter !== "alle" && data.gruppe !== filter) return;
      if (!data.name.toLowerCase().includes(query)) return;

      const tr = document.createElement("tr");
      tr.className = "status-" + data.status;

      tr.innerHTML = `
        <td>${data.name}</td>
        <td>${data.anzahl}</td>
        <td>${data.gruppe}</td>
        <td>${data.status}</td>
        <td><button class="delete" onclick="deleteItem('${child.key}')">Löschen</button></td>
      `;

      tr.onclick = () => editItem(child.key, data);
      tbody.appendChild(tr);
    });

    loadWichtig();
  });
}

// =====================
// Inventar bearbeiten
// =====================
function editItem(id, data) {
  editId = id;
  openForm();
  document.getElementById("name").value = data.name;
  document.getElementById("anzahl").value = data.anzahl;
  document.getElementById("gruppe").value = data.gruppe;
  document.getElementById("status").value = data.status;
}

// =====================
// Wichtig-Liste
// =====================
function loadWichtig() {
  const ul = document.getElementById("wichtigListe");
  ul.innerHTML = "";

  db.ref("inventar").once("value").then(snapshot => {
    snapshot.forEach(child => {
      const data = child.val();
      if (data.status !== "Ok") {
        const li = document.createElement("li");
        li.textContent = `${data.name} (${data.status})`;
        ul.appendChild(li);
      }
    });
  });
}

// =====================
// Aktuell speichern
// =====================
function addInfo() {
  const text = document.getElementById("infoText").value.trim();
  if (!text) return;
  db.ref("infos").push({ text });
  document.getElementById("infoText").value = "";
}

// =====================
// Aktuell laden
// =====================
function loadInfos() {
  const ul = document.getElementById("infoListe");
  db.ref("infos").on("value", snapshot => {
    ul.innerHTML = "";
    snapshot.forEach(child => {
      const li = document.createElement("li");
      li.textContent = child.val().text;
      ul.appendChild(li);
    });
  });
}
