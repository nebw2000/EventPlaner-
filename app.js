const firebaseConfig = {
  apiKey: "DEIN_API_KEY",
  authDomain: "gyraevent.firebaseapp.com",
  databaseURL: "https://gyraevent-default-rtdb.firebaseio.com",
  projectId: "gyraevent",
  storageBucket: "gyraevent.firebasestorage.app",
  messagingSenderId: "1055376556998",
  appId: "1:1055376556998:web:cf91c05b247fcd8450a8c7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let editId = null;

function login() {
  if (password.value === "GyraTechnik") {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    loadInventar();
    loadInfos();
    loadTheme();
  }
}

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", document.body.classList.contains("dark"));
}

function loadTheme() {
  if (localStorage.getItem("dark") === "true") {
    document.body.classList.add("dark");
  }
}

function openForm() {
  form.classList.remove("hidden");
}

function closeForm() {
  form.classList.add("hidden");
  editId = null;
}

function saveItem() {
  if (!name.value) return;

  const data = {
    name: name.value,
    anzahl: anzahl.value,
    gruppe: gruppe.value,
    status: status.value
  };

  if (editId) {
    db.ref("inventar/" + editId).set(data);
  } else {
    db.ref("inventar").push(data);
  }

  closeForm();
}

function deleteItem(id) {
  if (confirm("Eintrag löschen?")) {
    db.ref("inventar/" + id).remove();
  }
}

function loadInventar() {
  const filter = filterGroup.value;
  const query = search.value.toLowerCase();

  db.ref("inventar").on("value", snap => {
    inventarListe.innerHTML = "";

    snap.forEach(c => {
      const d = c.val();
      if (filter !== "alle" && d.gruppe !== filter) return;
      if (!d.name.toLowerCase().includes(query)) return;

      const tr = document.createElement("tr");
      tr.className = "status-" + d.status;

      tr.innerHTML = `
        <td>${d.name}</td>
        <td>${d.anzahl}</td>
        <td>${d.gruppe}</td>
        <td>${d.status}</td>
        <td>
          <button class="delete" onclick="deleteItem('${c.key}')">Löschen</button>
        </td>
      `;

      tr.onclick = () => editItem(c.key, d);
      inventarListe.appendChild(tr);
    });

    loadWichtig();
  });
}

function editItem(id, d) {
  editId = id;
  openForm();
  name.value = d.name;
  anzahl.value = d.anzahl;
  gruppe.value = d.gruppe;
  status.value = d.status;
}

function loadWichtig() {
  wichtigListe.innerHTML = "";

  db.ref("inventar").once("value", snap => {
    snap.forEach(c => {
      const d = c.val();
      if (d.status !== "Ok") {
        const li = document.createElement("li");
        li.textContent = d.name + " – " + d.status;
        wichtigListe.appendChild(li);
      }
    });
  });
}

function addInfo() {
  if (!infoText.value) return;
  db.ref("infos").push({ text: infoText.value });
  infoText.value = "";
}

function loadInfos() {
  db.ref("infos").on("value", snap => {
    infoListe.innerHTML = "";
    snap.forEach(c => {
      const li = document.createElement("li");
      li.textContent = c.val().text;
      infoListe.appendChild(li);
    });
  });
}
