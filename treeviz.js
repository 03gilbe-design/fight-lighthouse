// "Come andrà": per ogni nodo dell'albero una grafica a matita fatta apposta per la sua feature,
// con la soglia segnata e il valore vero del match, più la domanda in italiano semplice.
// Serve: esc, surname, ICON_PATHS (data.js), fighterState, treeFeatures, _num, nodeValue (tree.js), filtri #pencilL/#pencilL2 (extra.js).
const TV = (() => {
  const R = '#E10600', W = '#F2F0EB', G = '#8C8A86', K = '#0B0B0B', VW = 320, VH = 160;
  const HAND = "AFont1,'IBM Plex Mono'", MONO = "'IBM Plex Mono'";
  const BOX = `<rect width="${VW}" height="${VH}" fill="none"/>`;   // il filtro usa il riquadro del gruppo: così una riga sola non sparisce
  // matita: tratto medio + tratti grossi (sw="5" sugli elementi), seconda passata leggera e spostata, come il sacco
  const pen = d => `<g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"><g filter="url(#pencilL)">${BOX}${d}</g><g opacity=".3" transform="translate(1.5 -1)" filter="url(#pencilL2)">${BOX}${d}</g></g>`;
  const ink = d => `<g filter="url(#pencilL2)">${BOX}${d}</g>`;   // i riempimenti, granulosi
  // testo: lettere in AFont1, numeri in IBM Plex Mono; alone nero perché resti leggibile sopra i tratti
  const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-size="${o.fs || 14}" fill="${o.c || W}" text-anchor="${o.a || 'middle'}" paint-order="stroke" stroke="${K}" stroke-width="4" stroke-linejoin="round">${String(s).split(/([−+\-]?[\d][\d.,]*%?)/).filter(Boolean)
    .map(p => `<tspan style="font-family:${/\d/.test(p) ? MONO + ';font-weight:600' : HAND + ';font-size:' + Math.round((o.fs || 14) * 1.3) + 'px'}">${esc(p)}</tspan>`).join('')}</text>`;
  const svg = (body, label) => `<svg class="tvg" viewBox="0 0 ${VW} ${VH}" role="img" aria-label="${esc(label)}">${body}</svg>`;
  const nm = f => { const s = surname(f); return s.length > 12 ? s.slice(0, 11) + '.' : s; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const dash = 'stroke-dasharray="7 6"';
  let uid = 0;

  // ---- due colonne affiancate (rating, età, altezza, KO subiti): A rosso, B bianco, tacca della soglia su A a B + t ----
  function duel(kind, A, B, t, a, b) {
    const c = B + t, unit = {rp: '', age: ' anni', height: ' cm', kod_rate: '%'}[kind];
    const fmt = v => kind === 'kod_rate' ? _num(v * 100) + '%' : _num(v, kind === 'age' ? 1 : 0) + unit;
    let lo, hi;
    if (kind === 'kod_rate') { lo = 0; hi = 1; }
    else if (kind === 'age') { lo = 0; hi = Math.max(A, B, c) * 1.08; }
    else { const mn = Math.min(A, B, c), mx = Math.max(A, B, c), pad = kind === 'rp' ? Math.max(60, (mx - mn) * .6) : Math.max(12, (mx - mn) * .6); lo = mn - pad; hi = mx + pad * .15; }
    const base = 112, H = kind === 'age' ? 70 : 80, y = v => base - clamp((v - lo) / (hi - lo), 0, 1) * H;
    const xA = 150, xB = 262, ty = y(c);
    const shape = (x, v, col, fillIt) => {
      const top = y(v);
      if (kind === 'rp') {   // montagnetta
        const d = `M${x - 46} ${base} Q${x - 18} ${top + 22} ${x} ${top} Q${x + 18} ${top + 22} ${x + 46} ${base} Z`;
        return {f: fillIt ? `<path d="${d}" fill="${col}"/>` : '', s: `<path d="${d}" stroke="${W}" stroke-width="5"/>`};
      }
      if (kind === 'age') {   // candelina: la cera alta quanto gli anni, la fiammella sopra
        const flame = `<path d="M${x} ${top - 24} Q${x + 9} ${top - 12} ${x} ${top - 4} Q${x - 9} ${top - 12} ${x} ${top - 24} Z" stroke="${W}"/><path d="M${x} ${top - 4} V${top}" stroke="${W}"/>`;
        return {f: fillIt ? `<rect x="${x - 14}" y="${top}" width="28" height="${base - top}" fill="${col}"/>` : '',
          s: `<rect x="${x - 14}" y="${top}" width="28" height="${base - top}" stroke="${W}" stroke-width="5"/>${flame}`};
      }
      if (kind === 'height') {   // metro da sarto in piedi, con le tacche
        const ticks = Array.from({length: Math.floor((base - top) / 10)}, (_, i) => `M${x - 16} ${base - 10 - i * 10} h10`).join('');
        return {f: fillIt ? `<rect x="${x - 16}" y="${top}" width="32" height="${base - top}" fill="${col}"/>` : '',
          s: `<rect x="${x - 16}" y="${top}" width="32" height="${base - top}" stroke="${W}" stroke-width="5"/><path d="${ticks}" stroke="${fillIt ? K : G}"/>`};
      }
      // KO subiti: termometro 0-100% con la stellina del KO in cima
      const star = `<path transform="translate(${x - 12} 4)" d="M12 2L14.4 7L19.8 5.8L17.5 10.8L21.7 14.2L16.4 15.5L16.3 21L12 17.6L7.7 21L7.6 15.5L2.3 14.2L6.5 10.8L4.2 5.8L9.6 7Z" stroke="${W}"/>`;
      return {f: `<rect x="${x - 15}" y="${top}" width="30" height="${base - top}" fill="${col}"/>`,
        s: `<rect x="${x - 15}" y="${base - H}" width="30" height="${H}" stroke="${G}" stroke-width="5"/>${star}`};
    };
    const sA = A == null ? null : shape(xA, A, R, true), sB = B == null ? null : shape(xB, B, W, true);
    const tick = `<path d="M${xA - 50} ${ty} H${xA + 50}" stroke="${W}" stroke-width="4" ${dash}/><path d="M${xA - 56} ${ty - 7} l10 7 -10 7" stroke="${W}"/>`;
    return ink((sA ? sA.f : '') + (sB ? sB.f : '')) + pen((sA ? sA.s : '') + (sB ? sB.s : '') + tick)
      + T(8, ty - 4, 'soglia', {a: 'start', c: G, fs: 13}) + T(8, ty + 13, fmt(c), {a: 'start', c: G, fs: 12})
      + T(xA, 130, nm(a), {c: R}) + T(xA, 152, fmt(A)) + T(xB, 130, nm(b)) + T(xB, 152, fmt(B));
  }

  // ---- campane di Gauss: centro = forza μ, larghezza = incertezza σ ----
  const bellPath = (cx, sd, peak, base) => {
    const pts = [];
    for (let i = 0; i <= 40; i++) { const z = -2.4 + i * 0.12; pts.push(`${(cx + z * sd).toFixed(1)} ${(base - peak * Math.exp(-z * z / 2)).toFixed(1)}`); }
    return 'M' + pts.join(' L');
  };
  function bells(sa, sb, t, a, b) {
    const c = sb.mu + t, base = 112, k = 6;
    const xs = [sa.mu - 2.4 * sa.sigma, sb.mu - 2.4 * sb.sigma, sa.mu + 2.4 * sa.sigma, sb.mu + 2.4 * sb.sigma, c];
    const lo = Math.min(...xs), hi = Math.max(...xs), sc = Math.min(k * 1.6, 270 / (hi - lo)), X = v => 25 + (v - lo) * sc + (270 - (hi - lo) * sc) / 2;
    const pk = sd => clamp(48 * 6 / sd, 30, 80);
    const pA = bellPath(X(sa.mu), sa.sigma * sc, pk(sa.sigma), base), pB = bellPath(X(sb.mu), sb.sigma * sc, pk(sb.sigma), base), xc = X(c);
    return ink(`<path d="${pA} Z" fill="${R}" opacity=".85"/>`)
      + pen(`<path d="${pB}" stroke="${W}" stroke-width="5"/><path d="${pA}" stroke="${W}"/><path d="M12 ${base} H308" stroke="${G}"/>
        <path d="M${xc} ${base} V${base - 80}" stroke="${W}" stroke-width="4" ${dash}/>`)
      + T(8, 16, `${nm(a)} ${_num(sa.mu, 1)}`, {a: 'start', c: R}) + T(312, 16, `${nm(b)} ${_num(sb.mu, 1)}`, {a: 'end'})
      + T(clamp(xc, 50, 270), 132, `soglia ${_num(c, 1)}`, {c: G, fs: 13})
      + T(160, 156, 'più a destra = più forte', {c: G, fs: 12});
  }
  function sigmaBell(sig, t, f, col) {
    const base = 112, sc = 6.5, pk = sd => clamp(48 * 6 / sd, 30, 82);
    const p = bellPath(160, sig * sc, pk(sig), base), q = bellPath(160, t * sc, pk(t), base);
    return ink(`<path d="${p} Z" fill="${col}" opacity=".85"/>`)
      + pen(`<path d="${p}" stroke="${W}" stroke-width="5"/><path d="${q}" stroke="${G}" stroke-width="3.5" ${dash}/><path d="M12 ${base} H308" stroke="${G}"/>`)
      + T(8, 16, nm(f), {a: 'start', c: col === R ? R : W}) + T(8, 40, `dubbio ${_num(sig, 1)}`, {a: 'start'})
      + T(312, 16, 'soglia', {a: 'end', c: G}) + T(312, 40, _num(t, 1), {a: 'end', c: G})
      + T(160, 136, 'più larga = più dubbi', {c: G, fs: 12});
  }

  // ---- pile di pallini, uno per match (vuoti = match, pieni = vittorie, crocette = sconfitte) ----
  function dots(kind, A, B, t, a, b) {
    const c = B + t, unit = Math.max(1, Math.ceil(Math.max(A, B, c) / 36)), step = Math.min(16, 288 / Math.max(A / unit, B / unit, c / unit, 1)), x0 = 16;
    const word = {n: 'match', w: 'vittorie', l: 'sconfitte'}[kind];
    const row = (v, y, col) => Array.from({length: Math.round(v / unit)}, (_, i) => {
      const x = x0 + i * step + step / 2;
      const r = Math.min(5, step / 2.6);
      return kind === 'l' ? `<path d="M${x - r} ${y - r} l${2 * r} ${2 * r} M${x + r} ${y - r} l${-2 * r} ${2 * r}" stroke="${col}"/>`
        : `<circle cx="${x}" cy="${y}" r="${r}" stroke="${col}" ${kind === 'w' ? `fill="${col}"` : ''}/>`;
    }).join('');
    const xc = x0 + clamp(c / unit * step, 0, 288);
    return pen(row(A, 40, R) + row(B, 88, W) + `<path d="M${xc} 28 V100" stroke="${W}" stroke-width="4" ${dash}/>`)
      + T(x0, 22, nm(a), {a: 'start', c: R}) + T(304, 22, `${_num(A)} ${word}`, {a: 'end'})
      + T(x0, 70, nm(b), {a: 'start'}) + T(304, 70, `${_num(B)} ${word}`, {a: 'end'})
      + T(clamp(xc, 60, 260), 120, `soglia ${_num(c, 1)}`, {c: G, fs: 13})
      + (unit > 1 ? T(160, 144, `un segno = ${unit} ${word}`, {c: G, fs: 12}) : '');
  }

  // ---- serie aperta: catena di pallini, vittorie di fila a destra (pieni), sconfitte di fila a sinistra (barrati) ----
  function streak(A, B, t, a, b) {
    const c = B + t, z = 160, step = Math.min(14, 135 / Math.max(Math.abs(A), Math.abs(B), Math.abs(c), 1));
    const chain = (v, y, col) => {
      if (!v) return `<circle cx="${z}" cy="${y}" r="3" stroke="${G}"/>`;
      const n = Math.abs(v), sgn = Math.sign(v);
      let s = `<path d="M${z} ${y} H${z + sgn * (n - .5) * step}" stroke="${col}"/>`;
      for (let i = 0; i < n; i++) {
        const x = z + sgn * (i + .5) * step;
        s += v > 0 ? `<circle cx="${x}" cy="${y}" r="${Math.min(5, step / 2.6)}" fill="${col}" stroke="${col}"/>`
          : `<circle cx="${x}" cy="${y}" r="${Math.min(5, step / 2.6)}" fill="${K}" stroke="${col}"/>`;
      }
      return s;
    };
    const xc = z + clamp(c, -16, 16) * step, sg = v => (v > 0 ? '+' : '') + _num(v);
    return pen(`<path d="M${z} 28 V100" stroke="${G}"/>` + chain(A, 44, R) + chain(B, 88, W) + `<path d="M${xc} 30 V58" stroke="${W}" stroke-width="4" ${dash}/>`)
      + T(8, 26, nm(a), {a: 'start', c: R}) + T(312, 26, sg(A), {a: 'end'})
      + T(8, 72, nm(b), {a: 'start'}) + T(312, 72, sg(B), {a: 'end'})
      + T(8, 118, '← perse di fila', {a: 'start', c: G, fs: 12}) + T(312, 118, 'vinte di fila →', {a: 'end', c: G, fs: 12})
      + T(clamp(xc, 50, 270), 144, `soglia ${c > 0 ? '+' : ''}${_num(c, 1)}`, {c: G, fs: 13});
  }

  // ---- KO% e SUB%: il guantone o la presa che si riempiono come un indicatore ----
  function gauge(kind, v, t, f, col) {
    const id = 'tvc' + (++uid), x0 = 128, y0 = 18, top = y0 + (kind === 'ko' ? 12 : 4), bot = y0 + (kind === 'ko' ? 90 : 84);
    // il pugno dell'icona m_ko (tre nocche in alto), ingrandito
    const glove = `M${x0} ${y0 + 54} V${y0 + 30} a12 12 0 0 1 24 0 v-6 a12 12 0 0 1 24 0 v6 a12 12 0 0 1 24 0 v24 a36 36 0 0 1 -36 36 H${x0 + 24} a24 24 0 0 1 -24 -24 Z`;
    const outline = kind === 'ko'
      ? `<path d="${glove}" stroke="${W}" stroke-width="5"/><path d="M${x0 + 24} ${y0 + 30} v14 M${x0 + 48} ${y0 + 30} v14" stroke="${W}"/><path d="M${x0 + 90} ${y0 + 6} l-8 16 M${x0 + 102} ${y0 + 30} h-16" stroke="${W}"/>`
      : `<circle cx="${x0 + 40}" cy="${y0 + 44}" r="40" stroke="${W}" stroke-width="5"/><path d="M${x0 + 8} ${y0 + 52} c12-4 20-16 32-16 s16 8 16 16" stroke="${W}" stroke-width="4"/><path d="M${x0 + 72} ${y0 + 36} c-12 4-20 16-32 16 s-16-8-16-16" stroke="${W}" stroke-width="4"/>`;
    const clip = kind === 'ko' ? `<path d="${glove}"/>` : `<circle cx="${x0 + 40}" cy="${y0 + 44}" r="40"/>`;
    const ty = bot - t * (bot - top), vy = bot - clamp(v, 0, 1) * (bot - top);
    return `<defs><clipPath id="${id}">${clip}</clipPath></defs>`
      + ink(`<rect x="${x0 - 10}" y="${vy}" width="100" height="${bot - vy + 2}" fill="${col}" clip-path="url(#${id})"/>`)
      + pen(outline + `<path d="M${x0 - 14} ${ty} H${x0 + 96}" stroke="${col === W ? R : W}" stroke-width="4" ${dash}/>`)
      + T(8, 40, nm(f), {a: 'start', c: col === R ? R : W}) + T(8, 68, _num(v * 100) + '%', {a: 'start', fs: 22})
      + T(8, 90, kind === 'ko' ? 'vince per KO' : 'vince per presa', {a: 'start', c: G, fs: 12})
      + T(312, ty - 3, 'soglia', {a: 'end', c: G, fs: 13}) + T(312, ty + 14, _num(t * 100) + '%', {a: 'end', c: G, fs: 12})
      + T(160, 146, 'pieno = tutte le vittorie', {c: G, fs: 12});
  }

  // ---- inattività: un calendario, un quadretto per mese, i mesi passati fermo barrati ----
  function calendar(days, t, f, col) {
    const mv = days / 30.44, mt = t / 30.44, rows = clamp(Math.ceil(Math.max(mv, mt + 1) / 12), 1, 4);
    const x0 = 112, y0 = 26, sz = 16, gap = 0.5;
    let s = `<path d="M${x0} ${y0 - 6} H${x0 + 12 * sz}" stroke="${W}" stroke-width="5"/><path d="M${x0 + 40} ${y0 - 14} v12 M${x0 + 152} ${y0 - 14} v12" stroke="${W}"/>`;
    for (let i = 0; i < rows * 12; i++) {
      const x = x0 + (i % 12) * sz, y = y0 + Math.floor(i / 12) * (sz + 4);
      s += `<rect x="${x + gap}" y="${y}" width="${sz - 1}" height="${sz}" stroke="${G}" stroke-width="1.5"/>`;
      if (i + 1 <= mv) s += `<path d="M${x + 3} ${y + 3} l${sz - 7} ${sz - 6} M${x + sz - 4} ${y + 3} l${-(sz - 7)} ${sz - 6}" stroke="${col}" stroke-width="3"/>`;
      else if (i < mv) s += `<path d="M${x + 3} ${y + sz - 3} l${sz - 7} ${-(sz - 6)}" stroke="${col}" stroke-width="3"/>`;
    }
    // la soglia: un taglio sul mese in cui cade
    const ti = Math.min(Math.floor(mt), rows * 12 - 1), tx = x0 + (ti % 12 + (mt - Math.floor(mt))) * sz, tyy = y0 + Math.floor(ti / 12) * (sz + 4);
    s += `<path d="M${tx} ${tyy - 10} V${tyy + sz + 10}" stroke="${col === R ? W : R}" stroke-width="6"/>`;
    const over = mv > rows * 12 ? T(x0 + 12 * sz + 4, y0 + rows * (sz + 4) - 8, '+', {a: 'start', fs: 16}) : '';
    return pen(s) + over
      + T(8, 32, nm(f), {a: 'start', c: col === R ? R : W, fs: 13}) + T(8, 52, 'fermo', {a: 'start', fs: 13}) + T(8, 70, `${_num(days)} giorni`, {a: 'start', fs: 13})
      + T(8, 98, 'soglia', {a: 'start', c: G, fs: 13}) + T(8, 116, `${_num(t)} giorni`, {a: 'start', c: G, fs: 12})
      + T(x0 + 96, 146, 'un quadretto = un mese', {c: G, fs: 12});
  }

  // ---- regole: la gabbia, il guantone, la guardia da kickboxing ----
  const RULES = {g_mma: 'MMA', g_boxing: 'boxe', g_striking: 'kickboxing'};
  function sport(f, yes, x) {
    const col = yes ? W : G, cx = 160, cy = 62;
    let ic;
    if (f === 'g_mma') {   // ottagono con la rete
      const oct = Array.from({length: 8}, (_, i) => { const a = Math.PI / 8 + i * Math.PI / 4; return `${(cx + 46 * Math.cos(a)).toFixed(1)} ${(cy + 46 * Math.sin(a)).toFixed(1)}`; }).join(' L');
      const mesh = Array.from({length: 7}, (_, i) => `M${cx - 60 + i * 20} ${cy - 46} l40 92 M${cx - 20 + i * 20} ${cy - 46} l-40 92`).join(' ');
      const id = 'tvc' + (++uid);
      ic = `<defs><clipPath id="${id}"><path d="M${oct} Z"/></clipPath></defs><path d="${mesh}" stroke="${col}" stroke-width="1.5" clip-path="url(#${id})" opacity=".7"/><path d="M${oct} Z" stroke="${col}" stroke-width="5"/>`;
    } else {
      const body = ICON_PATHS[f === 'g_boxing' ? 'boxe' : 'guardia'].replace(/class="w2"/g, 'stroke-width="2.4"');
      ic = `<g transform="translate(${cx - 48} ${cy - 50}) scale(4)" stroke="${col}" stroke-width="1.1">${body}</g>`;
    }
    const cross = yes ? '' : `<path d="M${cx - 50} ${cy - 50} L${cx + 50} ${cy + 50} M${cx + 50} ${cy - 50} L${cx - 50} ${cy + 50}" stroke="${R}" stroke-width="7"/>`;
    const actual = x.g_boxing ? 'boxe' : x.g_striking ? 'kickboxing' : 'MMA';
    return pen(ic + cross) + T(160, 134, yes ? `regole ${RULES[f]}` : `qui si combatte a ${actual === 'MMA' ? 'regole MMA' : actual}`, {c: yes ? W : G, fs: 14});
  }

  function missing(s) {
    return T(160, 72, '?', {fs: 56, c: G}) + T(160, 120, 'dato mancante', {c: G}) + T(160, 148, `l'albero lo manda sul ${s.right ? 'Sì' : 'No'}`, {c: G, fs: 12});
  }

  // ---- la grafica di un nodo ----
  function graphic(s, a, b) {
    const sa = fighterState(a), sb = fighterState(b), f = s.f, k = f.slice(2), t = s.t;
    if (s.miss) return svg(missing(s), 'dato mancante');
    if (f === 'd_mu') return svg(bells(sa, sb, t, a, b), 'forza e incertezza dei due');
    if (/^[ab]_sigma$/.test(f)) { const me = f[0] === 'a'; return svg(sigmaBell((me ? sa : sb).sigma, t, me ? a : b, me ? R : W), 'incertezza sul rating'); }
    if (/^[ab]_(ko|sub)_rate$/.test(f)) { const me = f[0] === 'a'; return svg(gauge(f.includes('ko') ? 'ko' : 'sub', (me ? sa : sb)[k], t, me ? a : b, me ? R : W), 'quota di vittorie'); }
    if (/^[ab]_inact$/.test(f)) { const me = f[0] === 'a'; return svg(calendar((me ? sa : sb).inact, t, me ? a : b, me ? R : W), 'giorni di inattività'); }
    if (/^g_/.test(f)) return svg(sport(f, !!s.v, treeFeatures(a, b)), 'regole del match');
    if (['n', 'w', 'l'].includes(k)) return svg(dots(k, sa[k], sb[k], t, a, b), 'numero di match');
    if (k === 'streak') return svg(streak(sa.streak, sb.streak, t, a, b), 'serie aperta');
    if (['rp', 'age', 'height', 'kod_rate'].includes(k)) return svg(duel(k, sa[k], sb[k], t, a, b), 'confronto');
    return '';
  }

  // ---- la domanda, corta e senza numeri (i numeri stanno nella grafica) ----
  const NUM = ['zero', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci', 'undici', 'dodici'];
  function durata(days) {
    const m = days / 30.44;
    if (m < 11.5) { const n = Math.max(1, Math.round(m)); return n === 1 ? 'un mese' : `${NUM[n]} mesi`; }
    const y = Math.round(m / 6) / 2, w = Math.floor(y), half = y > w ? ' e mezzo' : '';
    return (w === 1 ? 'un anno' : `${NUM[w] || w} anni`) + half;
  }
  // differenza A − B > t: "più di", "molto più di", oppure (soglia negativa) "almeno quasi come"
  const cmp = (t, small, more, much, almost) => (t > small ? much : t < -small ? almost : more);
  function question(s, a, b) {
    const A = surname(a), B = surname(b), t = s.t, who = s.f[0] === 'a' ? A : B;
    switch (s.f) {
      case 'd_rp': return cmp(t, 30, `${A} ha più punti di rating di ${B}?`, `${A} ha molti più punti di rating di ${B}?`, `${A} ha almeno quasi i punti di ${B}?`);
      case 'd_mu': return cmp(t, 2, `${A} è più forte di ${B} sulla carta?`, `${A} è molto più forte di ${B} sulla carta?`, `${A} regge il confronto con ${B} sulla carta?`);
      case 'a_sigma': case 'b_sigma': return `Su ${who} il modello ha ancora molti dubbi?`;
      case 'd_n': return cmp(t, 3, `${A} ha più match di ${B}?`, `${A} ha molti più match di ${B}?`, `${A} ha almeno quasi i match di ${B}?`);
      case 'd_w': return cmp(t, 3, `${A} ha più vittorie di ${B}?`, `${A} ha molte più vittorie di ${B}?`, `${A} ha almeno quasi le vittorie di ${B}?`);
      case 'd_l': return cmp(t, 3, `${A} ha perso più di ${B}?`, `${A} ha perso molto più di ${B}?`, `${A} ha perso almeno quasi quanto ${B}?`);
      case 'd_streak': return cmp(t, 2, `${A} arriva più in forma di ${B}?`, `${A} arriva molto più in forma di ${B}?`, `${A} arriva in forma almeno quasi come ${B}?`);
      case 'a_ko_rate': case 'b_ko_rate': return t >= .6 ? `${who} vince quasi sempre per KO?` : `${who} vince spesso per KO?`;
      case 'a_sub_rate': case 'b_sub_rate': return t >= .5 ? `${who} vince quasi sempre per sottomissione?` : `${who} vince spesso per sottomissione?`;
      case 'd_kod_rate': return cmp(t, .2, `${A} va KO più spesso di ${B} quando perde?`, `${A} va KO molto più spesso di ${B}?`, `${A} va KO almeno quasi come ${B}?`);
      case 'a_inact': case 'b_inact': return `${who} era fermo da più di ${durata(t)}?`;
      case 'd_age': return cmp(t, 2, `${A} è più vecchio di ${B}?`, `${A} è molto più vecchio di ${B}?`, `${A} ha almeno quasi l'età di ${B}?`);
      case 'd_height': return cmp(t, 3, `${A} è più alto di ${B}?`, `${A} è molto più alto di ${B}?`, `${A} è alto almeno quasi come ${B}?`);
      case 'g_mma': return 'Si combatte con regole MMA?';
      case 'g_boxing': return 'Si combatte a boxe?';
      case 'g_striking': return 'Si combatte a kickboxing?';
    }
    return nodeQuestion(s, a, b);
  }

  // un nodo della catena: grafica sopra, domanda, riquadro Sì/No con il valore vero
  const item = (s, a, b, i) => `<li style="--i:${i}"><span class="ring"></span><div class="q">${graphic(s, a, b)}<p>${esc(question(s, a, b))}</p>
      <small><b class="${s.right ? 'si' : ''}">${s.right ? 'Sì' : 'No'}</b><span>qui: ${esc(nodeValue(s))}</span></small></div></li>`;
  return {item, graphic, question};
})();
