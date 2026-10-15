// Funzioni aggiunte: motivazioni del rating (carriera), avversari suggeriti (cartellone),
// eventi raggruppati (eventi.html), scorciatoia "/" ed Esc. Si appoggia a data.js senza toccarlo.

document.head.insertAdjacentHTML('beforeend', `<style>
.why{font:600 10px "IBM Plex Mono";letter-spacing:.08em;text-transform:uppercase;color:var(--grey,#8C8A86);white-space:nowrap}
.why b{font:italic 400 18px "Instrument Serif";letter-spacing:0;text-transform:none;color:#F2F0EB;margin-right:8px}
.why b.neg{color:#E10600}
.why small{display:block;margin-top:3px;color:#E10600;font-size:9px}
.suggest{display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px;padding-top:18px;padding-bottom:18px;border-bottom:1px solid #333}
.suggest .k{font:600 11px "IBM Plex Mono";letter-spacing:.2em;text-transform:uppercase;color:#8C8A86}
.suggest .k b{color:#F2F0EB;font-weight:600}
.suggest button{display:inline-flex;align-items:center;gap:10px;background:transparent;color:#F2F0EB;border:1.5px solid #333;padding:0 14px;min-height:44px;cursor:pointer;font:400 20px Anton;text-transform:uppercase;letter-spacing:.02em}
.suggest button i{font:italic 400 18px "Instrument Serif";color:#8C8A86;text-transform:none}
.suggest button:hover,.suggest button[aria-pressed="true"]{border-color:#E10600}
.suggest button[aria-pressed="true"] i{color:#E10600}
</style>`);

// ---------- 0. Varianti dei testi fissi: una a caso a ogni caricamento ----------
// data-var="chiave" → textContent; data-var-attr="placeholder" → quell'attributo; data-var-rot → ruota ogni 8 s.
// Nei testi creati da JS: pickVar("chiave", "testo di riserva"). Il primo di ogni lista e' il testo originale.
const VARIANTS = {
  // home
  "hero.payoff": ["E tutti quelli che non succederanno mai.", "E quelli mai messi in calendario.", "E quelli rimasti chiacchiere da bar.", "E quelli che le epoche non hanno permesso.", "E tutti quelli che restano da sognare."],
  "hero.label": ["Cerca un fighter e mettilo sul cartellone", "Scegli un nome e portalo sul ring", "Trova il tuo fighter e dagli un avversario", "Scrivi un nome, al resto pensa il cartellone", "Un nome, un angolo, un cartellone"],
  "hero.ph": ["Muhammad Ali…", "Mike Tyson…", "Khabib Nurmagomedov…", "Floyd Mayweather…", "Ilia Topuria…"],
  "hero.notfound": ["Non in archivio: prova Ali, Tyson…", "Nessuno con quel nome: prova Ali, Tyson…", "Mai passato di qui: prova Ali, Tyson…", "Non è in archivio: prova Tyson, Ali…"],
  "hero.watch": ["Da guardare stasera", "Stasera si guarda", "In programma stasera", "Da rivedere stasera", "Per stasera"],
  "dream.k": ["Il match di oggi · mai successo", "Il match di oggi · mai combattuto", "Oggi in cartellone · mai successo", "Match del giorno · solo qui"],
  "dream.p": ["Mai incrociati sul ring. Hanno affrontato due avversari in comune: Larry Holmes e Trevor Berbick.", "Mai sullo stesso ring. In comune hanno due avversari: Larry Holmes e Trevor Berbick.", "Mai uno contro l'altro. Due nomi li collegano: Larry Holmes e Trevor Berbick.", "Non si sono mai affrontati. Ma Larry Holmes e Trevor Berbick li hanno visti tutti e due."],
  "dream.cta": ["Falli combattere →", "Suona la campana →", "Mandali al centro →", "Apri il cartellone →"],
  "guarda.em": ["oggi, uno per sport", "uno per disciplina", "quattro sport, quattro serate", "uno per ogni sport"],
  "guarda.p": ["Quattro incontri con il video: tocca l'anteprima per guardarlo. Il risultato resta coperto finché non lo scopri tu.", "Quattro incontri da rivedere: tocca l'anteprima e parte il video. Il risultato lo scopri solo se vuoi.", "Quattro serate, quattro video. Tocca l'anteprima per guardarle; il risultato resta coperto finché non lo chiedi.", "Quattro incontri con il video. Il risultato è coperto: lo scopri tu, quando vuoi."],
  "reveal": ["Risultato nascosto · tocca per scoprirlo", "Risultato coperto · tocca per vederlo", "Esito nascosto · tocca per girarlo", "Com'è finita? · tocca per saperlo"],
  "video": ["Guarda il video", "Rivedilo", "Vai al video", "Il video"],
  "roster.em": ["di cosa sono fatti", "di che pasta sono", "di che materia sono", "cosa c'è sotto"],
  "roster.p": ["I tre cerchi in alto sono la loro natura: rosso KO, bianco sottomissioni, tratteggio ai punti. Tocca un fighter per portarlo nel cartellone.", "Rosso KO, bianco sottomissioni, tratteggio ai punti: i cerchi dicono come vincono. Tocca un fighter e va sul cartellone.", "Leggi i cerchi: rosso per i KO, bianco per le sottomissioni, tratteggio per i punti. Un tocco e il fighter sale sul cartellone.", "Tre cerchi a testa, grandi quanto le vittorie: rosso KO, bianco sottomissioni, tratteggio ai punti. Tocca un fighter per il cartellone."],
  // carriera
  "bio.em": ["secondo fonti attendibilissime", "da fonti verificatissime", "parola di fonti sicurissime", "fonti: fidatevi"],
  "bio.p": ["Dall'enciclopedia libera dai fatti.", "Fatti accertati, più o meno.", "Verificato con la massima approssimazione.", "Ogni riga controllata a occhio."],
  "nonci.em": ["la versione non ufficiale", "quella non autorizzata", "la versione da bar", "quella che non firmerebbe"],
  "mom.em": ["vittorie, sconfitte, pareggi", "le sue serate in foto", "com'è andata, in foto", "una foto per serata"],
  "mom.p": ["Le foto delle sue serate. In bianco e nero, a colori quando ci passi sopra.", "Una foto per serata. Bianco e nero finché non ci passi sopra.", "Le sue serate in foto: grigie a riposo, a colori sotto il cursore.", "Le sue notti sul ring. Il colore torna quando ci passi sopra."],
  "nat.em": ["come vince", "come chiude", "come le porta a casa", "come finisce i conti"],
  "nat.p": ["Area dei cerchi = numero di vittorie con quel metodo. Anello = tutti i match, tacche rosse = sconfitte.", "Più grande il cerchio, più vittorie con quel metodo. L'anello conta tutti i match; le tacche rosse sono le sconfitte.", "Ogni cerchio pesa quanto le vittorie con quel metodo. Intorno l'anello di tutti i match: rosse le sconfitte.", "Cerchi grandi quanto le vittorie per metodo. Anello: ogni match. Tacca rossa: una sconfitta."],
  "born.em": ["il punto di partenza", "dove è cominciato tutto", "prima del ring", "casa"],
  "born.p": ["La città di nascita sulla sagoma del suo paese.", "Dove è nato, sulla sagoma del suo paese.", "Un punto sulla mappa: la città dove è nato.", "La città natale, segnata sul suo paese."],
  "mount.em": ["match dopo match", "un match alla volta", "incontro dopo incontro", "serata dopo serata"],
  "year.em": ["quando ha combattuto", "quando è salito sul ring", "il calendario dei match", "gli anni sul ring"],
  "year.tail": ["Una colonna per anno, un pallino per match.", "Ogni colonna un anno, ogni pallino un match.", "Colonne per gli anni, pallini per i match.", "Un anno a colonna, un match a pallino."],
  "group.em": ["dove sta nel gruppo", "come si piazza", "in mezzo agli altri", "dove si colloca"],
  "ledger.em": ["quello che è successo", "match per match", "tutto, nero su bianco", "com'è andata davvero"],
  "lead.tail": ["Ogni pallino è un match.", "Un pallino per ogni match.", "Ogni pallino, una serata.", "Qui sotto, un pallino a match."],
  "lead.unbeaten": ["Mai battuto. Ogni pallino è una vittoria.", "Imbattuto. Un pallino per ogni vittoria.", "Zero sconfitte. Ogni pallino è una vittoria.", "Nessuno l'ha battuto. Ogni pallino, una vittoria."],
  "cta.career": ["Mettilo sul cartellone", "Trovagli un avversario", "Portalo sul ring", "Dagli un avversario"],
  // classifiche, eventi
  "rank.em": ["chi sta in cima", "chi comanda", "il piano di sopra", "chi guarda dall'alto"],
  "ev.em": ["le serate in cui c'erano", "le notti che hanno firmato", "dov'erano quella sera", "le loro serate"],
  "ev.order": ["dalla più recente", "a ritroso", "dall'ultima in giù", "dalla più vicina"],
  // cartellone
  "common.em": ["stessi rivali, risultati diversi", "chi li ha incrociati tutti e due", "gli stessi nomi sul cammino", "rivali condivisi"],
  "common.p": ["Dai record veri: chi hanno affrontato tutti e due, e come è andata a ciascuno.", "Record alla mano: chi hanno affrontato entrambi, e come è finita a ciascuno.", "Solo match veri: chi li ha incontrati tutti e due, e con che risultato.", "Dai record: gli avversari in comune, e cosa ne ha ricavato ciascuno."],
  "arena.em": ["le loro nature si scontrano", "elemento contro elemento", "cerchio contro cerchio", "KO contro KO, punti contro punti"],
  "arena.p": ["Ogni cerchio ha l'area del numero di vittorie con quel metodo. Premi \"Falli combattere\": ogni elemento va contro lo stesso elemento dell'altro, il più forte spinge, chi non ce l'ha viene attraversato.", "Ogni cerchio è grande quanto le vittorie con quel metodo. Con \"Falli combattere\" ogni elemento affronta il suo pari: il più forte spinge, chi non ce l'ha viene attraversato.", "L'area di ogni cerchio conta le vittorie con quel metodo. Premi \"Falli combattere\": KO contro KO, punti contro punti, il più forte spinge e il vuoto viene attraversato."],
  "nocommon": ["Nessun avversario in comune: due mondi che non si sono mai toccati.", "Zero avversari in comune: strade che non si sono mai incrociate.", "Nessun nome in comune. Due carriere parallele.", "Nessun rivale condiviso: due mondi separati."],
};
const pickVar = (k, fallback) => { const l = VARIANTS[k]; return l && l.length ? l[Math.floor(Math.random() * l.length)] : fallback; };
document.querySelectorAll("[data-var]").forEach(el => {
  const k = el.dataset.var, attr = el.dataset.varAttr, set = t => attr ? el.setAttribute(attr, t) : (el.textContent = t);
  set(pickVar(k, attr ? el.getAttribute(attr) : el.textContent));
  // ponytail: rotazione solo dove non si legge testo lungo (payoff hero); dissolvenza sul colore perche' l'opacity del titolo e' bloccata con !important
  if (el.hasAttribute("data-var-rot") && !matchMedia("(prefers-reduced-motion: reduce)").matches && VARIANTS[k].length > 1) {
    el.style.transition = "color .5s";
    setInterval(() => {
      el.style.color = "transparent";
      setTimeout(() => { let t; do t = pickVar(k); while (t === el.textContent); set(t); el.style.color = ""; }, 500);
    }, 8000);
  }
});

const peakOf = f => (f.history && f.history.length ? Math.max(...f.history.map(h => h.rp)) : 0);
// mesi da 'mm/yyyy' (null se la data non e' leggibile, es. '2015–20')
const monthOf = h => { const m = String(h.date || '').match(/^(\d{2})\/(\d{4})$/); return m ? +m[2] * 12 + +m[1] - 1 : null; };

// ---------- 1. Perché: motivazione del rating per ogni match ----------
// ponytail: avversario "di livello" = nome che compare tra i match chiave (CAREERS) o nel roster; con un rating vero si userebbe il suo rp
const NOTABLE = new Set([
  ...FIGHTERS.map(f => surname(f)),
  ...Object.values(typeof CAREERS !== 'undefined' ? CAREERS : {}).flatMap(c => [...Object.values(c.W || {}), ...Object.values(c.L || {})].map(e => e[0].split(' ').pop())),
]);
function whyOf(H, i) {
  const h = H[i], prev = H[i - 1], d = h.rp - (prev ? prev.rp : 1000);   // esordio = 1000 (OpenSkill)
  const kind = methodKind(h.method), notable = NOTABLE.has(h.opp.split(' ').pop());
  let txt;
  if (h.res === 'W') txt = h.top ? 'Vittoria di prestigio' : notable ? 'Vittoria contro un nome' : d >= 45 && kind !== 'dec' ? 'Vittoria netta' : d >= 45 ? 'Vittoria che pesa' : 'Vittoria attesa';
  else if (h.res === 'L') txt = d <= -40 || (kind === 'ko' && !notable) ? 'Sconfitta pesante' : notable ? 'Sconfitta contro un avversario di livello' : 'Sconfitta ai punti';
  else txt = h.res === 'D' ? 'Pareggio, rating fermo' : 'No contest, non conta';
  const a = prev && monthOf(prev), b = monthOf(h);
  const gap = a != null && b != null ? b - a : prev && prev.year && h.year && !h.yearEst ? (h.year - prev.year) * 12 : 0;
  return {d, txt, back: gap > 12 ? gap : 0};
}
function addWhy() {
  const log = document.getElementById('log');
  if (!log || !log.rows.length || log.rows[0].querySelector('.why')) return;
  const F = pageF(), H = F.history || [];
  // stesso filtro e ordine del registro in carriera.html
  const idx = H.map((h, i) => i).filter(i => !H[i].est || H[i].key).reverse();
  if (idx.length !== log.rows.length) return;
  const th = log.closest('table').querySelector('thead tr');
  if (!th.querySelector('.whyh')) th.insertAdjacentHTML('beforeend', '<th class="whyh">Perché</th>');
  [...log.rows].forEach((tr, k) => {
    const w = whyOf(H, idx[k]);
    tr.insertAdjacentHTML('beforeend', `<td class="why sp"><b class="${w.d < 0 ? 'neg' : ''}">${w.d > 0 ? '+' : ''}${w.d}</b>${esc(w.txt)}${w.back ? `<small>Rientro dopo una lunga pausa · ${w.back >= 24 ? Math.round(w.back / 12) + ' anni' : w.back + ' mesi'}</small>` : ''}</td>`);
  });
}

// ---------- 2. Avversari suggeriti (Cartellone) ----------
function renderSuggest() {
  const s1 = document.getElementById('f1'), s2 = document.getElementById('f2');
  const a = byId(s1.value); if (!a) return;
  let box = document.getElementById('suggest');
  if (!box) {
    box = Object.assign(document.createElement('div'), {id: 'suggest', className: 'suggest pad'});
    document.querySelector('.tott').after(box);
    box.addEventListener('click', e => { const b = e.target.closest('button[data-id]'); if (!b) return; s2.value = b.dataset.id; s2.dispatchEvent(new Event('change')); });
  }
  const pa = peakOf(a);
  const picks = FIGHTERS.filter(f => f.id !== a.id && peakOf(f))
    .sort((x, y) => (y.sport === a.sport) - (x.sport === a.sport) || Math.abs(peakOf(x) - pa) - Math.abs(peakOf(y) - pa)).slice(0, 3);
  box.innerHTML = `<span class="k">Avversari suggeriti per <b>${esc(surname(a))}</b></span>` + picks.map(f =>
    `<button type="button" data-id="${f.id}" aria-pressed="${f.id === s2.value}" title="Picco ${peakOf(f)} · ${esc(f.sport)}">${sportIcon(f)}${esc(surname(f))}<i>${peakOf(f)}</i></button>`).join('');
}

// ---------- 3. Eventi: tutti i match di RECORDS raggruppati per evento ----------
function allEvents() {
  const map = new Map();
  FIGHTERS.forEach(f => (RECORDS[f.id] || []).forEach(r => {
    const [dd, mm] = String(r.dd).split('/');
    const iso = `${r.year}-${mm}-${dd}`;
    const venue = r.place.split(',')[0].trim();
    const key = (r.event || venue) + '|' + iso;
    if (!map.has(key)) map.set(key, {name: r.event || venue, iso, year: r.year, mm, dd, place: r.place, sport: f.sport, bouts: []});
    map.get(key).bouts.push({f, h: r});
  }));
  return [...map.values()].sort((x, y) => y.iso.localeCompare(x.iso));
}
const icsText = s => String(s).replace(/[\\;,]/g, c => '\\' + c).replace(/\n/g, '\\n');
function anniversary(ev) {
  const y = new Date().getFullYear(), d0 = new Date(Date.UTC(y, ev.mm - 1, ev.dd)), d1 = new Date(d0.getTime() + 864e5);
  const f = d => d.toISOString().slice(0, 10).replace(/-/g, '');
  return [f(d0), f(d1)];
}
function evTitle(ev) { return `${ev.name} · ${ev.bouts.map(b => `${surname(b.f)} vs ${b.h.opp}`).join(', ')}`; }
function downloadIcs(ev) {
  const [a, b] = anniversary(ev), stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Fight Lighthouse//IT', 'BEGIN:VEVENT',
    `UID:${ev.iso}-${ev.name.replace(/\W+/g, '')}@fightlighthouse`, `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${a}`, `DTEND;VALUE=DATE:${b}`,
    `SUMMARY:${icsText('Anniversario ' + evTitle(ev))}`, `DESCRIPTION:${icsText(`${ev.name}, ${ev.dd}/${ev.mm}/${ev.year}`)}`,
    `LOCATION:${icsText(ev.place)}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], {type: 'text/calendar'}));
  Object.assign(document.createElement('a'), {href: url, download: `${ev.name.replace(/[^\w]+/g, '_')}_${ev.year}.ics`}).click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const gcalUrl = ev => { const [a, b] = anniversary(ev);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Anniversario ' + evTitle(ev))}&dates=${a}/${b}&location=${encodeURIComponent(ev.place)}&details=${encodeURIComponent(`${ev.name}, ${ev.dd}/${ev.mm}/${ev.year}`)}`; };

function initEvents() {
  const EV = allEvents(), sf = document.getElementById('ef'), sd = document.getElementById('ed');
  sf.innerHTML = '<option value="">Tutti i fighter</option>' + FIGHTERS.filter(f => RECORDS[f.id]).map(f => `<option value="${f.id}">${esc(f.name)}</option>`).join('');
  const decs = [...new Set(EV.map(e => Math.floor(e.year / 10) * 10))].sort();
  sd.innerHTML = '<option value="">Tutti i decenni</option>' + decs.map(d => `<option value="${d}">Anni ${String(d).slice(2)} · ${d}</option>`).join('');
  const q = new URLSearchParams(location.search).get('f');
  if (q && RECORDS[q]) sf.value = q;
  const render = () => {
    const list = EV.filter(e => (!sf.value || e.bouts.some(b => b.f.id === sf.value)) && (!sd.value || Math.floor(e.year / 10) * 10 === +sd.value));
    document.getElementById('evcount').textContent = list.length;
    document.getElementById('events').innerHTML = list.map(e => `<article class="ev">
      <div class="when"><span class="d">${e.dd}·${e.mm}</span><span class="y">${e.year}</span></div>
      <div class="what"><h4>${esc(e.name)}</h4><div class="pl">${sportIcon(e.bouts[0].f)} ${esc(e.place)}</div>
        <ul>${e.bouts.map(({f, h}) => `<li><span class="w ${h.res} sp">${h.res}</span><a class="nm" href="carriera.html?f=${f.id}">${esc(surname(f))}</a><i>vs</i><span class="nm">${esc(h.opp)}</span>
          <span class="met sp">${esc(h.method)}</span><a class="yt" href="${videoUrlReal(f, h)}" target="_blank" rel="noopener noreferrer" aria-label="Video: ${esc(f.name)} contro ${esc(h.opp)}">${ytThumb(f, h) || '<img src="img/youtube.svg" alt="">'}</a></li>`).join('')}</ul></div>
      <div class="acts"><button type="button" class="ics">${icon('nato')}Aggiungi al calendario</button><a href="${gcalUrl(e)}" target="_blank" rel="noopener noreferrer">Google Calendar</a></div>
    </article>`).join('') || '<p class="none">Nessun evento con questi filtri.</p>';
    document.querySelectorAll('#events .ics').forEach((b, i) => { b.onclick = () => downloadIcs(list[i]); });
  };
  sf.addEventListener('change', render); sd.addEventListener('change', render);
  render();
}

// ---------- 4. Scorciatoie: "/" cerca, Esc annulla ----------
document.addEventListener('keydown', e => {
  const t = e.target, typing = t.matches && t.matches('input,textarea,[contenteditable="true"]');
  if (e.key === '/' && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) {
    const el = document.querySelector('#q') || document.querySelector('#f1, #pickf, #ef, select');
    if (el) { e.preventDefault(); el.focus(); }
  } else if (e.key === 'Escape') {
    if (t.id === 'q') t.value = '';
    if (t.matches && t.matches('input,select,textarea')) t.blur();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const log = document.getElementById('log');
  if (log) { addWhy(); new MutationObserver(addWhy).observe(log, {childList: true}); }
  if (document.getElementById('f1') && document.querySelector('.tott')) {
    renderSuggest();
    ['f1', 'f2'].forEach(id => document.getElementById(id).addEventListener('change', renderSuggest));
  }
  if (document.getElementById('events')) initEvents();
});

// ================= MOVIMENTO E CLIC IN PIÙ (stile in fx.css) =================
const CALM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
const pageF = () => { const q = new URLSearchParams(location.search); return byId(q.get('f') || q.get('db')) || byId('topuria'); };
if (!CALM) document.documentElement.classList.add('fx');

// numeri che contano: riscrive solo i nodi di testo diretti (sup, small e span restano dove sono)
const groupIt = v => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
function countUp(el, from = 0, D = 900) {
  const jobs = [...el.childNodes].filter(n => n.nodeType === 3 && /\d/.test(n.data)).map(n => ({n, src: n.data}));
  if (!jobs.length) return;
  const put = e => jobs.forEach(j => { j.n.data = j.src.replace(/\d[\d.]*\d|\d/g, m => { const to = +m.replace(/\./g, ''), v = Math.round(from + (to - from) * e); return m.includes('.') ? groupIt(v) : String(v); }); });
  if (CALM) return put(1);
  const t0 = performance.now();
  const step = now => { const k = Math.min(1, (now - t0) / D); put(1 - Math.pow(1 - k, 3)); if (k < 1) requestAnimationFrame(step); };
  put(0); requestAnimationFrame(step);
}
const COUNT_SEL = '.counts b, .ticket .grid div, .slab .v, .chip .v, .diet .dv, .nature li b, .strip .rank, .list .row .v, .step .v';

// 1. entrata delle sezioni (titolo che sale, tratto rosso a matita) + numeri che contano quando arrivano
function initReveal() {
  if (CALM) return;
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    if (e.target._txt) { e.target._txt.forEach(([n, t]) => { n.data = t; }); countUp(e.target); } else e.target.classList.add('in');
  }), {rootMargin: '0px 0px -8% 0px'});
  document.querySelectorAll('.sechead, header.pad > h1').forEach(el => io.observe(el));
  // finché non arrivano a schermo i numeri stanno a zero; il testo vero resta da parte in _txt
  document.querySelectorAll(COUNT_SEL).forEach(el => {
    const ns = [...el.childNodes].filter(n => n.nodeType === 3 && /\d/.test(n.data));
    if (!ns.length) return;
    el._txt = ns.map(n => [n, n.data]);
    ns.forEach(n => { n.data = n.data.replace(/\d[\d.]*\d|\d/g, '0'); });
    io.observe(el);
  });
}

// 2. lightbox: momenti e foto della biografia, frecce e tastiera
function initLightbox() {
  const sel = '#moments .moment, .bio .bimg';
  if (!document.querySelector('#moments, .bio')) return;
  let box, list = [], at = 0, back = null;
  const big = img => (img.getAttribute('src') || '').replace(/_cut\.webp$/, '.jpg');
  const show = i => {
    at = (i + list.length) % list.length;
    const fig = list[at], cap = fig.querySelector('figcaption').cloneNode(true), kick = cap.querySelector('small');
    const k = kick ? kick.textContent.trim() : '';
    if (kick) kick.remove();
    box.querySelector('img').src = big(fig.querySelector('img'));
    box.querySelector('img').alt = fig.querySelector('img').alt || '';
    box.querySelector('.lbk').textContent = `${k ? k + ' · ' : ''}${at + 1} / ${list.length}`;
    box.querySelector('.lbc').textContent = cap.textContent.trim();
    box.querySelector('.lbx-in').animate([{opacity: 0, transform: 'scale(.97)'}, {opacity: 1, transform: 'none'}], {duration: CALM ? 1 : 260, easing: 'ease-out'});
  };
  const close = () => { box.hidden = true; document.documentElement.style.overflow = ''; if (back) back.focus(); };
  const open = fig => {
    if (!box) {
      document.body.insertAdjacentHTML('beforeend', `<div class="lbx" role="dialog" aria-modal="true" aria-label="Foto" hidden>
        <div class="lbx-in"><img alt=""><div class="lbtxt"><div class="lbk"></div><div class="lbc"></div></div></div>
        <button type="button" class="lbp" aria-label="Foto precedente">←</button><button type="button" class="lbn" aria-label="Foto successiva">→</button><button type="button" class="lbclose" aria-label="Chiudi">×</button></div>`);
      box = document.body.lastElementChild;
      box.addEventListener('click', e => {
        if (e.target.closest('.lbp')) show(at - 1); else if (e.target.closest('.lbn')) show(at + 1);
        else if (e.target.closest('.lbclose') || e.target === box) close();
      });
      box.addEventListener('keydown', e => {
        if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') show(at - 1); else if (e.key === 'ArrowRight') show(at + 1);
        else if (e.key === 'Tab') { const b = [...box.querySelectorAll('button')], i = b.indexOf(document.activeElement); e.preventDefault(); b[(i + (e.shiftKey ? -1 : 1) + b.length) % b.length].focus(); }
      });
    }
    list = [...document.querySelectorAll(fig.matches('.bimg') ? '.bio .bimg' : '#moments .moment')];
    back = fig; box.hidden = false; document.documentElement.style.overflow = 'hidden';
    show(list.indexOf(fig)); box.querySelector('.lbclose').focus();
  };
  const arm = () => document.querySelectorAll(sel).forEach(f => { if (!f.tabIndex || f.tabIndex < 0) { f.tabIndex = 0; f.setAttribute('role', 'button'); f.setAttribute('aria-label', 'Apri la foto a tutto schermo'); } });
  arm();
  const mom = document.getElementById('moments');
  if (mom) new MutationObserver(() => { arm(); if (!CALM) [...mom.children].forEach((m, i) => m.animate([{opacity: 0, transform: 'translateY(18px)'}, {opacity: 1, transform: 'none'}], {duration: 380, delay: i * 45, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards'})); }).observe(mom, {childList: true});
  document.addEventListener('click', e => { const f = e.target.closest(sel); if (f && !e.target.closest('a,sup')) open(f); });
  document.addEventListener('keydown', e => { const f = e.target.closest && e.target.closest(sel); if (f && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(f); } });
}

// 3. note [senza fonte] / [citazione necessaria]: un clic e salta fuori la fonte
const FONTI = {
  debuttante: ["il cugino di Harrionomane", "un vocale WhatsApp di sette minuti", "lui stesso, alle 4 di notte", "Gemini, con grande sicurezza", "il bidello di Borgo Roma"],
  vlad: ["la mamma di Vlad, dalla campanella", "un post-it in laboratorio", "il relatore, che però non risponde alle email", "un signore in Piazza delle Erbe", "il cugino di Harrionomane"],
  _: ["il cugino di Harrionomane", "sentito al bar della palestra", "un commento su YouTube con tre like", "l'arbitro, a microfoni spenti"],
};
function initNotes() {
  const sups = document.querySelectorAll('.bio .txt sup');
  if (!sups.length) return;
  const F = pageF(), pool = FONTI[F.id] || FONTI._;
  sups.forEach((s, i) => { s.tabIndex = 0; s.setAttribute('role', 'button'); s.dataset.n = i; s.title = 'Mostra la fonte'; });
  const toggle = s => {
    const nx = s.nextElementSibling;
    if (nx && nx.classList.contains('fnote')) { nx.remove(); s.setAttribute('aria-expanded', 'false'); return; }
    s.insertAdjacentHTML('afterend', `<span class="fnote" role="note"><b>Fonte</b>${esc(pool[s.dataset.n % pool.length])}</span>`);
    s.setAttribute('aria-expanded', 'true');
  };
  document.addEventListener('click', e => { const s = e.target.closest('.bio .txt sup[data-n]'); if (s) toggle(s); });
  document.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('sup[data-n]')) { e.preventDefault(); toggle(e.target); } });
}

// 4. montagna: scheda ricca sul pallino più vicino, clic = video
function initMountTip() {
  const svg = document.querySelector('#mountSec svg.chart');
  if (!svg) return;
  const F = pageF(), tip = document.createElement('div');
  tip.className = 'mtip'; tip.hidden = true; tip.setAttribute('aria-hidden', 'true'); document.body.append(tip);
  const RES = {W: 'Vittoria', L: 'Sconfitta', D: 'Pareggio', NC: 'No contest'};
  let cur = null, armed = null;
  const near = ev => {
    const m = svg.getScreenCTM(); if (!m) return null;
    const p = svg.createSVGPoint(); p.x = ev.clientX; p.y = ev.clientY;
    const q = p.matrixTransform(m.inverse()), R = 16 / m.a;   // ~16 px a schermo
    let best = null, d0 = R * R;
    (svg._pts || []).forEach(pt => { const d = (pt.x - q.x) ** 2 + (pt.y - q.y) ** 2; if (d < d0) { d0 = d; best = pt; } });
    return best;
  };
  const place = ev => {
    const w = tip.offsetWidth, h = tip.offsetHeight;
    tip.style.left = Math.min(ev.clientX + 18, innerWidth - w - 10) + 'px';
    tip.style.top = (ev.clientY + 18 + h > innerHeight ? ev.clientY - h - 14 : ev.clientY + 18) + 'px';
  };
  const show = (pt, ev) => {
    if (pt !== cur) {
      cur = pt;
      const hid = document.body.classList.contains('spoiler');
      tip.innerHTML = `${ytThumb(F, pt) || '<span class="mt-noth">Cerca il video</span>'}<div><small>${esc(pt.date)} · ${pt.rp} PT</small><b>${esc(pt.opp)}</b>
        <i class="${pt.res}">${hid ? 'Esito nascosto' : `${RES[pt.res] || pt.res} · ${esc(pt.method)}`}</i><em>Clic: guarda il video</em></div>`;
      tip.hidden = false;
    }
    place(ev); svg.style.cursor = 'pointer';
  };
  const hide = () => { cur = null; tip.hidden = true; svg.style.cursor = 'crosshair'; };
  svg.addEventListener('pointermove', ev => { const pt = near(ev); pt ? show(pt, ev) : hide(); });
  svg.addEventListener('pointerleave', hide);
  svg.addEventListener('click', ev => {
    const pt = near(ev); if (!pt) return;
    if (ev.pointerType === 'touch' && armed !== pt) { armed = pt; show(pt, ev); return; }   // al tocco: prima la scheda, poi il video
    window.open(videoUrlReal(F, pt), '_blank', 'noopener');
  });
}

// 5. mappa di nascita: clic = zoom sulla città, di nuovo = tutto il paese
function initBornZoom() {
  const map = document.getElementById('bornMap'), dot = map && map.querySelector('circle.pulse');
  if (!dot) return;
  const full = map.getAttribute('viewBox').split(' ').map(Number), x = +dot.getAttribute('cx'), y = +dot.getAttribute('cy');
  const s = Math.max(full[2], full[3]) * .34;
  const zoom = [x - s / 2, y - s / 2 * full[3] / full[2], s, s * full[3] / full[2]];
  let on = false, raf;
  map.style.cursor = 'zoom-in'; map.tabIndex = 0; map.setAttribute('aria-roledescription', 'mappa, clic per ingrandire');
  const go = () => {
    on = !on; map.style.cursor = on ? 'zoom-out' : 'zoom-in';
    map.classList.add('zoomed');   // durante lo zoom i tratti restano nel riquadro
    const from = map.getAttribute('viewBox').split(' ').map(Number), to = on ? zoom : full, t0 = performance.now(), D = CALM ? 1 : 650;
    cancelAnimationFrame(raf);
    const step = now => { const k = Math.min(1, (now - t0) / D), e = k < .5 ? 4 * k ** 3 : 1 - (-2 * k + 2) ** 3 / 2;
      map.setAttribute('viewBox', from.map((v, i) => v + (to[i] - v) * e).join(' ')); if (k < 1) raf = requestAnimationFrame(step); else if (!on) map.classList.remove('zoomed'); };
    raf = requestAnimationFrame(step);
  };
  map.addEventListener('click', go);
  map.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
}

// 6. roster: tilt leggero + bandiere che filtrano
function initRoster() {
  const grid = document.getElementById('rosterGrid');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('.card')];
  if (FINE && !CALM) cards.forEach(c => {
    c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(), dx = (e.clientX - r.left) / r.width - .5, dy = (e.clientY - r.top) / r.height - .5;
      c.style.transform = `perspective(900px) rotateY(${dx * 7}deg) rotateX(${-dy * 6}deg) translateZ(0)`; });
    c.addEventListener('pointerleave', () => { c.style.transform = ''; });
  });
  const codes = [...new Set(FIGHTERS.flatMap(f => f.flags))];
  const n = c => FIGHTERS.filter(f => f.flags.includes(c)).length;
  grid.insertAdjacentHTML('beforebegin', `<div class="flagbar" role="group" aria-label="Filtra per paese"><button type="button" data-c="" aria-pressed="true">Tutti<b>${FIGHTERS.length}</b></button>${codes.map(c =>
    `<button type="button" data-c="${c}" aria-pressed="false"><img class="flag" src="img/flags/${c}.svg" alt="">${FLAG_NAMES[c]}<b>${n(c)}</b></button>`).join('')}</div>`);
  const bar = grid.previousElementSibling;
  let sel = '';
  const apply = c => {
    sel = sel === c ? '' : c;
    bar.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.c === sel)));
    grid.classList.toggle('filtered', !!sel);
    let k = 0;
    cards.forEach((card, i) => {
      const show = !sel || FIGHTERS[i].flags.includes(sel);
      card.hidden = !show;
      if (show && !CALM) card.animate([{opacity: 0, transform: 'translateY(16px)'}, {opacity: 1, transform: 'none'}], {duration: 360, delay: k++ * 50, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards'});
    });
  };
  bar.addEventListener('click', e => { const b = e.target.closest('button'); if (b) apply(b.dataset.c === sel ? '' : b.dataset.c); });
  grid.querySelectorAll('.flag').forEach(img => { img.title = `Mostra solo: ${img.alt}`; img.style.cursor = 'pointer'; });
  grid.addEventListener('click', e => { const img = e.target.closest('.flag'); if (!img) return; const c = (img.getAttribute('src').match(/flags\/(\w+)\.svg/) || [])[1]; if (c) { apply(c); bar.scrollIntoView({behavior: CALM ? 'auto' : 'smooth', block: 'nearest'}); } });
}

// 7. classifiche: le righe scivolano al nuovo posto (FLIP) e i valori passano dal vecchio al nuovo
function initFlip() {
  if (!document.getElementById('metric')) return;
  let before = null;
  const snap = () => new Map([...document.querySelectorAll('#list .row')].map(r => [r.getAttribute('href'), {top: r.getBoundingClientRect().top, v: +r.querySelector('.v').textContent}]));
  document.addEventListener('click', e => { if (e.target.closest('#metric button, #sport button')) before = snap(); }, true);
  document.addEventListener('click', () => {
    if (!before) return;
    const b = before; before = null;
    if (CALM) return;
    document.querySelectorAll('#list .row').forEach((r, i) => {
      const o = b.get(r.getAttribute('href'));
      if (!o) { r.animate([{opacity: 0}, {opacity: 1}], {duration: 300, delay: i * 30, fill: 'backwards'}); return; }
      const dy = o.top - r.getBoundingClientRect().top;
      if (dy) r.animate([{transform: `translateY(${dy}px)`}, {transform: 'none'}], {duration: 520, easing: 'cubic-bezier(.2,.8,.2,1)'});
      const v = r.querySelector('.v'); if (+v.textContent !== o.v) countUp(v, o.v, 520);
    });
    document.querySelectorAll('#podium .step').forEach((s, i) => s.animate([{opacity: 0, transform: 'translateY(24px)'}, {opacity: 1, transform: 'none'}], {duration: 420, delay: [120, 0, 220][i], easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards'}));
  });
}

// 8. marquee che rallenta quando ci passi sopra
function initMarquee() {
  document.querySelectorAll('.marquee').forEach(m => {
    const rate = r => m.querySelectorAll(':scope > div').forEach(d => d.getAnimations().forEach(a => a.updatePlaybackRate(r)));
    m.addEventListener('pointerenter', () => rate(.2)); m.addEventListener('pointerleave', () => rate(1));
  });
}

// 9. fighter a caso, dal menu di ogni pagina
function initRandom() {
  const links = document.querySelector('nav .links');
  if (!links || links.querySelector('.rnd')) return;
  const a = Object.assign(document.createElement('a'), {className: 'rnd', href: 'carriera.html', innerHTML: `${icon('confronto')}A caso`, title: 'Apri la scheda di un fighter a caso'});
  a.addEventListener('click', e => {
    e.preventDefault();
    const now = new URLSearchParams(location.search).get('f'), pool = FIGHTERS.filter(f => f.id !== now);
    location.href = `carriera.html?f=${pool[Math.floor(Math.random() * pool.length)].id}`;
  });
  links.insertBefore(a, links.querySelector('.spoilerbtn, select, label'));
}

// 10. codice Konami: timbro KO
function initKonami() {
  const K = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let i = 0;
  document.addEventListener('keydown', e => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    i = k === K[i] ? i + 1 : k === K[0] ? 1 : 0;
    if (i < K.length) return;
    i = 0;
    const s = document.createElement('div');
    s.className = 'kostamp'; s.setAttribute('role', 'status');
    s.innerHTML = '<div><b>KO</b><small>Round 1 · 0:07</small></div>';
    document.body.append(s);
    const d = s.firstChild;
    d.animate([{transform: 'rotate(-14deg) scale(2.6)', opacity: 0}, {transform: 'rotate(-11deg) scale(.94)', opacity: 1, offset: .6}, {transform: 'rotate(-12deg) scale(1)', opacity: 1}], {duration: CALM ? 1 : 340, easing: 'cubic-bezier(.5,0,.75,0)', fill: 'forwards'});
    if (!CALM) document.body.animate([{transform: 'none'}, {transform: 'translate(6px,-4px)'}, {transform: 'translate(-5px,3px)'}, {transform: 'none'}], {duration: 220, delay: 300});
    setTimeout(() => s.animate([{opacity: 1}, {opacity: 0}], {duration: 600, fill: 'forwards'}).onfinish = () => s.remove(), 2200);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  [initReveal, initLightbox, initNotes, initMountTip, initBornZoom, initRoster, initFlip, initMarquee, initRandom, initKonami]
    .forEach(fn => { try { fn(); } catch (err) { console.warn(fn.name, err); } });
});

// Matita "grande": per le grafiche grandi (viewBox ~1000) il filtro delle icone è troppo fine e non si vede.
// Tremolio proporzionato + bordo ruvido; applicato via fx.css alle grafiche grandi.
document.body.insertAdjacentHTML('beforeend', `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <filter id="pencilL" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="3" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G"/></filter>
  <filter id="pencilL2" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="8" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.25" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in" result="r"/><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="2" result="n"/><feDisplacementMap in="r" in2="n" scale="4"/></filter>
</defs></svg>`);

/* ---------- MONTAGNA: la carriera si disegna quando entra nello schermo (e a ogni cambio di confronto) ---------- */
(() => {
  const svg = document.querySelector('#mountSec svg.chart');
  if (!svg || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let seen = false, busy = false;
  const draw = () => {
    busy = true;
    const W = svg.viewBox.baseVal.width || 1240, x0 = svg.viewBox.baseVal.x || 0;
    svg.querySelectorAll('path, polyline').forEach(p => {
      const f = p.getAttribute('fill');
      if (f && f !== 'none') { p.style.opacity = 0; p.style.transition = 'none'; requestAnimationFrame(() => { p.style.transition = 'opacity 1.6s ease .4s'; p.style.opacity = ''; }); return; }
      const L = p.getTotalLength(); if (!L) return;
      p.style.transition = 'none'; p.style.strokeDasharray = L; p.style.strokeDashoffset = L;
      requestAnimationFrame(() => requestAnimationFrame(() => { p.style.transition = 'stroke-dashoffset 2.2s cubic-bezier(.4,0,.2,1)'; p.style.strokeDashoffset = 0; }));
      setTimeout(() => { p.style.strokeDasharray = ''; p.style.strokeDashoffset = ''; }, 2500);
    });
    svg.querySelectorAll('circle, rect, polygon').forEach(e => {
      const b = e.getBBox(); if (b.width > 40 || b.height > 40) return;
      const t = Math.max(0, (b.x - x0) / W) * 2.2;            // compare quando la linea ci arriva
      e.style.transformBox = 'fill-box'; e.style.transformOrigin = 'center';
      e.animate([{transform: 'scale(0)', opacity: 0}, {transform: 'scale(1.5)', opacity: 1, offset: .6}, {transform: 'scale(1)', opacity: 1}],
        {duration: 420, delay: t * 1000, easing: 'ease-out', fill: 'backwards'});
    });
    svg.querySelectorAll('g.lbl, line.ldr, :scope > text').forEach(e =>
      e.animate([{opacity: 0, transform: 'translateY(6px)'}, {opacity: 1, transform: 'none'}], {duration: 500, delay: 2200, easing: 'ease-out', fill: 'backwards'}));
    setTimeout(() => { busy = false; }, 300);
  };
  new IntersectionObserver((es, io) => es.forEach(e => { if (e.isIntersecting && !seen) { seen = true; draw(); io.disconnect(); } }), {threshold: .35}).observe(svg);
  new MutationObserver(() => { if (seen && !busy) draw(); }).observe(svg, {childList: true});
})();
