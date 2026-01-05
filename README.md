# Gyra Event Manager 🚀

Eine einfache, funktionsfähige Event- und Inventar-Management-Webseite für **Gyra Technik**.  
Die Seite läuft komplett im Browser, speichert Daten in **Firebase Realtime Database** und unterstützt **Dark & Light Mode**.

---

## 🔑 Passwortgeschützt

- Die Seite ist geschützt und kann nur über ein Passwort aufgerufen werden.  
- Ohne Passwort kann die Seite nicht genutzt werden.

---

## 🏠 Seitenübersicht

Die Webseite hat vier Hauptbereiche:

1. **Home**  
   - Zeigt den Titel **Gyra Technik** in der Mitte.  

2. **Inventar**  
   - Verwaltung von Geräten, Zubehör, Nebel, Kabel und Verbrauchsgegenständen.  
   - Funktionen:  
     - Einträge hinzufügen, bearbeiten, löschen  
     - Status auswählen: **Ok**, **Defekt** (rot) oder **Leer** (hellblau)  
     - Filter nach Gruppe über Drop-down Menü  
   - Alle Einträge werden in einer Tabelle angezeigt.

3. **Aktuell**  
   - Kurze Textinfos eintragen (z. B. Notizen oder aktuelle Aufgaben)  
   - Einträge bearbeiten oder löschen  
   - Listenansicht mit Überschrift  

4. **Wichtig**  
   - Zeigt automatisch alle Inventar-Einträge mit Status **Defekt** oder **Leer**  

---

## 🌗 Dark / Light Mode

- Über den Button oben rechts kannst du jederzeit zwischen **Dark Mode** und **Light Mode** wechseln.  

---

## ⚡ Firebase Integration

- Die Daten werden in **Firebase Realtime Database** gespeichert.  
- Struktur der Datenbank:
```json
inventar: {}
aktuell: {}
