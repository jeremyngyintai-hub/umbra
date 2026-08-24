/* UMBRA LEACHIES — shared behaviour */

const MARK = (size, stroke) => `
<svg viewBox="0 0 200 200" width="${size}" height="${size}" aria-label="Umbra Leachies">
  <circle cx="100" cy="100" r="82" fill="none" stroke="#2EE6A8" stroke-width="${stroke}"/>
  <line x1="100" y1="42" x2="100" y2="158" stroke="#2EE6A8" stroke-width="3"/>
  <g fill="#2EE6A8">
    <path d="M100 41 L104 47 L100 53 L96 47 Z"/><path d="M100 53.5 L106.4 60.5 L100 67.5 L93.6 60.5 Z"/>
    <path d="M100 66.4 L108 74 L100 81.6 L92 74 Z"/><path d="M100 79.5 L109.2 87.5 L100 95.5 L90.8 87.5 Z"/>
    <path d="M100 92.8 L110 101 L100 109.2 L90 101 Z"/><path d="M100 106.5 L109.2 114.5 L100 122.5 L90.8 114.5 Z"/>
    <path d="M100 120.4 L108 128 L100 135.6 L92 128 Z"/><path d="M100 134.5 L106.4 141.5 L100 148.5 L93.6 141.5 Z"/>
    <path d="M100 149 L104 155 L100 161 L96 155 Z"/>
  </g>
</svg>`;

/* Absolute URL of an animal record, wherever the site is hosted.
   Works on github.io, a custom domain, or a local file. */
function recordUrl(id) {
  const here = location.href.split(/[?#]/)[0];
  const base = here.replace(/\/(index|labels)\.html$/, '/').replace(/\/a\/[^/]*$/, '/');
  return new URL('a/' + id + '.html', base).href;
}

/* Dark modules on a jade plate, with the 4-module quiet zone scanners expect. */
function qrSvg(text, px) {
  const q = qrcode(0, 'M');
  q.addData(text);
  q.make();
  const n = q.getModuleCount(), b = 4, total = n + b * 2;
  let d = '';
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (q.isDark(r, c)) d += `M${c + b} ${r + b}h1v1h-1z`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}"
    width="${px}" height="${px}" shape-rendering="crispEdges" role="img"
    aria-label="QR code linking to this record">
    <path fill="#2EE6A8" d="M0 0h${total}v${total}H0z"/>
    <path fill="#080D0E" d="${d}"/></svg>`;
}

function ageFrom(iso) {
  if (!iso) return '—';
  const d = new Date(iso + 'T00:00:00'), t = new Date();
  let y = t.getFullYear() - d.getFullYear();
  let m = t.getMonth() - d.getMonth();
  if (t.getDate() < d.getDate()) m--;
  if (m < 0) { y--; m += 12; }
  return `${y}y ${m}m`;
}

function latestWeight(a) {
  if (!a.weights || !a.weights.length) return null;
  return a.weights[a.weights.length - 1];
}

function header(active) {
  const up = location.pathname.includes('/a/') ? '../' : '';
  return `
  <div class="masthead">
    ${MARK(44, 11)}
    <div class="names">
      <div class="wordmark">UMBRA<small>LEACHIES</small></div>
    </div>
    <div class="zh">玄影</div>
  </div>
  <nav>
    <a href="${up}index.html" class="${active === 'collection' ? 'on' : ''}">Collection</a>
    <a href="${up}snakes.html" class="${active === 'snakes' ? 'on' : ''}">Hognose</a>
    <a href="${up}breeding.html" class="${active === 'breeding' ? 'on' : ''}">Breeding</a>
    <a href="${up}labels.html" class="${active === 'labels' ? 'on' : ''}">Labels</a>
  </nav>`;
}

function footer() {
  return `<footer>
    <div class="zhf">玄影</div>
    <div class="f">UMBRA LEACHIES · Rhacodactylus leachianus · Hong Kong</div>
  </footer>`;
}

/* ---------------- record page ---------------- */
function renderRecord(id) {
  const snake = id.startsWith('HOG');
  const src = snake ? SNAKES : COLLECTION;
  const a = src.find(x => x.id === id);
  if (a && snake) { a.lineage = a.morph; a.locality = 'Heterodon nasicus'; a.provenance = ''; }
  const root = document.getElementById('app');
  if (!a) { root.innerHTML = header() + '<h1 class="page">Record not found</h1>' + footer(); return; }

  document.title = `${a.id} · ${a.lineage} — UMBRA LEACHIES`;

  const w = latestWeight(a);
  let rows = '';
  if (a.weights.length) {
    let prev = null;
    rows = a.weights.map(([d, g]) => {
      const diff = prev === null ? '—' : (g - prev >= 0 ? '+' : '') + (g - prev).toFixed(1);
      prev = g;
      return `<tr><td>${d}</td><td class="n">${g.toFixed(1)}</td><td class="n gain">${diff}</td></tr>`;
    }).join('');
    rows = `<table><tr><th>Date</th><th style="text-align:right">Weight (g)</th>
            <th style="text-align:right">Change</th></tr>${rows}</table>`;
  } else {
    rows = '<p class="muted" style="margin-top:12px">No weigh-ins recorded yet.</p>';
  }

  const reg = a.registry
    ? (a.registryUrl
        ? `<dd class="och"><a href="${a.registryUrl}" rel="noopener">${a.registry}</a></dd>`
        : `<dd class="och">${a.registry}</dd>`)
    : '<dd class="muted">—</dd>';

  root.innerHTML = header(snake ? 'snakes' : 'collection') + `
    <div class="record-head">
      <div style="flex:1;min-width:220px">
        <span class="rid">${a.id}</span><span class="rsex">${a.sex}</span>
        <div class="rlin">${a.lineage}</div>
        <div class="rtr">${a.traits}</div>
      </div>
      <div class="qrbox">${qrSvg(recordUrl(a.id), 102)}</div>
    </div>

    <section>
      <div class="eyebrow">Record</div>
      <dl class="facts">
        <dt>Laid</dt><dd>${a.laid || '—'}</dd>
        <dt>Hatched</dt><dd>${a.hatched || '—'}</dd>
        <dt>Age</dt><dd>${ageFrom(a.hatched)}</dd>
        <dt>Sex</dt><dd>${a.sex} ${a.sex === '1.0' ? '(male)' : a.sex === '0.1' ? '(female)' : ''}</dd>
        <dt>Locality</dt><dd>${a.locality}</dd>
        <dt>Weight</dt><dd>${w ? w[1].toFixed(1) + ' g · ' + w[0] : '—'}</dd>
        <dt>Bred by</dt><dd>${a.provenance || 'Not recorded'}</dd>
        <dt>Registry</dt>${reg}
      </dl>
      ${a.notes ? `<p class="muted" style="margin-top:16px">${a.notes}</p>` : ''}
    </section>

    <section>
      <div class="eyebrow">Weight history</div>
      ${rows}
    </section>

    <a class="backlink" href="${snake ? '../snakes.html' : '../index.html'}">← ${snake ? 'Hognose' : 'Collection'}</a>
  ` + footer();
}

/* ---------------- collection index ---------------- */
function renderIndex() {
  const cards = COLLECTION.map(a => {
    const w = latestWeight(a);
    return `<a class="card" href="a/${a.id}.html">
      <span class="cid">${a.id}</span><span class="csex">${a.sex}</span>
      <div class="clin">${a.lineage}</div>
      <div class="ctr">${a.traits}</div>
      <div class="cmeta"><span>H <b>${a.hatched}</b></span>
        <span>${w ? '<b>' + w[1].toFixed(0) + ' g</b>' : '—'}</span></div>
    </a>`;
  }).join('');

  document.getElementById('app').innerHTML = header('collection') + `
    <h1 class="page">Collection</h1>
    <p class="muted">${COLLECTION.length} Rhacodactylus leachianus.
    Each record carries lineage, laid and hatched dates, and the full weigh-in history.
    Every enclosure label points here.</p>
    <div class="grid">${cards}</div>
  ` + footer();
}

/* ---------------- breeding ---------------- */
function renderBreeding() {
  const rows = CLUTCHES.map(c => `<tr>
      <td>${c.id}</td><td>${c.dam}</td><td>${c.laid}</td>
      <td>${c.eggs || '—'}</td><td>${c.hatched || '—'}</td></tr>`).join('');

  const inc = COLLECTION.filter(a => a.laid && a.hatched).map(a => {
    const d = Math.round((new Date(a.hatched) - new Date(a.laid)) / 86400000);
    return { id: a.id, lin: a.lineage, d };
  }).sort((x, y) => x.d - y.d);
  const days = inc.map(i => i.d);
  const med = days.length % 2 ? days[(days.length - 1) / 2]
    : (days[days.length / 2 - 1] + days[days.length / 2]) / 2;

  document.getElementById('app').innerHTML = header('breeding') + `
    <h1 class="page">Breeding</h1>
    <p class="muted">Melanism behaves as a simple recessive. A visual animal
    (本影) carries two copies; a het (半影) carries one and shows nothing.</p>

    <section>
      <div class="eyebrow">Clutches</div>
      <table><tr><th>Clutch</th><th>Dam</th><th>Laid</th><th>Eggs</th><th>Hatched</th></tr>
      ${rows}</table>
      ${CLUTCHES.map(c => c.notes ? `<p class="muted" style="margin-top:12px">${c.id} — ${c.notes}</p>` : '').join('')}
    </section>

    <section>
      <div class="eyebrow">Incubation reference — observed in this collection</div>
      <table><tr><th>Animal</th><th>Lineage</th><th style="text-align:right">Days</th></tr>
      ${inc.map(i => `<tr><td>${i.id}</td><td>${i.lin}</td><td class="n">${i.d}</td></tr>`).join('')}
      <tr><td colspan="2"><b>Range ${days[0]}–${days[days.length - 1]} · median</b></td>
      <td class="n gain">${med}</td></tr></table>
      <p class="muted" style="margin-top:12px">Incubation is temperature-driven —
      cooler incubation lengthens it considerably, so treat the median as the opening
      of a window rather than a date.</p>
    </section>
  ` + footer();
}


/* ---------------- hognose ---------------- */
function renderSnakes() {
  const cards = SNAKES.map(a => {
    const w = latestWeight(a);
    return `<a class="card" href="a/${a.id}.html">
      <span class="cid">${a.id}</span><span class="csex">${a.sex}</span>
      <div class="clin">${a.name} · ${a.morph}</div>
      <div class="ctr">${a.traits}</div>
      <div class="cmeta"><span>H <b>${a.hatched}</b></span>
        <span>${w ? '<b>' + w[1].toFixed(0) + ' g</b>' : '—'}</span></div>
    </a>`;
  }).join('');

  document.getElementById('app').innerHTML = header('snakes') + `
    <h1 class="page">Hognose</h1>
    <p class="muted">${SNAKES.length} Heterodon nasicus. Fed on frozen-thawed mice,
    stepped up by weight rather than by calendar. Every offer is logged, taken or refused —
    a run of refusals is the earliest signal available.</p>
    <div class="grid">${cards}</div>
  ` + footer();
}
