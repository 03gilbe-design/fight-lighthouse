// Poster a tutta larghezza, uno per pagina, come pausa tra due sezioni. Dati veri da data.js / records.js / ratings.js.
// Immagini in img/poster (prep_poster.py, fonti in img/poster/FONTI.txt). Niente fetch: il sito gira anche da file://.
(() => {
  const P = 'img/poster/';
  const HT = new Set(['debuttante', 'vlad', 'ali', 'tyson', 'floyd', 'khabib', 'fedor', 'topuria']);   // retini pronti
  const CREAM = new Set(['vlad', 'tyson', 'khabib', 'topuria']);                                         // scheda in carta crema
  const e = s => (typeof esc === 'function' ? esc(s) : String(s));
  const hash = s => [...String(s)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rng = seed => () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
  const H = f => (f && f.history) || [];
  const peak = f => Math.max(0, ...H(f).map(h => h.rp || 0));
  const cur = f => (H(f).slice(-1)[0] || {}).rp || '—';
  const rec = f => `${wins(f)}–${f.loss}${f.draw ? '–' + f.draw : ''}`;
  const sur = f => (typeof surname === 'function' ? surname(f) : f.name.split(' ').pop());
  const years = f => {
    const y = ((typeof RECORDS !== 'undefined' && RECORDS[f.id]) || H(f)).map(h => h.year || +(String(h.date).match(/(19|20)\d{2}/) || [])[0]).filter(Boolean);
    return y.length ? [Math.min(...y), Math.max(...y)] : null;
  };
  const lastBout = f => ((typeof RECORDS !== 'undefined' && RECORDS[f.id]) || H(f)).slice(-1)[0];
  const flagNames = f => (f.flags || []).map(c => (typeof FLAG_NAMES !== 'undefined' && FLAG_NAMES[c]) || c).join(' / ');

  let FS = 1380;   // font-size che rende l'altezza delle maiuscole Anton = 1000 unità (misurata sotto)
  const word = (t, k, front) => {
    const L = [...t.toUpperCase()];
    return `<svg class="flp__w${front ? ' flp__w--front' : ''}" style="--n:${L.length}" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">` +
      `<text x="0" y="1000" textLength="1000" lengthAdjust="spacingAndGlyphs" font-size="${FS}">` +
      L.map((c, i) => `<tspan${front && i !== k ? ' fill-opacity="0"' : ''}>${e(c)}</tspan>`).join('') + '</text></svg>';
  };
  const words = (t, k) => word(t, k) + '%FIG%' + word(t, k, true);

  // codice a barre: barre e spazi alternati, larghezze dal nome
  const barcode = s => {
    const r = rng(hash(s)); let x = 0, b = '', on = true;
    while (x < 128) { const w = 1 + Math.floor(r() * (on ? 3 : 2.4)); if (on) b += `<rect x="${x}" width="${w}" height="28"/>`; x += w; on = !on; }
    const n = String(hash(s + '#')).padStart(10, '0').slice(0, 10);
    return `<svg class="flp__bc" viewBox="0 0 130 28" preserveAspectRatio="none" aria-hidden="true">${b}</svg><span>${n.slice(0, 1)} ${n.slice(1, 6)} ${n.slice(6)}</span>`;
  };

  // logotipo a pixel con glitch: testo disegnato piccolo su canvas, ogni pixel diventa un quadrato, alcune righe slittano
  const pixel = (text, rows = 13, cls = 'flp__glitch') => {
    const c = document.createElement('canvas'), x = c.getContext('2d'), font = `900 ${rows}px Archivo, sans-serif`;
    x.font = font;
    const w = Math.ceil(x.measureText(text).width) + 2, h = Math.ceil(rows * 1.02);
    c.width = w; c.height = h; x.font = font; x.fillText(text, 1, Math.round(rows * .84));
    const d = x.getImageData(0, 0, w, h).data, r = rng(hash(text));
    let main = '', ghost = '', shift = 0;
    for (let y = 0; y < h; y++) {
      if (y % 2 === 0) shift = r() < .22 ? Math.round((r() - .5) * 7) : 0;
      const dup = r() < .14;
      for (let i = 0; i < w; i++) {
        if (d[(y * w + i) * 4 + 3] < 110) continue;
        let j = i; while (j + 1 < w && d[(y * w + j + 1) * 4 + 3] >= 110) j++;
        main += `<rect x="${i + shift}" y="${y}" width="${j - i + 1}" height="1"/>`;
        if (dup) ghost += `<rect x="${i + shift + 4}" y="${y}" width="${j - i + 1}" height="1"/>`;
        i = j;
      }
    }
    for (let k = 0; k < 14; k++) main += `<rect x="${Math.floor(r() * w)}" y="${Math.floor(r() * h)}" width="${1 + Math.floor(r() * 3)}" height="1"/>`;
    return `<svg class="flp__px ${cls}" viewBox="-6 0 ${w + 12} ${h}" role="img" aria-label="${e(text)}"><g opacity=".38">${ghost}</g><g>${main}</g></svg>`;
  };

  const marks = (reg = 'ml mr') => ['tl', 'tr', 'bl', 'br'].map(p => `<i class="flp__x ${p}"></i>`).join('') + reg.split(' ').map(p => `<i class="flp__x reg ${p}"></i>`).join('');
  const fig = (src, o = {}) => `<img class="flp__fig${o.cls ? ' ' + o.cls : ''}" src="${src}" alt="" decoding="async" style="--fx:${o.x || '50%'};${o.h ? '--fh:' + o.h + ';' : ''}--sx:${o.flip ? -1 : 1}">`;
  const mc = (title, ...lines) => `<div class="flp__mc"><b>${e(title)}</b>${lines.filter(Boolean).map(l => e(l)).join('<br>')}</div>`;
  const fighterImg = f => (f.db || f.id === undefined ? null : `img/${f.id}.webp`);

  function mount(html, cls, anchors, label, vars = '') {
    const at = anchors.map(s => document.querySelector(s)).find(Boolean);
    if (!at) return null;
    let s = document.querySelector('section.flp');
    if (!s) { s = document.createElement('section'); at.insertAdjacentElement('beforebegin', s); }
    s.className = 'flp ' + cls; s.setAttribute('aria-label', label); s.setAttribute('style', vars);
    s.innerHTML = html;
    return s;
  }

  /* ---------- home: FIGHT, il match del giorno ---------- */
  function home() {
    const a = byId('ali'), b = byId('tyson'); if (!a || !b) return;
    const ra = (typeof RECORDS !== 'undefined' && RECORDS[a.id]) || [], rb = new Set(((typeof RECORDS !== 'undefined' && RECORDS[b.id]) || []).map(r => r.opp));
    const common = [...new Set(ra.map(r => r.opp).filter(o => rb.has(o)))];
    const now = new Date(), doy = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 864e5);
    const side = f => mc(f.name, f.nick, `${rec(f)} · ${f.ko} KO`, `${f.cm} cm · ${f.place}`, `picco OpenSkill ${peak(f)}`);
    const html = words('FIGHT', 1).replace('%FIG%',
      fig(`img/${a.id}.webp`, {x: '31%', h: '91%', flip: typeof faceTo === 'function' && faceTo(a, 'R')}) +
      fig(`img/${b.id}.webp`, {x: '69%', h: '91%', flip: typeof faceTo === 'function' && faceTo(b, 'L')})) +
      `<div class="flp__top"><span>Il match di oggi · mai successo</span><span>N° ${doy} / ${now.getFullYear()}</span></div>` +
      `<div class="flp__side">${e(a.nick)} contro ${e(b.nick)} · ${e(a.sport)} · pesi massimi</div>` +
      `<div class="flp__side r">Fight Lighthouse® · rating OpenSkill su 148.000 incontri</div>` +
      `<div class="flp__bot">${side(a)}${mc('Avversari in comune', common.length ? common.join(', ') : 'nessuno', `${ra.length} + ${rb.size} match registrati`)}` +
      `<div class="flp__mc hide-s">${pixel('FL', 16, '')}<br>${barcode(a.id + b.id)}</div>${side(b)}</div>` + marks();
    const s = mount(html, 'flp--home', ['#roster', '#oggi'], `Poster: ${a.name} contro ${b.name}`);
    if (s) s.querySelector('.flp__bot .flp__px').style.width = '112px';
  }

  /* ---------- scheda: il cognome gigante ---------- */
  function scheda() {
    const qs = new URLSearchParams(location.search), id = qs.get('f') || qs.get('db');
    const f = (typeof fdbGet === 'function' && fdbGet(id)) || byId(id) || byId('topuria'); if (!f) return;
    const S = sur(f).toUpperCase(), n = [...S].length, k = Math.floor((n - 1) / 2);
    const cream = f.db ? hash(f.id) % 2 === 1 : CREAM.has(f.id);
    const yy = years(f), lb = lastBout(f), idx = FIGHTERS.indexOf(f) + 1;
    const src = cream ? (HT.has(f.id) ? `${P}ht_${f.id}.webp` : `${P}ht_gerome.webp`) : (fighterImg(f) || `${P}reni_cut.webp`);
    const cls = cream ? 'dots' : (f.db ? 'paint' : '');
    const bot = mc('Record', rec(f), `${f.ko} KO · ${f.sub} sub · ${f.dec} dec`) +
      mc('Rating OpenSkill', `picco ${peak(f)}`, `ultimo ${cur(f)}`) + (cream ? '<div class="hide-s"></div>' : '') +
      mc('Nato', f.born || '—', f.place || '') +
      (lb ? mc('Ultimo match', `contro ${lb.opp}`, lb.date + (yy ? ` · carriera ${yy[0]}–${yy[1]}` : '')) : '');
    let html = words(S, k).replace('%FIG%', fig(src, {cls, h: cream ? '80%' : '88%'})) +
      `<div class="flp__top"><span>Scheda N° ${String(idx).padStart(3, '0')} · ${e(f.sport)}</span><span>${e(flagNames(f) || f.place || '')}</span></div>` +
      `<div class="flp__side">${e(f.name)} · ${e(f.nick || '')} · ${e(f.stance || f.sport)}</div>` +
      `<div class="flp__bot">${bot}</div>` + marks();
    if (cream) html += `<div class="flp__tag"><span class="flp__dot"></span>${e(f.nick || f.sport)}<br><s>${f.loss ? f.loss + ' sconfitte' : 'imbattuto'}</s></div>` +
      `<div class="flp__big"><span>${e(rec(f))}</span>${f.sport === 'MMA' ? 'mma.' : e(String(f.sport).toLowerCase()) + '.'}</div>`;
    const s = mount(html, cream ? 'flp--cream flp--scheda' : 'flp--red flp--scheda', ['#natSec', '#yearSec', '#ledgerSec'], `Poster: ${f.name}`,
      cream ? '--wt:4%;--hk:.5' : '');
    if (s && f.db && !cream) s.querySelector('.flp__fig').style.setProperty('--fade', '30%');
  }

  /* ---------- cartellone: SFIDA, rosso e nero, VM 18 ---------- */
  let pair = '';
  function cartellone() {
    const qs = new URLSearchParams(location.search), v = id => (document.getElementById(id) || {}).value;
    const a = byId(v('f1') || qs.get('f1') || 'ali'), b = byId(v('f2') || qs.get('f2') || 'tyson'); if (!a || !b) return;
    if (pair === a.id + '|' + b.id) return; pair = a.id + '|' + b.id;
    const fa = typeof faceTo === 'function' && faceTo(a, 'R'), fb = typeof faceTo === 'function' && faceTo(b, 'L');
    const imgA = fighterImg(a) || `${P}reni_cut.webp`, imgB = fighterImg(b) || `${P}gerome_cut.webp`;
    const side = (f, c) => mc(`Angolo ${c} · ${f.name}`, `${rec(f)} · ${f.cm ? f.cm + ' cm' : '—'}`, `picco ${peak(f)}`, f.place || '');
    const html = '<div class="flp__under"></div>' + words('SFIDA', 1).replace('%FIG%',
      fig(imgA, {x: '33%', flip: fa, cls: a.db ? 'paint' : ''}) + fig(imgB, {x: '67%', flip: fb, cls: b.db ? 'paint' : ''})) +
      `<div class="flp__top"><span>Cartellone · match mai avvenuto</span><span>Rosso ${e(sur(a))} — Blu ${e(sur(b))}</span></div>` +
      `<div class="flp__vm"><i>VM18</i><div><strong>Vietato ai deboli di cuore</strong>Il pronostico esce da un albero di decisione allenato su 118.000 match fino al 2018.</div></div>` +
      pixel(`${sur(a)} × ${sur(b)}`.toUpperCase(), 12) +
      `<div class="flp__bot">${side(a, 'rosso')}<div class="flp__mc hide-s">${barcode(pair)}</div><div class="hide-s"></div>${side(b, 'blu')}</div>` +
      marks() + '<span class="flp__ar" style="left:34px;top:calc(var(--H) * .5)">↘</span><span class="flp__ar" style="right:34px;top:40px">↙</span>';
    mount(html, 'flp--war', ['#commonSec', '#predSec', '#arenaSec'], `Poster: ${a.name} contro ${b.name}`, '--wt:4%;--hk:.48');
  }

  /* ---------- classifiche: BOXE/MMA in crema, il primo a retino ---------- */
  function classifica() {
    const L = FIGHTERS.filter(f => !f.db && H(f).length).map(f => ({f, v: peak(f)})).sort((x, y) => y.v - x.v);
    if (!L.length) return;
    const t = L[0].f, W = t.sport === 'MMA' ? 'MMA' : 'BOXE';
    const src = HT.has(t.id) ? `${P}ht_${t.id}.webp` : `${P}ht_gerome.webp`;
    const html = words(W, W.length - 2).replace('%FIG%', fig(src, {cls: 'dots', h: '84%'})) +
      `<div class="flp__top"><span>Classifica per picco OpenSkill</span><span>${L.length} fighter in scheda</span></div>` +
      `<div class="flp__tag"><span class="flp__dot"></span>${e(t.name)}<br><s>${t.loss ? t.loss + ' sconfitte' : 'imbattuto'}</s></div>` +
      `<div class="flp__big"><span>n°1</span>${L[0].v}.</div>` +
      `<div class="flp__bot"><div class="hide-s"></div><div class="hide-s"></div><div class="hide-s"></div>` +
      mc('Dietro di lui', ...L.slice(1, 4).map((x, i) => `${i + 2}° ${x.f.name} · ${x.v}`)) +
      mc(`${t.nick}`, `${rec(t)} · ${t.ko} KO`, `${t.place}`) + '</div>' + marks('');
    mount(html, 'flp--cream flp--rank', ['section.sec:nth-of-type(2)', 'section.fights'], `Poster: ${t.name}, primo in classifica`, '--wt:4%;--hk:.5');
  }

  /* ---------- eventi: Arbo che sfuma nel rosso, la data della serata più recente ---------- */
  function eventi() {
    if (typeof allEvents !== 'function') return;
    const EV = allEvents(); if (!EV.length) return;
    const ev = EV[0], first = EV[EV.length - 1];
    const html = '<div class="flp__plate"></div>' +
      `<div class="flp__top"><span>La serata più recente</span><span>${e(ev.place)}</span></div>` +
      `<span class="flp__label" style="left:50%;transform:translateX(-50%);top:calc(56% - 4px);color:#F2F0EB;white-space:nowrap">${e(ev.name)} · ${e(ev.sport)}</span>` +
      pixel(`${ev.dd}.${ev.mm}.${ev.year}`, 13) +
      `<div class="flp__side r" style="color:#F2F0EB">Åsgårdsreien · la caccia selvaggia di Odino</div>` +
      `<div class="flp__bot">${mc('In cartellone', ...ev.bouts.slice(0, 3).map(b => `${sur(b.f)} contro ${b.h.opp}`))}` +
      mc('Archivio', `${EV.length} serate`, `dalla prima: ${first.dd}/${first.mm}/${first.year}`) +
      `<div class="flp__mc hide-s">${barcode(ev.iso + ev.name)}</div>` +
      mc('Dipinto', 'Peter Nicolai Arbo', 'Åsgårdsreien, 1872', 'pubblico dominio') + '</div>' + marks();
    mount(html, 'flp--paint', ['section.sec'], `Poster: ${ev.name}, ${ev.dd}/${ev.mm}/${ev.year}`);
  }

  /* ---------- parallax leggero sulla figura ---------- */
  function parallax() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let busy = false;
    const run = () => {
      busy = false;
      document.querySelectorAll('section.flp').forEach(s => {
        const r = s.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
        const t = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        s.querySelectorAll('.flp__fig').forEach(i => i.style.setProperty('--py', (t * 46).toFixed(1) + 'px'));
        const p = s.querySelector('.flp__plate'); if (p) p.style.setProperty('--py', (t * -60).toFixed(1) + 'px');
      });
    };
    addEventListener('scroll', () => { if (!busy) { busy = true; requestAnimationFrame(run); } }, {passive: true});
    run();
  }

  function render() {
    const page = location.pathname.split('/').pop() || 'index.html';
    const R = {'index.html': home, 'carriera.html': scheda, 'elementi.html': cartellone, 'classifiche.html': classifica, 'eventi.html': eventi}[page];
    if (!R || typeof FIGHTERS === 'undefined') return;
    R();
    if (page === 'elementi.html') ['change', 'click'].forEach(t => document.addEventListener(t, () => setTimeout(cartellone, 0)));
    parallax();
  }

  // prima i font (la parola e il pixel dipendono dalle metriche), poi il poster; massimo 1,5 s di attesa
  const fonts = document.fonts ? Promise.race([Promise.all(['400 100px Anton', '900 13px Archivo', '600 9px "IBM Plex Mono"'].map(f => document.fonts.load(f))),
    new Promise(ok => setTimeout(ok, 1500))]) : Promise.resolve();
  fonts.then(() => {
    const x = document.createElement('canvas').getContext('2d'); x.font = '400 1000px Anton';
    const m = x.measureText('HEFT').actualBoundingBoxAscent; if (m > 300) FS = Math.round(1e6 / m);
    render();
  });
})();
