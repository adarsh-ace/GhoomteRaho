/* ============================================
   GHOOMTE RAHO — main.js
   ============================================ */

// ── DATA ────────────────────────────────────
const TREKS = [
  {
    id: 1,
    name: "Sandakphu – Phalut Trail",
    location: "Sandakphu, West Bengal",
    altitude: 3636,
    crowd: 2.8,
    difficulty: "moderate",
    sentiment: 82,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
    desc: "The highest peak in West Bengal offering panoramic views of Everest, Kanchenjunga, Lhotse, and Makalu from a single vantage point.",
    tags: ["Himalayan", "Sunrise Views", "Multi-Day", "Rhododendron"],
    bestTime: "April–May, Oct–Nov",
    duration: "7 days",
    startFrom: "Darjeeling, Kolkata"
  },
  {
    id: 2,
    name: "Hampta Pass",
    location: "Hampta, Himachal Pradesh",
    altitude: 4270,
    crowd: 3.2,
    difficulty: "moderate",
    sentiment: 79,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    desc: "A dramatic crossover between lush green Kullu valley and the arid Lahaul, crossing a high-altitude pass with breathtaking views.",
    tags: ["Crossover", "Snow", "Camping", "Manali"],
    bestTime: "June–September",
    duration: "5 days",
    startFrom: "Manali, Delhi"
  },
  {
    id: 3,
    name: "Goechala Trek",
    location: "Goechala, Sikkim",
    altitude: 4940,
    crowd: 1.9,
    difficulty: "hard",
    sentiment: 87,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
    desc: "One of the most spectacular yet underrated treks in India offering the closest view of Kanchenjunga, the world's third highest peak.",
    tags: ["Remote", "Kanchenjunga", "Wilderness", "Hard"],
    bestTime: "April–May, Oct–Nov",
    duration: "10 days",
    startFrom: "Gangtok, Sikkim"
  },
  {
    id: 4,
    name: "Brahmatal Trek",
    location: "Brahmatal, Uttarakhand",
    altitude: 3906,
    crowd: 2.1,
    difficulty: "moderate",
    sentiment: 81,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
    desc: "A winter wonder trail through snow-covered oak and rhododendron forests with stunning views of Trishul and Nanda Ghunti.",
    tags: ["Winter Trek", "Lake", "Snow", "Uttarakhand"],
    bestTime: "Dec–March",
    duration: "6 days",
    startFrom: "Dehradun, Delhi"
  },
  {
    id: 5,
    name: "Dayara Bugyal",
    location: "Dayara, Uttarakhand",
    altitude: 3408,
    crowd: 2.5,
    difficulty: "easy",
    sentiment: 89,
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
    desc: "One of the most beautiful alpine meadows in India with stunning 360-degree Himalayan views. Often called the hidden meadow of Uttarakhand.",
    tags: ["Meadows", "Beginner", "Family", "Snow"],
    bestTime: "May–June, Dec–March",
    duration: "4 days",
    startFrom: "Dehradun, Delhi"
  },
  {
    id: 6,
    name: "Rupin Pass",
    location: "Rupin, Himachal Pradesh",
    altitude: 4650,
    crowd: 1.6,
    difficulty: "hard",
    sentiment: 87,
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=600&q=80",
    desc: "Ranked among the best treks in India, the Rupin Pass is a dramatic high-altitude crossing through varied terrain — from waterfalls to snow walls.",
    tags: ["Waterfall", "Snow Wall", "Remote", "Challenging"],
    bestTime: "May–June",
    duration: "8 days",
    startFrom: "Dehradun"
  },
  {
    id: 7,
    name: "Valley of Flowers",
    location: "Nanda Devi, Uttarakhand",
    altitude: 3658,
    crowd: 3.8,
    difficulty: "easy",
    sentiment: 84,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
    desc: "A UNESCO World Heritage Site blooming with hundreds of species of wildflowers. The valley transforms into a sea of color during the monsoon.",
    tags: ["UNESCO", "Flowers", "Moderate", "Scenic"],
    bestTime: "July–August",
    duration: "5 days",
    startFrom: "Rishikesh, Delhi"
  },
  {
    id: 8,
    name: "Kedarkantha Trek",
    location: "Kedarkantha, Uttarakhand",
    altitude: 3810,
    crowd: 3.5,
    difficulty: "easy",
    sentiment: 85,
    image: "https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?w=600&q=80",
    desc: "A perfect winter trek through snow-laden pine forests to a beautiful summit offering panoramic views of Himalayan peaks.",
    tags: ["Winter", "Summit", "Pine Forest", "Popular"],
    bestTime: "Dec–April",
    duration: "5 days",
    startFrom: "Dehradun, Delhi"
  },
  {
    id: 9,
    name: "Chopta – Tungnath",
    location: "Chopta, Uttarakhand",
    altitude: 3680,
    crowd: 2.2,
    difficulty: "easy",
    sentiment: 86,
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&q=80",
    desc: "Called the 'Mini Switzerland of India', Chopta offers a short yet breathtaking trek to Tungnath, the highest Shiva temple in the world.",
    tags: ["Temple", "Snow", "Short Trek", "Scenic"],
    bestTime: "April–June, Nov–Dec",
    duration: "2–3 days",
    startFrom: "Rishikesh"
  },
  {
    id: 10,
    name: "Pin Parvati Pass",
    location: "Kullu – Spiti, Himachal Pradesh",
    altitude: 5319,
    crowd: 1.2,
    difficulty: "hard",
    sentiment: 90,
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&q=80",
    desc: "One of India's most challenging and rewarding high-altitude treks connecting the green Parvati Valley with the stark, moonscape Spiti Valley.",
    tags: ["Expert", "Remote", "High Altitude", "Glaciers"],
    bestTime: "July–September",
    duration: "12 days",
    startFrom: "Manali, Kullu"
  },
  {
    id: 11,
    name: "Tarsar Marsar",
    location: "Kashmir",
    altitude: 4100,
    crowd: 1.8,
    difficulty: "moderate",
    sentiment: 91,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
    desc: "Twin alpine lakes in the Kashmir valley, surrounded by meadows and dramatic peaks — considered one of the most scenic treks in India.",
    tags: ["Lakes", "Kashmir", "Meadows", "Scenic"],
    bestTime: "July–September",
    duration: "7 days",
    startFrom: "Srinagar"
  },
  {
    id: 12,
    name: "Har Ki Dun",
    location: "Govind National Park, Uttarakhand",
    altitude: 3566,
    crowd: 2.3,
    difficulty: "easy",
    sentiment: 83,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=600&q=80",
    desc: "A cradle-shaped valley in Uttarakhand, steeped in mythology and surrounded by mighty Himalayan peaks. Perfect for first-time trekkers.",
    tags: ["Valley", "Mythology", "Beginner", "Wildlife"],
    bestTime: "April–June, Sep–Nov",
    duration: "7 days",
    startFrom: "Dehradun"
  }
];

// ── UTILS ────────────────────────────────────
function diffClass(d) {
  if (d === 'easy') return 'easy';
  if (d === 'hard') return 'hard';
  return 'moderate';
}
function sentimentLabel(s) {
  return `positive (${s}%)`;
}
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ── NAVBAR ───────────────────────────────────
(function initNav() {
  const navbar   = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }
})();

// ── TREKS PAGE ───────────────────────────────
(function initTreksPage() {
  const grid = document.getElementById('treksGrid');
  if (!grid) return;

  const searchInput = document.getElementById('searchInput');
  const diffFilter  = document.getElementById('diffFilter');
  const noResults   = document.getElementById('noResults');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose   = document.getElementById('modalClose');

  function renderCards(list) {
    grid.innerHTML = '';
    noResults.style.display = list.length === 0 ? 'block' : 'none';
    list.forEach(t => {
      const card = document.createElement('div');
      card.className = 'trek-card';
      card.innerHTML = `
        <div class="card-img-wrap">
          <span class="difficulty ${diffClass(t.difficulty)}">${capitalize(t.difficulty)}</span>
          <img src="${t.image}" alt="${t.name}" loading="lazy"/>
        </div>
        <div class="card-body">
          <h3>${t.name}</h3>
          <div class="card-meta">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${t.location}
          </div>
          <div class="card-stats">
            <span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>
              ${t.altitude}m alt
            </span>
            <span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Crowd: ${t.crowd}/10
            </span>
          </div>
          <p class="card-desc">${t.desc}</p>
          <div class="card-footer">
            <span class="sentiment positive">${sentimentLabel(t.sentiment)}</span>
            <span class="explore-link">Explore Details</span>
          </div>
        </div>
      `;
      card.addEventListener('click', () => openModal(t));
      grid.appendChild(card);
    });
  }

  function filterAndRender() {
    const q    = searchInput.value.toLowerCase();
    const diff = diffFilter.value;
    const list = TREKS.filter(t => {
      const matchSearch = !q ||
        t.name.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q);
      const matchDiff   = diff === 'all' || t.difficulty === diff;
      return matchSearch && matchDiff;
    });
    renderCards(list);
  }

  searchInput.addEventListener('input', filterAndRender);
  diffFilter.addEventListener('change', filterAndRender);
  renderCards(TREKS);

  // Modal
  function openModal(t) {
    document.getElementById('modalImg').src = t.image;
    document.getElementById('modalImg').alt = t.name;
    document.getElementById('modalDiff').textContent = capitalize(t.difficulty);
    document.getElementById('modalDiff').className = `difficulty ${diffClass(t.difficulty)}`;
    document.getElementById('modalTitle').textContent = t.name;
    document.getElementById('modalMeta').innerHTML = `
      <span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        ${t.location}
      </span>
      <span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>
        ${t.altitude}m altitude
      </span>
      <span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        Crowd: ${t.crowd}/10
      </span>
      <span>⏱ ${t.duration}</span>
      <span>📍 Start: ${t.startFrom}</span>
      <span>🌤 Best time: ${t.bestTime}</span>
    `;
    document.getElementById('modalDesc').textContent = t.desc;
    document.getElementById('modalTags').innerHTML = t.tags
      .map(tag => `<span class="modal-tag">${tag}</span>`).join('');
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose)  modalClose.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', e => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
})();

// ── EXPLORE PAGE ─────────────────────────────
(function initExplorePage() {
  const findBtn    = document.getElementById('findTreks');
  if (!findBtn) return;

  const placeholder  = document.getElementById('resultsPlaceholder');
  const aiResults    = document.getElementById('aiResults');
  const aiLoading    = document.getElementById('aiLoading');
  const aiResultCards = document.getElementById('aiResultCards');

  findBtn.addEventListener('click', async () => {
    const location = document.getElementById('startLocation').value.trim() || 'Delhi';
    const budget   = parseInt(document.getElementById('budget').value) || 10000;
    const duration = parseInt(document.getElementById('duration').value) || 5;
    const fitness  = document.getElementById('fitness').value;

    // Map fitness → difficulty
    const diffMap = { beginner: 'easy', intermediate: 'moderate', advanced: 'hard' };
    const targetDiff = diffMap[fitness];

    placeholder.style.display = 'none';
    aiResults.style.display = 'block';
    aiLoading.style.display = 'flex';
    aiResultCards.innerHTML = '';

    // Simulate AI processing delay
    await new Promise(r => setTimeout(r, 1400));

    // Filter & score treks
    let scored = TREKS.map(t => {
      let score = t.sentiment;
      // Prefer matching difficulty
      if (t.difficulty === targetDiff)        score += 20;
      else if (targetDiff === 'intermediate') score += 5;
      // Prefer low crowd
      score += (5 - t.crowd) * 3;
      // Budget filter (rough: hard treks cost more)
      const estCost = { easy: 6000, moderate: 10000, hard: 16000 };
      if (estCost[t.difficulty] <= budget + 2000) score += 10;
      // Duration match
      const days = parseInt(t.duration);
      if (!isNaN(days) && Math.abs(days - duration) <= 2) score += 8;
      return { ...t, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const results = scored.slice(0, 4);

    aiLoading.style.display = 'none';
    renderAiResults(results, location, budget, duration, fitness);
  });

  function renderAiResults(list, location, budget, duration, fitness) {
    aiResultCards.innerHTML = `
      <div style="margin-bottom:8px; padding-bottom:16px; border-bottom:1px solid var(--border)">
        <p style="font-size:0.88rem; color:var(--text-muted)">
          Found <strong style="color:var(--text)">${list.length} treks</strong> for 
          <strong style="color:var(--text)">${capitalize(fitness)}</strong> level, 
          ₹${budget.toLocaleString('en-IN')} budget, ${duration} days from ${location || 'your location'}.
        </p>
      </div>
    `;
    list.forEach((t, i) => {
      const card = document.createElement('div');
      card.className = 'ai-result-card';
      card.style.animationDelay = `${i * 0.07}s`;
      card.innerHTML = `
        <div class="ai-result-img">
          <img src="${t.image}" alt="${t.name}" loading="lazy"/>
        </div>
        <div class="ai-result-info">
          <h4>${t.name}</h4>
          <div class="card-meta">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${t.location} · ${t.altitude}m · Crowd: ${t.crowd}/10
          </div>
          <p>${t.desc}</p>
        </div>
        <div class="ai-result-badge">
          <span class="difficulty ${diffClass(t.difficulty)}">${capitalize(t.difficulty)}</span>
          <span class="sentiment positive" style="white-space:nowrap">${sentimentLabel(t.sentiment)}</span>
        </div>
      `;
      aiResultCards.appendChild(card);
    });
  }
})();
