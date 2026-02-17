// ==============================
// calculators.js (ARITMETIKA)
// ==============================


// Pomoć: trenutno izabrani jezik
function isEN(){
  return (document.documentElement.lang || 'sr') === 'en';
}
function L(sr, en){
  return isEN() ? en : sr;
}

// Kalkulator procenta: p% od broja N
function calculatePercent() {
    const percent = document.getElementById("percent").value;
    const number = document.getElementById("number").value;

    const wrap = document.getElementById("percentResultWrap");
    const out = document.getElementById("percentResult");

    if (percent === "" || number === "") {
        wrap.classList.remove("d-none");
        out.textContent = L("Unesite oba podatka.", "Enter both values.");
        return;
    }

    const p = Number(percent);
    const n = Number(number);

    const result = (p / 100) * n;

    wrap.classList.remove("d-none");
    out.textContent = result.toFixed(2);
}


// Pomocna funkcija: najveci zajednicki delilac (Euklidov algoritam)
function gcd(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);

    while (y !== 0) {
        const t = y;
        y = x % y;
        x = t;
    }
    return x;
}

// Sabiranje razlomaka: a/b + c/d (sa skracivanjem)
function addFractions() {
    const a = document.getElementById("aNum").value;
    const b = document.getElementById("aDen").value;
    const c = document.getElementById("cNum").value;
    const d = document.getElementById("cDen").value;

    const wrap = document.getElementById("fracResultWrap");
    const out = document.getElementById("fracResult");

    if (a === "" || b === "" || c === "" || d === "") {
        wrap.classList.remove("d-none");
        out.textContent = L("Popuni sva polja.", "Fill in all fields.");
        return;
    }

    const numA = Number(a);
    const denA = Number(b);
    const numC = Number(c);
    const denC = Number(d);

    if (denA === 0 || denC === 0) {
        wrap.classList.remove("d-none");
        out.textContent = L("Imenilac ne sme biti 0.", "Denominator cannot be 0.");
        return;
    }

    const num = numA * denC + numC * denA;
    const den = denA * denC;

    const g = gcd(num, den);
    const snum = num / g;
    const sden = den / g;

    wrap.classList.remove("d-none");
    out.textContent = `${snum}/${sden}`;
}


// =========================================================
// DODATO: ostali kalkulatori (geometrija, funkcije, trig, komb)
// =========================================================

// GEOMETRIJA: obim i površina kruga
function circleCalc(){
  const r = parseFloat(document.getElementById("radius").value);
  const out = document.getElementById("circleResult");
  if (Number.isNaN(r) || r <= 0){
    out.textContent = L("Unesi pozitivan poluprečnik.", "Enter a positive radius.");
    return;
  }
  const O = 2*Math.PI*r;
  const P = Math.PI*r*r;
  out.textContent = `${L("Obim", "Circumference")} ≈ ${O.toFixed(3)}, ${L("Površina", "Area")} ≈ ${P.toFixed(3)}`;
}


// ==============================
// GEOMETRIJA: kalkulatori
// ==============================

// Treći ugao trougla (A + B + C = 180)
function calcThirdAngle(){
  const a = parseFloat(document.getElementById("angleA").value);
  const b = parseFloat(document.getElementById("angleB").value);
  const out = document.getElementById("thirdAngleResult");

  if (Number.isNaN(a) || Number.isNaN(b)){
    out.textContent = L("Unesi oba ugla.", "Enter both angles.");
    return;
  }
  const c = 180 - (a + b);
  if (c <= 0){
    out.textContent = L("Proveri unete vrednosti (zbir mora biti manji od 180°).", "Check values (sum must be less than 180°).");
    return;
  }
  out.textContent = `${L("Treći ugao je", "Third angle is")}: ${c.toFixed(2)}°`;
}

// Obim trougla: O = a + b + c
function calcTrianglePerimeter(){
  const a = parseFloat(document.getElementById("sideA").value);
  const b = parseFloat(document.getElementById("sideB").value);
  const c = parseFloat(document.getElementById("sideC").value);
  const out = document.getElementById("triPerResult");

  if ([a,b,c].some(v => Number.isNaN(v))){
    out.textContent = L("Unesi sve tri stranice.", "Enter all three sides.");
    return;
  }
  if (a <= 0 || b <= 0 || c <= 0){
    out.textContent = L("Stranice moraju biti pozitivne.", "Sides must be positive.");
    return;
  }
  // Osnovna provera za trougao
  if (a + b <= c || a + c <= b || b + c <= a){
    out.textContent = L("Ove stranice ne mogu da formiraju trougao.", "These sides cannot form a triangle.");
    return;
  }

  const O = a + b + c;
  out.textContent = `${L("Obim trougla", "Triangle perimeter")} = ${O.toFixed(2)}`;
}

// ALGEBRA: vrednost polinoma ax^2 + bx + c
function polyValue(){
  const a = parseFloat(document.getElementById("pa").value);
  const b = parseFloat(document.getElementById("pb").value);
  const c = parseFloat(document.getElementById("pc").value);
  const x = parseFloat(document.getElementById("px").value);
  const out = document.getElementById("polyResult");

  if ([a,b,c,x].some(v => Number.isNaN(v))){
    out.textContent = L("Unesi sve koeficijente i x.", "Enter all coefficients and x.");
    return;
  }
  const y = a*x*x + b*x + c;
  out.textContent = `P(${x}) = ${y}`;
}

// FUNKCIJE: tabela vrednosti i graf (linearna funkcija y = kx + n)
function buildTableAndGraph(){
  const k = parseFloat(document.getElementById("k").value);
  const n = parseFloat(document.getElementById("n").value);

  const out = document.getElementById("funTable");
  const canvas = document.getElementById("funCanvas");
  const ctx = canvas?.getContext("2d");

  if (Number.isNaN(k) || Number.isNaN(n)){
    out.textContent = L("Unesi k i n.", "Enter k and n.");
    return;
  }

  // tabela za x = -2..2
  let html = `<table class="table table-sm table-bordered mt-2"><thead><tr><th>x</th><th>y</th></tr></thead><tbody>`;
  const pts = [];
  for (let x=-2; x<=2; x++){
    const y = k*x + n;
    pts.push({x,y});
    html += `<tr><td>${x}</td><td>${y}</td></tr>`;
  }
  html += `</tbody></table>`;
  out.innerHTML = html;

  // jednostavan grafik (osnovna koordinatna mreža + prava)
  if (!ctx) return;

  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0,0,W,H);

  // os x i y
  const cx = W/2, cy = H/2;
  ctx.beginPath();
  ctx.moveTo(0, cy); ctx.lineTo(W, cy);
  ctx.moveTo(cx, 0); ctx.lineTo(cx, H);
  ctx.strokeStyle = "#111";
  ctx.lineWidth = 1;
  ctx.stroke();

  // skala: 1 jedinica = 40px
  const s = 40;

  // nacrtaj liniju kroz tačke za x=-3..3
  function toCanvas(x,y){
    return { X: cx + x*s, Y: cy - y*s };
  }
  const p1 = toCanvas(-3, k*(-3)+n);
  const p2 = toCanvas( 3, k*( 3)+n);

  ctx.beginPath();
  ctx.moveTo(p1.X, p1.Y);
  ctx.lineTo(p2.X, p2.Y);
  ctx.strokeStyle = "#0d6efd";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// TRIGONOMETRIJA: sin, cos, tg i ctg iz kateta
function trigRightTriangle(){
  const oppEl = document.getElementById("opp");
  const adjEl = document.getElementById("adj");
  const out = document.getElementById("trigResult");
  if (!oppEl || !adjEl || !out) return;

  const opp = parseFloat(oppEl.value);
  const adj = parseFloat(adjEl.value);

  const T = (sr, en) => (typeof L === "function" ? L(sr, en) : sr);

  if ([opp, adj].some(v => Number.isNaN(v)) || opp <= 0 || adj <= 0){
    out.textContent = T("Unesi pozitivne katete.", "Enter positive legs.");
    return;
  }

  const hyp = Math.sqrt(opp*opp + adj*adj);
  const sin = opp / hyp;
  const cos = adj / hyp;
  const tg  = opp / adj;
  const ctg = adj / opp;

  // traženi format ispisa
  out.textContent =
    `hipotenuza = ${hyp.toFixed(3)}, ` +
    `sin = ${sin.toFixed(3)}, ` +
    `cos = ${cos.toFixed(3)}, ` +
    `tg = ${tg.toFixed(3)}, ` +
    `ctg = ${ctg.toFixed(3)}`;
}



// Kalkulator faktorijela (n!)
function factorialCalc(){
  const n = parseInt(document.getElementById("factN")?.value, 10);
  const out = document.getElementById("factResult");
  if (!out) return;

  if (Number.isNaN(n) || n < 0){
    out.textContent = L("Unesi ceo broj n ≥ 0.", "Enter an integer n ≥ 0.");
    return;
  }
  const r = fact(n);
  out.textContent = `${n}! = ${r}`;
}

// KOMBINATORIKA: kombinacije C(n,k)
function fact(n){
  if (n < 0) return null;
  let r = 1;
  for (let i=2;i<=n;i++) r *= i;
  return r;
}
function nCr(){
  const n = parseInt(document.getElementById("n").value, 10);
  const k = parseInt(document.getElementById("k").value, 10);
  const out = document.getElementById("combResult");

  if ([n,k].some(v => Number.isNaN(v)) || n < 0 || k < 0 || k > n){
    out.textContent = L("Unesi cele brojeve, 0 ≤ k ≤ n.", "Enter integers, 0 ≤ k ≤ n.");
    return;
  }
  const res = fact(n)/(fact(k)*fact(n-k));
  out.textContent = `C(${n},${k}) = ${res}`;
}


/* ---------------- MINI KVIZ (ARITMETIKA) ---------------- */

const quizState = { answered: {}, score: 0 };

function quizChoose(qid, correct, chosen, el){
  // Ako je pitanje već rešeno, ne dozvoli ponovo
  if (quizState.answered[qid]) return;

  const ok = (chosen === correct);
  quizState.answered[qid] = ok ? 1 : 0;
  if (ok) quizState.score += 1;

  // vizuelna povratna informacija
  el.classList.add(ok ? "border-success" : "border-danger");
  el.classList.add("shadow-sm");

  const msg = document.getElementById(qid + "Msg");
  if (msg){
    msg.textContent = ok ? "Tačno ✅" : "Netačno ❌";
    msg.className = ok ? "text-success fw-semibold" : "text-danger fw-semibold";
  }

  const scoreEl = document.getElementById("quizScore");
  if (scoreEl) scoreEl.textContent = String(quizState.score);
}
