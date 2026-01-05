// app.js

const firebaseConfig = {
  apiKey: "AIzaSyA77Epd0AXYz41c47nXuJHP2EKqWbuneb4",
  authDomain: "gyraevent.firebaseapp.com",
  databaseURL: "https://gyraevent-default-rtdb.firebaseio.com",
  projectId: "gyraevent",
  storageBucket: "gyraevent.firebasestorage.app",
  messagingSenderId: "1055376556998",
  appId: "1:1055376556998:web:cf91c05b247fcd8450a8c7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
let inventarData = {};

// Passwortschutz
function checkPassword() {
  const pw = document.getElementById('password-input').value;
  if(pw === 'GyraTechnik') {
    document.getElementById('login-container').style.display='none';
    document.getElementById('app').style.display='block';
    loadInventar();
    loadAktuell();
    loadWichtig();
  } else {
    alert('Falsches Passwort');
  }
}

// Dark/Light Mode
function toggleTheme() {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
}

// Seiten wechseln
function showPage(page) {
  document.querySelectorAll('.page').forEach(p=>p.style.display='none');
  document.getElementById(page).style.display='block';
}

// Inventar hinzufügen
function showAddInventarForm() { document.getElementById('inventar-form').style.display='block'; }
function addInventar() {
  const name = document.getElementById('inv-name').value;
  const anzahl = Number(document.getElementById('inv-anzahl').value);
  const gruppe = document.getElementById('inv-gruppe').value;
  const status = document.getElementById('inv-status').value;
  db.ref('inventar').push().set({name, anzahl, gruppe, status, erstelltAm: Date.now()});
}

// Aktuell Einträge
function showAddAktuellForm() { document.getElementById('aktuell-form').style.display='block'; }
function addAktuell() {
  const text = document.getElementById('aktuell-text').value;
  db.ref('aktuell').push().set({text, erstelltAm: Date.now()});
}

// Inventar laden und rendern
function loadInventar() {
  db.ref('inventar').on('value', snapshot => {
    inventarData = snapshot.val() || {};
    renderInventar();
  });
}

function renderInventar() {
  const tbody = document.querySelector('#inventar-table tbody');
  tbody.innerHTML='';
  const filter = document.getElementById('filter-gruppe').value;
  for(let key in inventarData){
    const item = inventarData[key];
    if(filter==='Alle' || item.gruppe===filter){
      const tr = document.createElement('tr');
      tr.className = item.status;
      tr.innerHTML = `<td>${item.name}</td><td>${item.anzahl}</td><td>${item.gruppe}</td><td>${item.status}</td>
        <td><button class='action-btn' onclick='editInventar("${key}")'>Bearbeiten</button>
        <button class='action-btn' onclick='deleteInventar("${key}")'>Löschen</button></td>`;
      tbody.appendChild(tr);
    }
  }
}

function filterInventar() { renderInventar(); }

function editInventar(key){
  const item = inventarData[key];
  const name = prompt('Name', item.name);
  const anzahl = prompt('Anzahl', item.anzahl);
  const gruppe = prompt('Gruppe', item.gruppe);
  const status = prompt('Status', item.status);
  db.ref('inventar/'+key).set({name, anzahl, gruppe, status, erstelltAm:item.erstelltAm});
}

function deleteInventar(key){
  if(confirm('Eintrag wirklich löschen?')) db.ref('inventar/'+key).remove();
}

// Aktuell laden
function loadAktuell() {
  db.ref('aktuell').on('value', snapshot => {
    const data = snapshot.val() || {};
    const list = document.getElementById('aktuell-list');
    list.innerHTML='';
    for(let key in data){
      const li = document.createElement('li');
      li.textContent = data[key].text;
      const editBtn = document.createElement('button'); editBtn.textContent='Bearbeiten';
      editBtn.onclick=()=>{ const text = prompt('Text', data[key].text); db.ref('aktuell/'+key).update({text}); };
      const delBtn = document.createElement('button'); delBtn.textContent='Löschen';
      delBtn.onclick=()=>{ if(confirm('Eintrag löschen?')) db.ref('aktuell/'+key).remove(); };
      li.appendChild(editBtn); li.appendChild(delBtn);
      list.appendChild(li);
    }
  });
}

// Wichtig laden
function loadWichtig() {
  db.ref('inventar').on('value', snapshot => {
    const data = snapshot.val() || {};
    const tbody = document.querySelector('#wichtig-table tbody');
    tbody.innerHTML='';
    for(let key in data){
      const item = data[key];
      if(item.status==='Defekt' || item.status==='Leer'){
        const tr = document.createElement('tr');
        tr.className = item.status;
        tr.innerHTML = `<td>${item.name}</td><td>${item.anzahl}</td><td>${item.gruppe}</td><td>${item.status}</td>`;
        tbody.appendChild(tr);
      }
    }
  });
}
