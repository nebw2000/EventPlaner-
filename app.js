import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase Config
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
const db = getDatabase(app);

const cards = document.getElementById("cards");
const popup = document.getElementById("popup");
const newBtn = document.getElementById("newBtn");
const saveBtn = document.getElementById("saveBtn");

if(newBtn){
  newBtn.addEventListener("click", ()=> {
    popup.classList.remove("hidden");
  });
}

if(saveBtn){
  saveBtn.addEventListener("click", ()=> {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if(title === "" || content === "") return alert("Bitte Titel und Text eingeben");

    const postsRef = ref(db, "posts"); // Wichtig: Richtiger Pfad
    push(postsRef, { title, content })
      .then(()=> {
        popup.classList.add("hidden");
        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
      })
      .catch(err => alert("Fehler beim Speichern: " + err));
  });
}

// Daten aus Firebase anzeigen
if(cards){
  const postsRef = ref(db, "posts");
  onValue(postsRef, snapshot => {
    cards.innerHTML = "";
    snapshot.forEach(child => {
      const data = child.val();
      const div = document.createElement("div");
      div.className = "card";
      div.textContent = data.title;
      div.onclick = () => alert(data.content);
      cards.appendChild(div);
    });
  });
}
