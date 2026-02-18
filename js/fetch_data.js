// =========================================================
// fetch_data.js - mini deo za "API/fetch"
// =========================================================

async function loadExample(){
  const box = document.getElementById("exampleBox");
  if (!box) return;

  const topic = box.getAttribute("data-topic") || "aritmetika";

  try{
    const res = await 
    const data = await res.json();

    const list = data[topic];
    if (!list || list.length === 0) return;

    const ex = list[0];
    const lang = document.documentElement.lang || "sr";

    const sol = (lang === "en") ? "Solution:" : "Rešenje:";

    box.classList.remove("d-none");

    box.innerHTML = `
      <strong>${title}</strong> ${ex.tekst}<br>
      <span class="text-muted">${sol}</span> ${ex.resenje}
    `;
  }catch(err){
    box.classList.add("d-none");
    // Kada se sajt pokrene preko hostinga/servera, fetch će raditi i primer će se prikazati.
  }
}

document.addEventListener("DOMContentLoaded", loadExample);
