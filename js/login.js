// DEMONSTRACIJA PRIJAVE
// Podaci se čitaju iz JSON fajla (users.json)
// Lozinka se proverava pomoću SHA-256 hash funkcije
// Implementacija je front-end demonstracija (bez servera)

// =========================================================
// login.js - demonstracija logovanja (front-end)
// Podaci se čitaju iz data/users.json, lozinka se proverava kao SHA-256.
// Napomena: ovo je demonstracija bez servera, za projekat iz Veb dizajna.
// =========================================================

function isEN(){ return (document.documentElement.lang || 'sr') === 'en'; }
function L(sr,en){ return isEN() ? en : sr; }

async function sha256Hex(message){
  const enc = new TextEncoder().encode(message);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
}

async function loadUsers(){
  // Pokušaj 1: učitaj iz fajla (radi na hostingu / Live Server-u)
  try{
    const res = await fetch("data/users.json", { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return await res.json();
  }catch(err){
    // Ako se sajt pokreće direktno kao file://, browser često blokira fetch.
    // Zato imamo fallback (demo) korisnike da prijava radi i lokalno.
    console.warn("loadUsers fallback:", err);
    return [{"username": "student", "password_sha256": "0ea1c0c0485964aab124a4a83cca10c7965825a1bcb3d350c2c11ed604803e9b"}, {"username": "demo", "password_sha256": "0ead2060b65992dca4769af601a1b3a35ef38cfad2c2c465bb160ea764157c5d"}];
  }
}


function setText(id, text){
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const welcomeBox = document.getElementById("welcomeBox");
  const logoutBtn = document.getElementById("logoutBtn");

  // Ako smo na dobrodosli.html
  if (welcomeBox){
    const u = localStorage.getItem("wd_user");
    if (!u){
      welcomeBox.textContent = L("Niste prijavljeni. Vraćam vas na prijavu…", "You are not logged in. Redirecting to login…");
      setTimeout(() => window.location.href = "login.html", 800);
      return;
    }
    welcomeBox.textContent = L("Prijavljeni ste kao: ", "Logged in as: ") + u;
  }

  if (logoutBtn){
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("wd_user");
      window.location.href = "login.html";
    });
  }

  // Ako smo na login.html
  if (!form) return;

  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const userHelp = document.getElementById("userHelp");
  const passHelp = document.getElementById("passHelp");
  const userErr  = document.getElementById("userErr");
  const passErr  = document.getElementById("passErr");
  const msg      = document.getElementById("loginMsg");

  username.addEventListener("focus", () => userHelp.textContent = L("Unesite korisničko ime (npr. student).", "Enter username (e.g. student)."));
  username.addEventListener("blur",  () => userHelp.textContent = "");
  password.addEventListener("focus", () => passHelp.textContent = L("Unesite lozinku.", "Enter password."));
  password.addEventListener("blur",  () => passHelp.textContent = "");

  function clear(){
    userErr.textContent = "";
    passErr.textContent = "";
    msg.textContent = "";
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clear();

    const u = (username.value || "").trim();
    const p = (password.value || "");

    if (u.length < 3){
      userErr.textContent = L("Korisničko ime je prekratko.", "Username is too short.");
      return;
    }
    if (p.length < 4){
      passErr.textContent = L("Lozinka je prekratka.", "Password is too short.");
      return;
    }

    try{
      const users = await loadUsers();
      const hash = await sha256Hex(p);

      const found = users.find(x => (x.username || "").toLowerCase() === u.toLowerCase());
      if (!found){
        msg.textContent = L("Nalog ne postoji.", "Account not found.");
        msg.className = "mt-3 text-danger fw-semibold";
        return;
      }
      if (found.password_sha256 !== hash){
        msg.textContent = L("Pogrešna lozinka.", "Wrong password.");
        msg.className = "mt-3 text-danger fw-semibold";
        return;
      }

      localStorage.setItem("wd_user", found.username);
      msg.textContent = L("Uspešno ste prijavljeni. Preusmeravam…", "Login successful. Redirecting…");
      msg.className = "mt-3 text-success fw-semibold";
      setTimeout(() => window.location.href = "dobrodosli.html", 700);

    }catch(err){
      msg.textContent = L("Greška pri učitavanju fajla (lokalno otvaranje). Probaj preko Live Server-a ili hostinga.", "Could not load the file locally. Try Live Server or hosting.");
      msg.className = "mt-3 text-danger fw-semibold";
      console.error(err);
    }
  });
});
