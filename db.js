// Tutto il database (5.500 fighter con almeno 10 match): ricerca, dati caricati a pezzi, adattatore al formato di data.js.
// Serve dopo data.js e db/index.js. I dati di un fighter stanno in db/f_<prime 2 cifre dell'id>.js (FDB_PUT).
window.FDB = window.FDB || {};
window.FDB_PUT = recs => Object.assign(FDB, recs);
const fdbFile = id => `db/f_${id.slice(0, 2)}.js`;
const isDbId = id => /^[0-9a-f]{8}$/.test(id || '');
const figSrc = f => (f.db ? 'img/silhouette.svg' : `img/${f.id}.webp`);   // niente foto inventate: silhouette

// all'apertura: i fighter nell'URL si caricano subito (document.write funziona anche da file://, e blocca come un <script>)
function fdbPreload(ids) { ids.filter(isDbId).forEach(id => document.write(`<script src="${fdbFile(id)}"><\/script>`)); }
// più tardi (scelta dalla ricerca): script creato al volo
function fdbLoad(id) {
  if (byId(id) || FDB[id] || !isDbId(id)) return Promise.resolve(fdbGet(id));
  return new Promise((ok, ko) => {
    const s = document.createElement('script');
    s.src = fdbFile(id); s.onload = () => ok(fdbGet(id)); s.onerror = ko;
    document.head.append(s);
  });
}

// record compatto -> oggetto come quelli di FIGHTERS (una volta sola, poi sta in FIGHTERS e byId lo trova)
const FDB_G = {b: 'boxe', m: 'MMA', s: 'kickboxing', o: 'altro'};
const FDB_M = {K: 'KO/TKO', S: 'Sottomissione', D: 'Decisione', O: 'Metodo non registrato'};
function fdbGet(id) {
  if (!id) return null;
  const have = byId(id); if (have) return have;
  const r = FDB[id]; if (!r) return null;
  const [n, w, l, streak, kow, subw, kol, last] = r.st;
  const firstMain = (r.r.find(x => x[5] === r.g) || r.r[0])[6];
  let rp = null, ko = 0, sub = 0, dec = 0, loss = 0, draw = 0;
  const history = r.r.map(([d, opp, oppId, res, m, g, p]) => {
    if (g === r.g) rp = p;   // la montagna segue il rating dello sport principale; i match di altri sport tengono il valore
    if (res === 'W') { if (m === 'K') ko++; else if (m === 'S') sub++; else dec++; }
    else if (res === 'L') loss++; else if (res === 'D') draw++;
    const [Y, M, D] = d.split('-');
    return {opp, oppId, date: `${M}/${Y}`, dd: `${D}/${M}`, year: +Y, res, rp: rp == null ? firstMain : rp, key: true, yearEst: false,
            method: (res === 'D' ? 'Pareggio' : FDB_M[m]) + (g !== r.g ? ` · ${FDB_G[g]}` : '')};
  });
  const b = String(r.b || '').split('-');
  const f = {id, db: true, name: r.n, nick: r.k || [r.s, r.c].filter(Boolean).join(' · '), sport: r.s, flags: [], look: 'C',
             ko, sub, dec, loss, draw, cm: r.h || null, born: b.length === 3 ? `${b[2]}·${b[1]}·${b[0]}` : '', place: r.c, stance: '',
             history, os: {n, w, l, streak, kow, subw, kol, last, mu: r.mu, sigma: r.sg, gap: r.gap, height: r.h}};
  FIGHTERS.push(f);
  return f;
}

/* --- ricerca: senza accenti, nomi parziali; prima i nostri 8, poi per rating --- */
const fdbNorm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
let FDB_ROWS = null;
function fdbRows() {
  if (FDB_ROWS) return FDB_ROWS;
  const idx = window.FDB_INDEX || [], seen = new Set();
  const row = ([id, name, sport, rp, rec, country, n, alias, fem], cur) => ({id, name, sport, rp, rec, country, n, cur, fem: fem === 'f',
    hay: fdbNorm(`${name} ${alias || ''}`)});
  const ours = FIGHTERS.filter(f => !f.db).map(f => {
    const x = idx.find(r => r[0] === f.id), H = f.history || [];
    seen.add(f.id);
    return row(x ? [f.id, f.name, f.sport, x[3], x[4], x[5] || f.place, x[6], `${x[1]}|${x[7]}|${f.nick}`]
      : [f.id, f.name, f.sport, H.length ? H[H.length - 1].rp : 1000, `${wins(f)}-${f.loss}`, f.place, H.length, f.nick], true);
  });
  FDB_ROWS = ours.concat(idx.filter(r => !seen.has(r[0])).map(r => row(r, false)));
  return FDB_ROWS;
}
function fdbSearch(q, max = 8) {
  const t = fdbNorm(q).split(' ').filter(Boolean);
  if (!t.length) return [];
  const out = [];
  for (const r of fdbRows()) if (t.every(x => r.hay.includes(x))) { out.push(r); if (!r.cur && out.length >= max + 8) break; }
  return out.sort((a, b) => b.cur - a.cur || b.rp - a.rp).slice(0, max);
}
// avversario di un registro senza id: nome uguale e senza omonimi nell'indice
let FDB_NAMES = null;
function fdbIdByName(name) {
  if (!FDB_NAMES) {
    FDB_NAMES = new Map();
    fdbRows().forEach(r => { const k = fdbNorm(r.name); FDB_NAMES.set(k, FDB_NAMES.has(k) ? null : r.id); });
  }
  return FDB_NAMES.get(fdbNorm(name)) || '';
}

/* --- tendina dei suggerimenti: href(id) = link alla scheda, oppure pick(id) = scelta senza cambiare pagina --- */
document.head.insertAdjacentHTML('beforeend', `<style>
.fdbsug{position:absolute;left:0;right:0;top:calc(100% + 2px);z-index:40;margin:0;padding:0;list-style:none;background:#0B0B0B;border:2px solid #F2F0EB;max-height:min(420px,60vh);overflow-y:auto;text-align:left}
.fdbsug[hidden]{display:none}
input[type=search]::-webkit-search-cancel-button{-webkit-appearance:none;appearance:none}
.fdbsug li{display:flex;align-items:stretch;border-bottom:1px solid #2a2a2a}
.fdbsug .go{flex:1;min-width:0;display:grid;grid-template-columns:1fr auto;gap:2px 12px;align-items:baseline;padding:10px 14px;min-height:52px;color:#F2F0EB;text-decoration:none;background:none;border:0;cursor:pointer;text-align:left;font:inherit}
.fdbsug .go b{font:400 20px/1.1 Anton,sans-serif;text-transform:uppercase;letter-spacing:.01em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.fdbsug .go i{font:italic 400 22px/1 "Instrument Serif",serif;color:#E10600;text-align:right}
.fdbsug .go small{grid-column:1/-1;font:600 10px/1.3 "IBM Plex Mono",monospace;letter-spacing:.12em;text-transform:uppercase;color:#8C8A86}
.fdbsug .go small em{font-style:normal;color:#E10600}
.fdbsug .vs{display:grid;place-items:center;min-width:56px;border-left:1px solid #2a2a2a;color:#F2F0EB;text-decoration:none;font:400 16px Anton,sans-serif;text-transform:uppercase}
.fdbsug li.on .go,.fdbsug .go:hover,.fdbsug .vs:hover{background:#1a1a1a}
.fdbsug li.on{box-shadow:inset 4px 0 0 #E10600}
.fdbsug .none{padding:14px;font:600 11px "IBM Plex Mono",monospace;letter-spacing:.12em;text-transform:uppercase;color:#8C8A86}
.navfind{position:relative;display:inline-flex}
.navfind input{width:170px;background:#0B0B0B;color:#F2F0EB;border:1.5px solid #8C8A86;font:600 11px "IBM Plex Mono",monospace;letter-spacing:.1em;padding:0 10px;min-height:40px}
.navfind input:focus-visible{outline:3px solid #F2F0EB;outline-offset:2px}
.navfind .fdbsug{left:auto;width:min(360px,92vw)}
@media (max-width:600px){.navfind .fdbsug{right:auto;left:0;width:calc(100vw - 32px)}}
</style>`);
const fdbMeta = r => [r.sport, r.country, `${r.rec}`, `${r.n} match`].filter(Boolean).map(esc).join(' · ') + (r.cur ? ' · <em>Roster</em>' : '');
function fdbAutocomplete(input, {href, pick, vs, max = 8}) {
  const box = input.parentElement;
  if (getComputedStyle(box).position === 'static') box.style.position = 'relative';
  const ul = Object.assign(document.createElement('ul'), {className: 'fdbsug', hidden: true, id: input.id + '_sug'});
  ul.setAttribute('role', 'listbox');
  box.append(ul);
  input.setAttribute('role', 'combobox'); input.setAttribute('aria-autocomplete', 'list'); input.setAttribute('aria-controls', ul.id);
  input.setAttribute('aria-expanded', 'false'); input.autocomplete = 'off';
  let res = [], at = -1;
  const open = on => { ul.hidden = !on; input.setAttribute('aria-expanded', String(on)); };
  const mark = i => { at = i; [...ul.children].forEach((li, k) => li.classList.toggle('on', k === i));
    if (ul.children[i]) { ul.children[i].scrollIntoView({block: 'nearest'}); input.setAttribute('aria-activedescendant', ul.children[i].id); } };
  const choose = r => { if (!r) return; open(false); if (pick) { input.value = ''; pick(r.id); } else location.href = href(r.id); };
  const draw = () => {
    res = fdbSearch(input.value, max); at = -1;
    if (!input.value.trim()) { open(false); return; }
    ul.innerHTML = res.length ? res.map((r, i) => `<li role="option" id="${ul.id}_${i}">${pick
      ? `<button type="button" class="go" data-i="${i}" tabindex="-1">` : `<a class="go" href="${href(r.id)}" tabindex="-1">`}<b>${esc(r.name)}</b><i>${r.rp}</i><small>${fdbMeta(r)}</small>${pick ? '</button>' : '</a>'}${vs
      ? `<a class="vs" href="${vs(r.id)}" tabindex="-1" aria-label="${esc(r.name)} sul cartellone">VS</a>` : ''}</li>`).join('')
      : '<li class="none">Nessuno con questo nome</li>';
    open(true);
  };
  input.addEventListener('input', draw);
  input.addEventListener('focus', () => { if (input.value.trim()) draw(); });
  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (ul.hidden) draw(); const n = res.length; if (n) mark((at + (e.key === 'ArrowDown' ? 1 : -1) + n) % n); }
    else if (e.key === 'Enter' && !ul.hidden && res.length) { e.preventDefault(); choose(res[Math.max(at, 0)]); }
    else if (e.key === 'Escape') open(false);
  });
  ul.addEventListener('mousedown', e => e.preventDefault());   // il clic non toglie il focus prima di scegliere
  ul.addEventListener('click', e => { const b = e.target.closest('button.go'); if (b) choose(res[+b.dataset.i]); });
  input.addEventListener('blur', () => setTimeout(() => open(false), 120));
  return {first: () => fdbSearch(input.value, 1)[0], choose};
}

// nella nav di ogni pagina: link alla directory + campo di ricerca
(() => {
  const links = document.querySelector('nav .links');
  if (!links) return;
  const here = /tutti\.html$/.test(location.pathname);
  const a = Object.assign(document.createElement('a'), {href: 'tutti.html', textContent: 'Tutti i fighter'});
  if (here) a.setAttribute('aria-current', 'page');
  const before = links.querySelector('.spoilerbtn, select, label');
  links.insertBefore(a, before);
  if (here || document.getElementById('q')) return;   // la home ha già la ricerca grande
  const s = document.createElement('span');
  s.className = 'navfind';
  s.innerHTML = '<label for="navq" style="position:absolute;left:-9999px">Cerca un fighter</label><input id="navq" type="search" placeholder="Cerca fighter…">';
  links.insertBefore(s, before);
  fdbAutocomplete(s.querySelector('input'), {href: id => `carriera.html?f=${id}`});
})();
