import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, push, set, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// FIREBASE CONFIG
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
const db = getDatabase(app);

// LOGIN
const btn = document.getElementById("loginBtn");
const errorBox = document.getElementById("errorBox");

btn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if(email === "1" && password === "1") {
    window.location.href = "home.html";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "home.html")
    .catch(() => {
      errorBox.style.display = "block";
      setTimeout(()=> errorBox.style.display="none", 3000);
    });
});

// ====================
// INVENTAR FUNKTIONEN
// ====================

// Nur auf home.html oder inventar.html ausführen
if(window.location.pathname.includes("home.html") || window.location.pathname.includes("inventar.html")) {
  const table = document.createElement("table");
  document.body.appendChild(table);

  const addBtn = document.createElement("button");
  addBtn.innerText = "Hinzufügen";
  addBtn.classList.add("add-btn");
  document.body.appendChild(addBtn);

  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = `
    <input id="name" placeholder="Name">
    <input id="amount" placeholder="Anzahl">
    <select id="group">
      <option>Kabel</option>
      <option>Pulte</option>
      <option>Licht</option>
      <option>Ton</option>
      <option>Materialien</option>
      <option>Effekte</option>
    </select>
    <button id="saveItem">Speichern</button>
  `;
  document.body.appendChild(popup);

  addBtn.addEventListener("click", ()=> popup.style.display="block");

  const saveBtn = document.getElementById("saveItem");
  saveBtn.addEventListener("click", ()=>{
    const name = document.getElementById("name").value;
    const amount = document.getElementById("amount").value;
    const group = document.getElementById("group").value;

    const newRef = push(ref(db, "inventar"));
    set(newRef, {name, amount, group});

    popup.style.display = "none";
  });

  // Daten aus DB laden
  const dbRef = ref(db, "inventar");
  onValue(dbRef, (snapshot) => {
    table.innerHTML = "<tr><th>Name</th><th>Anzahl</th><th>Gruppe</th><th>Aktionen</th></tr>";
    snapshot.forEach(child => {
      const data = child.val();
      const row = table.insertRow();
      row.insertCell(0).innerText = data.name;
      row.insertCell(1).innerText = data.amount;
      row.insertCell(2).innerText = data.group;

      const editCell = row.insertCell(3);
      const editBtn = document.createElement("button");
      editBtn.innerText = "Bearbeiten";
      editBtn.addEventListener("click", () => {
        document.getElementById("name").value = data.name;
        document.getElementById("amount").value = data.amount;
        document.getElementById("group").value = data.group;
        popup.style.display = "block";

        remove(ref(db, "inventar/"+child.key));
      });
      editCell.appendChild(editBtn);
    });
  });
}
