// sim.js — il motore dell'arena: il match si gioca round per round, scambio per scambio.
// Lo STESSO motore gira nel match animato (elementi.html) e nelle 1000 simulazioni.
// Tutto il caso passa da rng() (0..1): Math.random nel match, un generatore con seme per la taratura.
// Serve: wins, fighterState (tree.js), winChance e rulesOf (elementi.html, usati solo da simSetup).

/* --- tattiche: off = vantaggio negli scambi (logit), dmg/take = danno dato/subito, gas = fiato speso,
   kd/kdIn = atterramenti dati/subiti, cut = tagli procurati, sub = prese tentate --- */
const TAC = {
  carica: {label: 'Carica', short: 'Carica', off: .30, dmg: 1.15, take: 1.15, gas: 6, kd: 1.25, kdIn: 1.2, cut: 1.3, sub: 1.4},
  muovi: {label: 'Colpisci e muoviti', short: 'Muoviti', off: .10, dmg: .9, take: .8, gas: 4, kd: .8, kdIn: .8, cut: .9, sub: .7},
  copri: {label: 'Copriti', short: 'Copriti', off: -.35, dmg: .6, take: .55, gas: 2, kd: .5, kdIn: .6, cut: .6, sub: .5},
  ko: {label: 'Cerca il KO', short: 'Cerca KO', off: -.05, dmg: 1.3, take: 1.2, gas: 5.5, kd: 1.9, kdIn: 1.3, cut: 1.2, sub: .8},
};
// sasso-carta-forbice leggero: chi batte chi (Copriti > Carica > Cerca il KO > Colpisci e muoviti > Copriti)
const TAC_BEATS = {copri: 'carica', carica: 'ko', ko: 'muovi', muovi: 'copri'};
const TAC_EDGE = .45;
const tacEdge = (t, u) => (TAC_BEATS[t] === u ? TAC_EDGE : TAC_BEATS[u] === t ? -TAC_EDGE : 0);

// profilo di un fighter: lo stile viene da KO%, SUB%, decisioni, sconfitte, altezza; il livello da rating, record e allungo
function simProfile(f, rules) {
  const W = wins(f), T = W + f.loss, st = fighterState(f);
  const koR = W ? f.ko / W : 0, subR = W ? f.sub / W : 0, decR = W ? f.dec / W : 0, lossR = T ? f.loss / T : .5;
  const cm = f.cm || st.height || 178;
  return {
    base: (st.rp - 1500) / 250 + (T ? (W / T - .5) * 1.2 : 0) + (cm - 178) / 40,   // punto di partenza dello skill gap
    power: .6 + 1.1 * koR,                                            // KO%: atterramenti e danno
    chin: 1.05 - .5 * lossR * (.5 + (st.kod_rate || 0)),              // tenuta: sconfitte, soprattutto prima del limite
    cardio: .85 + .35 * decR,                                         // chi va spesso ai punti ha più fiato
    sub: rules.name === 'MMA' ? subR : 0,                             // SUB%: solo con regole MMA
    subDef: rules.name === 'MMA' && f.sport === 'Boxe' ? 2.5 : 1,     // un pugile in gabbia a terra si difende male
    cm,
  };
}

const sideOf = p => ({p, hp: 100, st: 100, cut: 0, kd: 0, kdR: 0, tac: 'muovi', last: null});
function newBout(pa, pb, rules, gap) {
  return {A: sideOf(pa), B: sideOf(pb), rules, gap, push: 0, r: 0, beat: 0, inRound: false, end: null, rounds: [], rd: [0, 0],
    tot: [[0, 0], [0, 0], [0, 0]]};
}
// danno medio di uno scambio: senza finalizzazioni a fine match ognuno ha perso circa metà vita
const unitDmg = R => 55 / (R.rounds * R.ex);
const gasK = R => 24 / (R.rounds * R.ex);   // fiato per scambio: stesso consumo totale in 12x3' e in 5x5'

function startRound(S, tA, tB) {
  S.r++; S.beat = 0; S.inRound = true; S.rd = [0, 0];
  S.A.tac = tA; S.B.tac = tB; S.A.kdR = S.B.kdR = 0;
}

function stop(S, w, kind, rng, t) {
  const R = S.rules;
  S.end = {w, kind, r: S.r, t: t != null ? t : Math.round((S.beat - 1 + rng()) / R.ex * R.len)};
  if (S.inRound) { S.rounds.push({r: S.r, tA: S.A.tac, tB: S.B.tac, cards: null, kd: [S.B.kdR, S.A.kdR], cut: [S.A.cut, S.B.cut], stop: kind}); S.inRound = false; }
}

// uno scambio. dodge = la schiva del giocatore: il prossimo colpo del blu va quasi a vuoto
// ev: dA/dB = danno preso da A/B, kd = chi va al tappeto, cut = chi si taglia (o peggiora), fin = fine match
function beat(S, rng, dodge) {
  const {A, B, rules: R} = S, U = unitDmg(R), ev = {dA: 0, dB: 0, kd: null, cut: null, fin: false};
  const gas = X => .6 + .4 * X.st / 100, tired = X => 1 + .5 * (1 - X.st / 100);   // il calo di fine match
  let z = S.gap + S.push * 4 + TAC[A.tac].off - TAC[B.tac].off + tacEdge(A.tac, B.tac) + (A.st - B.st) / 125;
  if (A.tac === 'muovi') z += (A.p.cm - B.p.cm) / 60;   // chi gira e colpisce sfrutta l'allungo
  if (B.tac === 'muovi') z -= (B.p.cm - A.p.cm) / 60;
  const sA = 1 / (1 + Math.exp(-z));
  S.beat++;
  const order = rng() < .5 ? [[A, B, sA, 'B'], [B, A, 1 - sA, 'A']] : [[B, A, 1 - sA, 'A'], [A, B, sA, 'B']];
  for (const [X, Y, s, k] of order) {   // X colpisce, Y (lato k) incassa
    const blank = dodge && X === B, w = k === 'A' ? 'B' : 'A';
    const d = U * 2 * s * TAC[X.tac].dmg * TAC[Y.tac].take * (.75 + .25 * X.p.power) * gas(X) * tired(Y) / Y.p.chin * (.5 + rng()) * (blank ? .3 : 1);
    Y.hp -= d; ev['d' + k] += d; S.rd[X === A ? 0 : 1] += d;
    if (blank || S.end) continue;
    if (X.p.sub && rng() < .022 * X.p.sub * 2 * s * TAC[X.tac].sub * Y.p.subDef * tired(Y)) { stop(S, w, 'sub', rng); ev.fin = true; continue; }
    if (!ev.kd && rng() < .026 * 2 * s * TAC[X.tac].kd * TAC[Y.tac].kdIn * X.p.power / Y.p.chin * (Y.hp < 40 ? 1.6 : 1) * tired(Y)) {
      Y.hp -= U * 1.5; Y.kd++; Y.kdR++; ev.kd = k; S.rd[X === A ? 0 : 1] += U;
      const pStop = .12 + .5 * (1 - Math.max(0, Y.hp) / 100) + .2 * (Y.kdR - 1) + (R.name === 'MMA' ? .12 : 0);
      if ((R.name === 'Boxe' && Y.kdR >= 3) || rng() < pStop) { stop(S, w, rng() < .6 ? 'ko' : 'tko', rng); ev.fin = true; continue; }
    }
    if (Y.cut < 3 && rng() < .018 * 2 * s * TAC[X.tac].cut * (Y.cut ? 1.5 : 1)) {
      Y.cut++; ev.cut = k;
      if (Y.cut === 3 && rng() < .25) { stop(S, w, 'doc', rng); ev.fin = true; continue; }   // il medico entra subito
    }
    if (Y.hp <= 0) { Y.hp = 0; stop(S, w, 'tko', rng); ev.fin = true; }
  }
  [A, B].forEach(X => { X.st = Math.max(5, X.st - TAC[X.tac].gas * gasK(R) / X.p.cardio); });
  return ev;
}

const gauss = rng => Math.sqrt(-2 * Math.log(1 - rng())) * Math.cos(2 * Math.PI * rng());
// fine round: i tre giudici (10-9, 10-8 con atterramento, un po' di rumore sui round equilibrati), poi medico e angolo
function endRound(S, rng) {
  const {A, B, rules: R} = S, U = unitDmg(R) * R.ex, net = B.kdR - A.kdR;   // net > 0: atterramenti netti di A
  const cards = [0, 1, 2].map(() => {
    const diff = S.rd[0] - S.rd[1] + net * U + gauss(rng) * U * .35;
    if (Math.abs(diff) < U * .04) return [10, 10];
    const kdW = diff > 0 ? net : -net, lo = kdW >= 3 ? 7 : kdW >= 1 ? 8 : 9;
    return diff > 0 ? [10, lo] : [lo, 10];
  });
  cards.forEach((c, j) => { S.tot[j][0] += c[0]; S.tot[j][1] += c[1]; });
  const rec = {r: S.r, tA: A.tac, tB: B.tac, cards, kd: [B.kdR, A.kdR], cut: [A.cut, B.cut]};
  S.rounds.push(rec); S.inRound = false;
  A.last = A.tac; B.last = B.tac;
  for (const [Y, w] of [[A, 'B'], [B, 'A']]) {
    if (S.end || S.r >= R.rounds) break;   // dopo l'ultimo gong decidono i cartellini
    if (Y.cut >= 2 && rng() < (Y.cut >= 3 ? .4 : .05)) stop(S, w, 'doc', rng, R.len);
    else if (Y.hp < 15 && rng() < .35) stop(S, w, 'rtd', rng, R.len);
  }
  if (!S.end && S.r >= R.rounds) decide(S);
  [A, B].forEach(X => { X.st = Math.min(100, X.st + 6 * 12 / R.rounds); X.hp = Math.min(100, X.hp + 1.5); });
  return rec;
}

// al limite: il verdetto è la somma dei cartellini
function decide(S) {
  const v = S.tot.map(([x, y]) => Math.sign(x - y)), a = v.filter(x => x > 0).length, b = v.filter(x => x < 0).length;
  const hi = Math.max(a, b), lo = Math.min(a, b);
  const t = S.rules.len;
  if (a === b) return (S.end = {w: null, kind: 'draw', r: S.r, t, how: a === 0 ? 'Pareggio unanime' : 'Pareggio (decisione divisa)'});
  if (hi === 1) return (S.end = {w: null, kind: 'draw', r: S.r, t, how: 'Pareggio di maggioranza'});
  S.end = {w: a > b ? 'A' : 'B', kind: 'dec', r: S.r, t, how: hi === 3 ? 'Decisione unanime' : lo === 1 ? 'Decisione divisa' : 'Decisione di maggioranza'};
}

const pickW = (w, rng) => { const ks = Object.keys(w); let r = rng() * ks.reduce((s, k) => s + w[k], 0); return ks.find(k => (r -= w[k]) < 0) || ks[0]; };
// tattica automatica: stile (KO%, SUB%, fiato), sport, cartellini e stato del match, e un po' di contromossa
function autoTac(S, k, rng) {
  const me = S[k], op = S[k === 'A' ? 'B' : 'A'], p = me.p, R = S.rules, n = S.r + 1;
  const w = {carica: 1 + 2 * p.sub, muovi: 1 + (p.cardio - .85) * 4 + (R.name === 'Boxe' ? .3 : 0), copri: .5, ko: .5 + (p.power - .6) * 1.4};
  const lead = S.tot.reduce((s, t) => s + Math.sign(k === 'A' ? t[0] - t[1] : t[1] - t[0]), 0);
  if (n > R.rounds * .6) {
    if (lead < 0) { w.ko *= 2; w.carica *= 1.6; w.copri *= .3; }
    else if (lead > 0) { w.muovi *= 1.8; w.copri *= 1.6; w.ko *= .5; }
  }
  if (me.st < 35) { w.copri *= 2.5; w.carica *= .4; w.ko *= .6; }
  if (me.hp < 35) w.copri *= 2;
  if (op.hp < 35) w.ko *= 2;
  if (op.last) for (const t in TAC_BEATS) if (TAC_BEATS[t] === op.last) w[t] *= 1.6;
  return pickW(w, rng);
}

// finisce il match da dove è (anche a metà round) con le tattiche automatiche
function finishRest(S, rng) {
  while (!S.end) {
    if (!S.inRound) startRound(S, autoTac(S, 'A', rng), autoTac(S, 'B', rng));
    while (!S.end && S.beat < S.rules.ex) beat(S, rng);
    if (!S.end) endRound(S, rng);
  }
  return S;
}

/* --- taratura: lo skill gap tale che, su tanti match, A vinca quanto dice winChance --- */
function mulberry32(a) {
  return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
// quota di vittorie di A sui match con un vincitore (i pari restano a parte)
function shareA(pa, pb, rules, gap, n, rng) {
  let a = 0, b = 0;
  for (let i = 0; i < n; i++) { const w = finishRest(newBout(pa, pb, rules, gap), rng).end.w; if (w === 'A') a++; else if (w === 'B') b++; }
  return a / (a + b || 1);
}
// ponytail: bisezione su 500 match col seme fisso (stessi numeri casuali a ogni prova); 5000 match, una volta per coppia
function calibrate(pa, pb, rules, target) {
  const base = pa.base - pb.base;
  let lo = base - 6, hi = base + 6;
  for (let i = 0; i < 10; i++) { const m = (lo + hi) / 2; if (shareA(pa, pb, rules, m, 500, mulberry32(20261015)) < target) lo = m; else hi = m; }
  return {gap: (lo + hi) / 2, base};
}
const SIM_CACHE = {};
function simSetup(a, b) {
  const key = a.id + '|' + b.id;
  if (SIM_CACHE[key]) return SIM_CACHE[key];
  const R0 = rulesOf(a, b), rules = {...R0, ex: R0.rounds <= 5 ? 3 : 2};   // scambi per round: come l'animazione
  const pa = simProfile(a, rules), pb = simProfile(b, rules), target = winChance(a, b);
  return (SIM_CACHE[key] = {pa, pb, rules, target, ...calibrate(pa, pb, rules, target)});
}

/* --- molte simulazioni senza animazione, a blocchi per non bloccare la pagina ---
   ponytail: setTimeout a blocchi da 100 invece del Web Worker: 1000 match sono ~20 ms e da file:// il Worker non parte */
function simMany(cal, n, onStep, onDone) {
  const R = cal.rules, res = {n, A: {ko: 0, sub: 0, dec: 0, doc: 0}, B: {ko: 0, sub: 0, dec: 0, doc: 0}, draw: 0, hist: Array(R.rounds + 1).fill(0)};
  let done = 0;
  const chunk = () => {
    for (let i = 0; i < 100 && done < n; i++, done++) {
      const e = finishRest(newBout(cal.pa, cal.pb, R, cal.gap), Math.random).end;
      if (e.kind === 'draw') res.draw++;
      else res[e.w][{ko: 'ko', tko: 'ko', rtd: 'ko'}[e.kind] || e.kind]++;
      res.hist[e.kind === 'dec' || e.kind === 'draw' ? R.rounds : e.r - 1]++;
    }
    onStep(done);
    if (done < n) setTimeout(chunk, 0); else onDone(res);
  };
  setTimeout(chunk, 0);
}
