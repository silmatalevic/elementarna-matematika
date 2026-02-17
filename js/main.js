// =========================================================
// main.js - zajedničke stvari na svim stranicama
// 1) Fade-in animacija pri skrolu
// 2) Automatski active link u navigaciji
// 3) Godina u footeru (ako postoji span#year)
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  // (1) Fade-in
  const els = document.querySelectorAll(".fade-in");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));

  // (2) Active link
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".navbar .nav-link").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === current) a.classList.add("active");
  });

  
  // (2b) Ako je aktivna stranica unutar dropdown-a, oboji i dropdown naslov
  const activeDrop = document.querySelector(".dropdown-menu .dropdown-item.active");
  if (activeDrop){
    const toggle = document.querySelector(".nav-item.dropdown .nav-link.dropdown-toggle");
    if (toggle) toggle.classList.add("active");
  }

  // (3) Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
