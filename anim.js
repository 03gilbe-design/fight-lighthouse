/* Clip animate scontornate (img/anim/*.webp, PNG statico per prefers-reduced-motion).
   Solo aggiunte: non tocca la logica delle pagine. Fonti in img/anim/FONTI.txt. */
(() => {
  // fighter -> clip. look = verso cui guarda il fighter nella clip (L/R/C), per girarla verso l'avversario nell'arena
  const ANIM = {
    tyson:   {src: 'tyson_rooney',     look: 'L', alt: 'Tyson schiva e risponde ai guantoni di Rooney'},
    ali:     {src: 'ali_liston',       look: 'C', alt: 'Ali in piedi sopra Liston'},
    khabib:  {src: 'khabib_conor',     look: 'L', alt: 'Khabib manda giù McGregor'},
    floyd:   {src: 'floyd_canelo',     look: 'R', alt: 'Mayweather contro Canelo'},
    fedor:   {src: 'fedor_colpitore',  look: 'R', alt: 'Fedor ai colpitori'},
    topuria: {src: 'topuria_occhiali', look: 'C', alt: 'Topuria abbassa gli occhiali'},
  };
  // home: sezione -> fighter
  const HOME = {guarda: 'tyson', chivince: 'khabib'};

  const RM = matchMedia('(prefers-reduced-motion: reduce)');
  const url = (a, still) => `img/anim/${a.src}.${still || RM.matches ? 'png' : 'webp'}`;
  const img = (a, cls) => {
    const i = new Image();
    i.className = 'anim-clip ' + cls; i.alt = a.alt; i.loading = 'lazy'; i.decoding = 'async';
    i.src = url(a); i.dataset.src = a.src;
    return i;
  };
  // se l'utente cambia la preferenza a pagina aperta
  RM.addEventListener?.('change', () => document.querySelectorAll('img.anim-clip').forEach(i => { i.src = url(ANIM_BY_SRC[i.dataset.src]); }));
  const ANIM_BY_SRC = Object.fromEntries(Object.values(ANIM).map(a => [a.src, a]));
  const $ = id => document.getElementById(id);
  const P = new URLSearchParams(location.search);

  /* --- home: la clip entra nella testata della sezione, i piedi sulla riga --- */
  for (const [sec, fid] of Object.entries(HOME)) {
    const head = document.querySelector(`#${sec} .sechead`);
    if (head && ANIM[fid]) head.querySelector('h3').after(img(ANIM[fid], 'anim-head'));
  }

  /* --- scheda: la clip in piedi sopra il riquadro "Tale of the tape" della testata --- */
  const slab = document.querySelector('header.hero .slab');
  if (slab) {
    const a = ANIM[P.get('f')];
    if (a) slab.prepend(img(a, 'anim-hero'));
  }

  /* --- arena --- */
  const arena = $('arena');
  if (!arena) return;
  const sel = n => $('f' + n)?.value;

  // a riposo: clip piccola sopra "Falli combattere"
  const btn = $('fight');
  let rest = null;
  const restPaint = () => {
    const a = ANIM[sel(1)] || ANIM[sel(2)];
    if (!a) { rest?.remove(); rest = null; return; }
    if (!rest) { rest = img(a, 'anim-rest'); btn.before(rest); }
    else if (rest.dataset.src !== a.src) { rest.src = url(a); rest.alt = a.alt; rest.dataset.src = a.src; }
    rest.hidden = arena.classList.contains('fighting');
  };
  ['f1', 'f2'].forEach(id => $(id)?.addEventListener('change', () => setTimeout(restPaint)));

  // miniatura YouTube scontornata del match vero fra i due (statica), per chi non ha clip
  const ytFlash = (fid, oid) => {
    if (typeof YT === 'undefined') return null;
    const opp = document.querySelector(`#f${sel(1) === oid ? 1 : 2} option:checked`)?.textContent || '';
    const sur = opp.trim().split(' ').pop().toLowerCase();
    if (!sur) return null;
    const k = Object.keys(YT).find(k => k.startsWith(fid + '|') && k.split('|')[1].toLowerCase().includes(sur));
    return k ? `img/yt/${YT[k].id}.webp` : null;
  };

  // durante il match: chi colpisce (la sua foto fa lo scatto lungeR/lungeL) diventa la sua clip per 1,5 s
  const timers = {};
  const onHit = side => {
    const n = side === 'A' ? 1 : 2, fid = sel(n), oid = sel(3 - n);
    const im = $('cutImg' + side);
    if (!im || !fid) return;
    const a = ANIM[fid];
    const src = a ? url(a) : ytFlash(fid, oid);
    if (!src) return;
    if (!timers[side]) im.dataset.back = im.getAttribute('href');
    clearTimeout(timers[side]?.t);
    const gx = +im.dataset.gx, wantR = side === 'A';
    const flip = a ? (a.look === 'L' && wantR) || (a.look === 'R' && !wantR) : false;
    im.setAttribute('href', src);
    if (flip) im.setAttribute('transform', `translate(${2 * gx} 0) scale(-1 1)`); else im.removeAttribute('transform');
    im.classList.add('anim-on');
    timers[side] = {src, t: setTimeout(() => {
      // torna la foto, se nel frattempo il verdetto non l'ha già cambiata
      if (im.getAttribute('href') === src) {
        im.setAttribute('href', im.dataset.back);
        if (im.dataset.flip === '1') im.setAttribute('transform', `translate(${2 * gx} 0) scale(-1 1)`); else im.removeAttribute('transform');
      }
      im.classList.remove('anim-on'); timers[side] = null;
    }, 1500)};
  };

  // dopo il verdetto: la clip del vincitore in loop accanto al titolo
  let verd = null;
  const verdPaint = () => {
    const sec = $('verdictSec');
    verd?.remove(); verd = null;
    if (!sec || sec.hidden) return;
    const win = ['A', 'B'].find(sd => /scale\(1\.15\)/.test($('cut' + sd)?.style.transform || ''));
    const a = win && ANIM[sel(win === 'A' ? 1 : 2)];
    if (!a) return;
    verd = img(a, 'anim-verd');
    sec.querySelector('.vhead')?.prepend(verd);
  };

  new MutationObserver(ms => {
    for (const m of ms) {
      const t = m.target;
      if (t.id === 'arena') { restPaint(); if (t.classList.contains('fighting')) preload(); continue; }
      if (t.id === 'verdictSec') { verdPaint(); continue; }
      if (t.classList?.contains('jolt') && /lunge[RL]/.test(t.getAttribute('class')) && !/lunge[RL]/.test(m.oldValue || ''))
        onHit(t.id.slice(-1));
    }
  }).observe(document.body, {subtree: true, attributes: true, attributeFilter: ['class', 'hidden'], attributeOldValue: true});

  // le clip dei due si caricano all'inizio del match, così il primo colpo non resta vuoto
  const preload = () => [sel(1), sel(2)].forEach(f => { if (ANIM[f]) new Image().src = url(ANIM[f]); });

  restPaint();
})();
