// VALIDACIJA KONTAKT FORME
// Provera unosa se vrši u JavaScript-u
// Koriste se događaji: focus, blur i submit
// Forma ne šalje podatke na server (front-end demonstracija)

// =========================================================
// contact.js - validacija forme (kontakt.html)
// - Fokus poruke pored polja
// - Regex provera za ime i email
// - Ako je sve OK -> prebacuje na uspesno.html
// =========================================================

function isEN(){ return (document.documentElement.lang || 'sr') === 'en'; }
function L(sr,en){ return isEN() ? en : sr; }


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  const nameHelp = document.getElementById("nameHelp");
  const emailHelp = document.getElementById("emailHelp");
  const msgHelp = document.getElementById("msgHelp");

  const nameErr = document.getElementById("nameErr");
  const emailErr = document.getElementById("emailErr");
  const msgErr = document.getElementById("msgErr");

  // Fokus poruke (zahtev)
  fullName.addEventListener("focus", () => nameHelp.textContent = L("Unesite ime i prezime (najmanje 2 reči).", "Enter first and last name (at least 2 words)."));
  fullName.addEventListener("blur",  () => nameHelp.textContent = "");

  email.addEventListener("blur",  () => emailHelp.textContent = "");

  message.addEventListener("focus", () => msgHelp.textContent = L("Poruka treba da ima bar 10 karaktera.", "Message should be at least 10 characters."));
  message.addEventListener("blur",  () => msgHelp.textContent = "");

  function setErr(el, text){ el.textContent = text; }
  function clearErr(el){ el.textContent = ""; }

  function validate(){
    let ok = true;

    // Ime i prezime: dve reči (slova + razmak), bez brojeva
    const nameOk = /^[A-Za-zČĆŠĐŽčćšđž]{2,}(\s+[A-Za-zČĆŠĐŽčćšđž]{2,})+$/.test(fullName.value.trim());
    if (!nameOk){ setErr(nameErr, "Neispravno uneto ime i prezime."); ok = false; }
    else clearErr(nameErr);

    // Email (osnovni regex)
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());
    if (!emailOk){ setErr(emailErr, "Neispravno uneta e-mail adresa."); ok = false; }
    else clearErr(emailErr);

    // Poruka min 10
    const msgOk = message.value.trim().length >= 10;
    if (!msgOk){ setErr(msgErr, L("Poruka je prekratka.", "Message is too short.")); ok = false; }
    else clearErr(msgErr);

    return ok;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validate()){
      window.location.href = "uspesno.html";
    }
  });
});
