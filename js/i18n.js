// =========================================================
// i18n.js - SR/EN prevod (jednostavno, studentski)
// Radi i kad se stranica otvara lokalno (file://) i preko servera.
// Prevodi elemente koji imaju data-i18n="KEY".
// Ako KEY ne postoji u rečniku, tekst ostaje kako jeste.
// =========================================================

const DICT = {
  sr: {
    // Navigacija
    navHome: "Početna",
    navLessons: "Oblasti",
    navArit: "Aritmetika",
    navAlg: "Algebra",
    navGeo: "Geometrija",
    navFun: "Funkcije",
    navTrig: "Trigonometrija",
    navKomb: "Kombinatorika",
    navKontakt: "Kontakt",
    navLogin: "Prijava",

    // Kontakt
    contactTitle: "Kontakt",
    contactNameLabel: "Ime i prezime",
    contactEmailLabel: "Email adresa",
    contactMsgLabel: "Poruka",
    contactSendBtn: "Pošalji",

    // Login / Welcome
    loginTitle: "Prijava",
    loginHeading: "Prijava",
    loginNote: "Podaci za prijavu se čitaju iz JSON fajla i lozinka se proverava kao SHA-256 hash (front-end demonstracija).",
    loginUserLabel: "Korisničko ime",
    loginPassLabel: "Lozinka",
    loginBtn: "Prijavi se",
    loginDemo: "Demo nalozi:",
    welcomeTitle: "Dobrodošli",
    welcomeHeading: "Uspešna prijava",
    welcomeText: "Ova stranica je demonstracija logovanja (bez servera). Sesija se čuva u LocalStorage.",
    logoutBtn: "Odjavi se",
    backHomeBtn: "Nazad na početnu",

    // Početna (ako postoji)
    homeIntro: "Ovaj sajt sadrži kratak pregled oblasti elementarne matematike, uz primere i jednostavne interaktivne kalkulatore koji pomažu pri vežbanju osnovnih matematičkih pojmova.",
    siteTitle: "Elementarna matematika"
  },

  en: {
    // Navigation
    navHome: "Home",
    navLessons: "Topics",
    navArit: "Arithmetic",
    navAlg: "Algebra",
    navGeo: "Geometry",
    navFun: "Functions",
    navTrig: "Trigonometry",
    navKomb: "Combinatorics",
    navKontakt: "Contact",
    navLogin: "Login",

    // Contact
    contactTitle: "Contact",
    contactNameLabel: "Full name",
    contactEmailLabel: "Email address",
    contactMsgLabel: "Message",
    contactSendBtn: "Send",

    // Login / Welcome
    loginTitle: "Login",
    loginHeading: "Login",
    loginNote: "Login data is loaded from a JSON file and the password is checked as a SHA-256 hash (front-end demo).",
    loginUserLabel: "Username",
    loginPassLabel: "Password",
    loginBtn: "Log in",
    loginDemo: "Demo accounts:",
    welcomeTitle: "Welcome",
    welcomeHeading: "Login successful",
    welcomeText: "This page is a login demonstration (no server). The session is stored in LocalStorage.",
    logoutBtn: "Log out",
    backHomeBtn: "Back to home",

    // Home (if exists)
    homeIntro: "This website provides a short overview of elementary mathematics topics, with examples and simple interactive calculators that help practice basic mathematical concepts.",
    siteTitle: "Elementary Mathematics"
  }
};

function safeGetLang(){
  try { return localStorage.getItem("lang"); } catch(e) { return null; }
}
function safeSetLang(lang){
  try { localStorage.setItem("lang", lang); } catch(e) {}
}

function translatePage(lang){
  document.documentElement.lang = lang;

  const dict = DICT[lang] || {};
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined){
      el.textContent = dict[key];
    }
  });

  // Button label toggles to the OTHER language (common UX)
  const btn = document.getElementById("langBtn");
  if (btn){
    btn.textContent = (lang === "sr") ? "EN" : "SR";
  }
}

function initI18n(){
  // Apply saved language (default SR)
  const saved = safeGetLang() || "sr";
  translatePage(saved);

  const btn = document.getElementById("langBtn");
  if (btn){
    // avoid double-binding
    if (!btn.dataset.bound){
      btn.dataset.bound = "1";
      btn.addEventListener("click", () => {
        const current = document.documentElement.lang || "sr";
        const next = (current === "sr") ? "en" : "sr";
        safeSetLang(next);
        translatePage(next);
      });
    }
  }
}

// Robust init: works whether DOM is loading or already ready
if (document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded", initI18n);
} else {
  initI18n();
}
