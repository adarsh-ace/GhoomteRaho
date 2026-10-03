
// ═══════════════════════════════════════════════════════
//  CONFIG
// ═══════════════════════════════════════════════════════
const GEMINI_API_KEY = "AIzaSyC8pQePyG4KJZNa0fVSegBMiM5tA3IrxJ8";

// ── FALLBACK AI: Pro → Flash → 2.0-flash ──────────────
async function callAI(prompt) {
  const models = ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash"];
  for (const model of models) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );
      if (!res.ok) continue;
      const data = await res.json();
      return data.candidates[0].content.parts[0].text;
    } catch(e) { continue; }
  }
  throw new Error("Sabhi models busy hain, thodi der baad try karein.");
}

// ── TAB SWITCHING ──────────────────────────────────────
document.querySelectorAll('.explore-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.explore-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.explore-tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// ── NAVBAR ─────────────────────────────────────────────
window.addEventListener('scroll', () =>
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 10));
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
});

// ── HELPERS ────────────────────────────────────────────
function showLoading(lId, pId, rId) {
  document.getElementById(pId).style.display = 'none';
  document.getElementById(rId).style.display = 'block';
  document.getElementById(lId).style.display = 'flex';
}
function hideLoading(id) { document.getElementById(id).style.display = 'none'; }
function showError(id, msg) {
  document.getElementById(id).innerHTML = `<div class="ai-error">⚠️ ${msg}</div>`;
}
function formatAI(text) {
  // Convert markdown tables
  text = text.replace(/^\|(.+)\|$/gm, row => {
    const cells = row.split('|').filter(c => c.trim() !== '');
    return '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
  });
  text = text.replace(/(<tr>.*<\/tr>\n?)+/g, m => `<table>${m}</table>`);
  // Remove separator rows like |---|---|
  text = text.replace(/<tr>(<td>[-: ]+<\/td>)+<\/tr>/g, '');

  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    .replace(/^\* (.+)$/gm, '<li>$1</li>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/\n/g, '<br>');
}

// ── WORKING IMAGE FUNCTION ─────────────────────────────
// Uses Wikimedia Commons search API (no key needed, CORS friendly)
const imgCache = {};

async function fetchPlaceImage(placeName, destName) {
  const cacheKey = placeName + '|' + destName;
  if (imgCache[cacheKey]) return imgCache[cacheKey];

  const query = `${placeName} ${destName} India`;

  // Try Wikimedia Commons
  try {
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(placeName)}&prop=pageimages&format=json&pithumbsize=300&origin=*`;
    const res = await fetch(wikiUrl);
    const data = await res.json();
    const pages = data.query.pages;
    const page = Object.values(pages)[0];
    if (page && page.thumbnail && page.thumbnail.source) {
      imgCache[cacheKey] = page.thumbnail.source;
      return page.thumbnail.source;
    }
  } catch(e) {}

  // Fallback: Picsum with seed based on place name (always loads, consistent per place)
  const seed = placeName.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 1000;
  const fallback = `https://picsum.photos/seed/${seed}/300/200`;
  imgCache[cacheKey] = fallback;
  return fallback;
}

// ── RENDER ITINERARY ───────────────────────────────────
let lastData = null, lastDest = '';

async function renderItinerary(data, dest) {
  let html = `
    <div class="itinerary-section">
      <h3>🗺️ Trip Overview</h3>
      <p>${data.overview}</p>
    </div>
    <div class="itinerary-section">
      <h3>🚆 Getting There</h3>
      <p>${data.getting_there}</p>
    </div>`;

  for (const day of data.days) {
    html += `<div class="day-block"><h3>Day ${day.day} — ${day.title}</h3>`;
    for (const place of day.places) {
      const imgSrc = await fetchPlaceImage(place.name, dest);
      html += `
        <div class="place-card">
          <img class="place-card-img" src="${imgSrc}" alt="${place.name}"
            onerror="this.src='https://picsum.photos/seed/${Math.floor(Math.random()*999)}/300/200'" crossorigin="anonymous"/>
          <div class="place-card-body">
            <span class="place-time">${place.time}</span>
            <h4>${place.name}</h4>
            <p>${place.desc}</p>
            <div class="entry-fee">🎟️ Entry: ${place.entry_fee}</div>
          </div>
        </div>`;
    }
    html += `
      <div class="day-food-stay">
        🍽️ <strong>Food:</strong> ${day.food}<br/>
        🏨 <strong>Stay:</strong> ${day.stay}
      </div></div>`;
  }

  html += `
    <div class="itinerary-section">
      <h3>💰 Budget Breakdown (per person)</h3>
      <table class="budget-table">
        <tr><td>✈️ Travel</td><td>${data.budget.travel}</td></tr>
        <tr><td>🏨 Accommodation</td><td>${data.budget.accommodation}</td></tr>
        <tr><td>🍽️ Food</td><td>${data.budget.food}</td></tr>
        <tr><td>🎟️ Entry Fees</td><td>${data.budget.entry_fees}</td></tr>
        <tr><td>🚗 Local Transport</td><td>${data.budget.local_transport}</td></tr>
        <tr><td><strong>Grand Total</strong></td><td><strong>${data.budget.total}</strong></td></tr>
      </table>
    </div>
    <div class="itinerary-section">
      <h3>💡 Insider Tips</h3>
      <ul class="tips-list">${data.tips.map(t => `<li>${t}</li>`).join('')}</ul>
    </div>
    <button class="download-btn" id="downloadPdfBtn" onclick="downloadPDF()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      Download as PDF (with images)
    </button>`;
  return html;
}

// ── PDF DOWNLOAD (html2canvas + jsPDF) ────────────────
async function downloadPDF() {
  const btn = document.getElementById('downloadPdfBtn');
  if (!btn) return;
  btn.disabled = true;
  btn.innerHTML = `<span>Generating PDF…</span>`;

  const content = document.getElementById('destResultContent');

  try {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const pageW = pdf.internal.pageSize.getWidth();   // 210mm
    const pageH = pdf.internal.pageSize.getHeight();  // 297mm
    const margin = 12;
    const contentW = pageW - margin * 2;

    // ── COVER PAGE ────────────────────────────────────
    pdf.setFillColor(26, 71, 49);
    pdf.rect(0, 0, pageW, pageH, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(28);
    pdf.text('Ghoomte Raho', pageW / 2, 90, { align: 'center' });

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Trip Itinerary', pageW / 2, 102, { align: 'center' });

    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(lastDest, pageW / 2, 125, { align: 'center' });

    if (lastData) {
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(180, 220, 195);
      const overviewLines = pdf.splitTextToSize(lastData.overview, contentW);
      pdf.text(overviewLines, pageW / 2, 142, { align: 'center' });
    }

    pdf.setTextColor(140, 200, 160);
    pdf.setFontSize(9);
    pdf.text('Generated by Ghoomte Raho AI Explore', pageW / 2, pageH - 20, { align: 'center' });
    pdf.text(new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }), pageW / 2, pageH - 14, { align: 'center' });

    pdf.addPage();

    // ── CAPTURE CONTENT WITH html2canvas ─────────────
    // Temporarily expand width for better rendering
    const origMaxW = content.style.maxWidth;
    content.style.maxWidth = '900px';

    const canvas = await html2canvas(content, {
      scale: 1.8,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#f4f9f6',
      logging: false,
      imageTimeout: 8000,
      onclone: (doc) => {
        // Hide the download button in the clone
        const cloneBtn = doc.getElementById('downloadPdfBtn');
        if (cloneBtn) cloneBtn.style.display = 'none';
      }
    });

    content.style.maxWidth = origMaxW;

    const imgData = canvas.toDataURL('image/jpeg', 0.92);
    const imgW = contentW;
    const imgH = (canvas.height * imgW) / canvas.width;

    // Split across pages
    let yOffset = 0;
    const printableH = pageH - margin * 2;

    while (yOffset < imgH) {
      if (yOffset > 0) pdf.addPage();

      const sliceH = Math.min(printableH, imgH - yOffset);
      const srcY = (yOffset / imgH) * canvas.height;
      const srcH = (sliceH / imgH) * canvas.height;

      // Create a slice canvas
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = srcH;
      const ctx = sliceCanvas.getContext('2d');
      ctx.drawImage(canvas, 0, srcY, canvas.width, srcH, 0, 0, canvas.width, srcH);

      const sliceData = sliceCanvas.toDataURL('image/jpeg', 0.92);
      pdf.addImage(sliceData, 'JPEG', margin, margin, imgW, sliceH);

      yOffset += sliceH;
    }

    pdf.save(`GhoomteRaho-${lastDest.split(',')[0].trim()}-Itinerary.pdf`);

  } catch(err) {
    console.error('PDF error:', err);
    alert('PDF generation failed. Please try again.');
  }

  btn.disabled = false;
  btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download as PDF (with images)`;
}

// ═══════════════════════════════════════════════════════
//  1. TREK FINDER
// ═══════════════════════════════════════════════════════
document.getElementById('findTreks').addEventListener('click', async () => {
  const loc    = document.getElementById('startLocation').value || 'Delhi';
  const budget = document.getElementById('budget').value;
  const days   = document.getElementById('duration').value;
  const fit    = document.getElementById('fitness').value;
  const season = document.getElementById('season').value;

  showLoading('trekLoading', 'trekPlaceholder', 'trekResults');

  const prompt = `You are an expert Indian trekking guide for Ghoomte Raho, a platform for hidden off-beaten-path trails.

Suggest exactly 3 treks in India:
- Starting location: ${loc}
- Budget: Rs.${budget} total
- Duration: ${days} days
- Fitness level: ${fit}
- Season: ${season}

For each trek:
**Trek Name** - Region, State
- Difficulty: Easy/Moderate/Hard
- Best Season: months
- Altitude: metres
- Distance: km
- Approx Cost: Rs. from ${loc}
- Crowd Score: X/10 (lower = more hidden)
- Why it matches: 2 sentences
- Hidden gem tip: 1 insider tip

Prioritise lesser-known, off-beaten trails. Be specific and accurate.`;

  try {
    const r = await callAI(prompt);
    hideLoading('trekLoading');
    document.getElementById('trekResultCards').innerHTML =
      `<div class="ai-response-box">${formatAI(r)}</div>`;
  } catch(e) {
    hideLoading('trekLoading');
    showError('trekResultCards', e.message);
  }
});

// ═══════════════════════════════════════════════════════
//  2. DESTINATION PLANNER
// ═══════════════════════════════════════════════════════
document.getElementById('planDest').addEventListener('click', async () => {
  const dest      = document.getElementById('destSelect').value;
  const from      = document.getElementById('destFromCity').value || 'your city';
  const days      = document.getElementById('destDays').value;
  const budget    = document.getElementById('destBudget').value;
  const style     = document.getElementById('destStyle').value;
  const interests = document.getElementById('destInterests').value || 'general sightseeing';

  if (!dest) { alert('Please select a destination first.'); return; }

  showLoading('destLoading', 'destPlaceholder', 'destResults');
  document.getElementById('destResultContent').innerHTML = '';

  const prompt = `You are an expert Indian travel planner for Ghoomte Raho.

Create a ${days}-day itinerary for ${dest}.
Travelling from: ${from} | Budget per person: Rs.${budget} | Style: ${style} | Interests: ${interests}

VERY IMPORTANT: Reply with ONLY raw valid JSON. No markdown, no code fences, no text before or after JSON.

{
  "overview": "2-line trip vibe summary",
  "getting_there": "Best transport options from ${from} to ${dest} with approximate cost and travel time",
  "days": [
    {
      "day": 1,
      "title": "Day theme title",
      "places": [
        { "name": "Real Specific Place Name", "time": "Morning", "desc": "What to see and experience here in 1-2 sentences", "entry_fee": "Rs.XX or Free" },
        { "name": "Real Specific Place Name", "time": "Afternoon", "desc": "What to do here in 1-2 sentences", "entry_fee": "Rs.XX or Free" },
        { "name": "Real Specific Place Name", "time": "Evening", "desc": "What to do here in 1-2 sentences", "entry_fee": "Rs.XX or Free" }
      ],
      "food": "2 specific local restaurant names with signature dish",
      "stay": "1 specific hotel or hostel name suitable for ${style}"
    }
  ],
  "budget": {
    "travel": "Rs.XXXX",
    "accommodation": "Rs.XXXX",
    "food": "Rs.XXXX",
    "entry_fees": "Rs.XXXX",
    "local_transport": "Rs.XXXX",
    "total": "Rs.XXXX"
  },
  "tips": ["practical insider tip 1", "practical insider tip 2", "practical insider tip 3"]
}

Use REAL well-known place names specific to ${dest}. Use accurate 2024-2025 Indian prices.`;

  try {
    const raw = await callAI(prompt);
    hideLoading('destLoading');
    const cleaned = raw.replace(/```json|```/g, '').trim();
    const data = JSON.parse(cleaned);
    lastData = data;
    lastDest = dest;
    const html = await renderItinerary(data, dest);
    document.getElementById('destResultContent').innerHTML = html;
  } catch(e) {
    hideLoading('destLoading');
    if (e instanceof SyntaxError) {
      showError('destResultContent', 'Response format error — please try again.');
    } else {
      showError('destResultContent', e.message);
    }
  }
});

// ═══════════════════════════════════════════════════════
//  3. BUDGET GUESSER
// ═══════════════════════════════════════════════════════
document.getElementById('guessBudget').addEventListener('click', async () => {
  const dest   = document.getElementById('bgDest').value || 'the destination';
  const places = document.getElementById('bgPlaces').value || 'general sightseeing';
  const days   = document.getElementById('bgDays').value;
  const people = document.getElementById('bgPeople').value;
  const style  = document.getElementById('bgStyle').value;
  const from   = document.getElementById('bgFrom').value || 'Delhi';

  showLoading('budgetLoading', 'budgetPlaceholder', 'budgetResults');

  const prompt = `You are an expert Indian travel budget estimator for Ghoomte Raho.

Estimate total trip cost:
- Destination: ${dest}
- Places to visit: ${places}
- Duration: ${days} days, ${people} people
- Travel style: ${style}
- Travelling from: ${from}

Provide:

**Trip Summary** — one line.

**Travel (${from} to ${dest} return)**
Best option, per person cost, total for ${people} people.

**Accommodation (${days} nights)**
Recommended type, per night x nights x rooms = total.

**Food**
Per person/day x ${days} days x ${people} = total.

**Entry Fees**
List each place from: ${places} with entry fee per person.

**Local Transport**
Estimate for ${days} days.

**Total Cost Table**
| Category | Per Person | Total (${people} people) |
|---|---|---|
| Travel | Rs. | Rs. |
| Stay | Rs. | Rs. |
| Food | Rs. | Rs. |
| Entry Fees | Rs. | Rs. |
| Local Transport | Rs. | Rs. |
| Misc (10% buffer) | Rs. | Rs. |
| **Grand Total** | **Rs.** | **Rs.** |

**3 Money-Saving Tips** — specific to ${dest}.

Use accurate 2024-2025 Indian prices.`;

  try {
    const r = await callAI(prompt);
    hideLoading('budgetLoading');
    document.getElementById('budgetResultContent').innerHTML =
      `<div class="ai-response-box">${formatAI(r)}</div>`;
  } catch(e) {
    hideLoading('budgetLoading');
    showError('budgetResultContent', e.message);
  }
});
