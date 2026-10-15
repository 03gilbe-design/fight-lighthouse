// Pronostico "Come andrà": i due decision tree (vincitore e metodo) addestrati sui match fino al 2018
// e provati su quelli dal 2019 (vincitore giusto 7 volte su 10). Le feature sono le stesse della pipeline:
// valori PRIMA del match, d_X = A meno B. Il match è ipotetico: ognuno entra com'era al suo ultimo incontro
// (età a quella data, inattività = pausa prima di quell'ultimo match).
// I dati dei tree li scrive make_ratings.py nella riga marcata <TREES>.
const TREES = {"features":["d_rp","d_mu","a_sigma","b_sigma","d_n","d_w","d_l","d_streak","a_ko_rate","b_ko_rate","a_sub_rate","b_sub_rate","d_kod_rate","a_inact","b_inact","d_age","d_height","g_mma","g_boxing","g_striking"],"winner":{"classes":["b_vince","a_vince"],"nodes":[{"f":"d_rp","t":-12.5,"l":1,"r":56,"nan_left":false},{"f":"d_mu","t":-6.2308,"l":2,"r":31,"nan_left":true},{"f":"d_age","t":5.525,"l":3,"r":16,"nan_left":false},{"f":"d_streak","t":-5.5,"l":4,"r":9,"nan_left":false},{"f":"d_mu","t":-10.367,"l":5,"r":8,"nan_left":true},{"f":"d_streak","t":-21.5,"l":6,"r":7,"nan_left":false},{"leaf":[0.9333,0.0667],"n":210},{"leaf":[0.8289,0.1711],"n":947},{"leaf":[0.7235,0.2765],"n":358},{"f":"d_mu","t":-14.4954,"l":10,"r":13,"nan_left":false},{"f":"d_n","t":-31.5,"l":11,"r":12,"nan_left":true},{"leaf":[0.7154,0.2846],"n":513},{"leaf":[0.8234,0.1766],"n":402},{"f":"a_sigma","t":6.9359,"l":14,"r":15,"nan_left":true},{"leaf":[0.697,0.303],"n":1241},{"leaf":[0.5899,0.4101],"n":1034},{"f":"d_streak","t":-1.5,"l":17,"r":24,"nan_left":true},{"f":"g_boxing","t":0.5,"l":18,"r":21,"nan_left":false},{"f":"a_inact","t":805.5,"l":19,"r":20,"nan_left":false},{"leaf":[0.8361,0.1639],"n":5559},{"leaf":[0.8967,0.1033],"n":6264},{"f":"d_l","t":-0.5,"l":22,"r":23,"nan_left":false},{"leaf":[0.904,0.096],"n":5800},{"leaf":[0.9646,0.0354],"n":6694},{"f":"d_l","t":-9.5,"l":25,"r":28,"nan_left":false},{"f":"d_mu","t":-9.4976,"l":26,"r":27,"nan_left":true},{"leaf":[0.7742,0.2258],"n":1311},{"leaf":[0.6537,0.3463],"n":618},{"f":"a_sigma","t":7.8562,"l":29,"r":30,"nan_left":false},{"leaf":[0.7638,0.2362],"n":1698},{"leaf":[0.8622,0.1378],"n":4602},{"f":"a_sigma","t":8.066,"l":32,"r":45,"nan_left":true},{"f":"d_age","t":-5.355,"l":33,"r":38,"nan_left":false},{"f":"d_mu","t":0.4438,"l":34,"r":37,"nan_left":true},{"f":"b_inact","t":138.5,"l":35,"r":36,"nan_left":false},{"leaf":[0.4545,0.5455],"n":539},{"leaf":[0.3207,0.6793],"n":396},{"leaf":[0.2283,0.7717],"n":276},{"f":"d_streak","t":-1.5,"l":39,"r":42,"nan_left":false},{"f":"d_age","t":3.015,"l":40,"r":41,"nan_left":false},{"leaf":[0.5749,0.4251],"n":1002},{"leaf":[0.7129,0.2871],"n":2550},{"f":"d_mu","t":-3.1301,"l":43,"r":44,"nan_left":false},{"leaf":[0.6135,0.3865],"n":2409},{"leaf":[0.4992,0.5008],"n":3828},{"f":"d_l","t":-6.5,"l":46,"r":51,"nan_left":false},{"f":"d_l","t":-19.5,"l":47,"r":48,"nan_left":false},{"leaf":[0.5322,0.4678],"n":295},{"f":"g_boxing","t":0.5,"l":49,"r":50,"nan_left":true},{"leaf":[0.7229,0.2771],"n":895},{"leaf":[0.6078,0.3922],"n":204},{"f":"d_age","t":11.105,"l":52,"r":53,"nan_left":false},{"leaf":[0.6316,0.3684],"n":247},{"f":"d_l","t":-1.5,"l":54,"r":55,"nan_left":false},{"leaf":[0.8213,0.1787],"n":2266},{"leaf":[0.8952,0.1048],"n":3912},{"f":"d_mu","t":4.5113,"l":57,"r":84,"nan_left":false},{"f":"b_inact","t":381.5,"l":58,"r":71,"nan_left":false},{"f":"d_age","t":4.135,"l":59,"r":66,"nan_left":true},{"f":"a_inact","t":375.5,"l":60,"r":63,"nan_left":false},{"f":"d_mu","t":-0.6362,"l":61,"r":62,"nan_left":false},{"leaf":[0.5381,0.4619],"n":1102},{"leaf":[0.4171,0.5829],"n":5152},{"f":"d_rp","t":21.5,"l":64,"r":65,"nan_left":false},{"leaf":[0.7182,0.2818],"n":369},{"leaf":[0.5359,0.4641],"n":571},{"f":"d_mu","t":-1.2449,"l":67,"r":68,"nan_left":false},{"leaf":[0.7345,0.2655],"n":339},{"f":"a_sigma","t":6.0322,"l":69,"r":70,"nan_left":true},{"leaf":[0.616,0.384],"n":940},{"leaf":[0.4476,0.5524],"n":210},{"f":"a_inact","t":829.5,"l":72,"r":79,"nan_left":false},{"f":"a_sigma","t":6.1064,"l":73,"r":76,"nan_left":false},{"f":"d_n","t":28.5,"l":74,"r":75,"nan_left":true},{"leaf":[0.3215,0.6785],"n":1042},{"leaf":[0.4529,0.5471],"n":552},{"f":"d_age","t":-8.725,"l":77,"r":78,"nan_left":true},{"leaf":[0.1663,0.8337],"n":4666},{"leaf":[0.4762,0.5238],"n":252},{"f":"d_streak","t":0.5,"l":80,"r":83,"nan_left":true},{"f":"g_mma","t":0.5,"l":81,"r":82,"nan_left":false},{"leaf":[0.5098,0.4902],"n":1577},{"leaf":[0.4985,0.5015],"n":1950},{"leaf":[0.3772,0.6228],"n":281},{"f":"d_age","t":-2.825,"l":85,"r":100,"nan_left":true},{"f":"d_streak","t":1.5,"l":86,"r":93,"nan_left":false},{"f":"b_sigma","t":7.71,"l":87,"r":90,"nan_left":false},{"f":"d_mu","t":9.3851,"l":88,"r":89,"nan_left":true},{"leaf":[0.3721,0.6279],"n":1411},{"leaf":[0.2297,0.7703],"n":1023},{"f":"d_l","t":9.5,"l":91,"r":92,"nan_left":true},{"leaf":[0.1499,0.8501],"n":6051},{"leaf":[0.2634,0.7366],"n":1754},{"f":"g_boxing","t":0.5,"l":94,"r":97,"nan_left":true},{"f":"d_rp","t":155.5,"l":95,"r":96,"nan_left":false},{"leaf":[0.3188,0.6812],"n":828},{"leaf":[0.134,0.866],"n":13457},{"f":"d_l","t":2.5,"l":98,"r":99,"nan_left":true},{"leaf":[0.0502,0.9498],"n":9634},{"leaf":[0.1191,0.8809],"n":3669},{"f":"d_mu","t":10.8133,"l":101,"r":108,"nan_left":true},{"f":"d_age","t":4.615,"l":102,"r":105,"nan_left":true},{"f":"b_sigma","t":5.5789,"l":103,"r":104,"nan_left":false},{"leaf":[0.3089,0.6911],"n":654},{"leaf":[0.3912,0.6088],"n":1176},{"f":"d_w","t":5.5,"l":106,"r":107,"nan_left":false},{"leaf":[0.3803,0.6197],"n":213},{"leaf":[0.5311,0.4689],"n":659},{"f":"d_streak","t":8.5,"l":109,"r":112,"nan_left":true},{"f":"d_mu","t":22.2528,"l":110,"r":111,"nan_left":true},{"leaf":[0.2902,0.7098],"n":1444},{"leaf":[0.1184,0.8816],"n":228},{"f":"d_w","t":18.5,"l":113,"r":114,"nan_left":false},{"leaf":[0.1417,0.8583],"n":240},{"leaf":[0.0876,0.9124],"n":354}]},"method":{"classes":["DEC","KO","SUB"],"nodes":[{"f":"g_mma","t":0.5,"l":1,"r":64,"nan_left":true},{"f":"g_boxing","t":0.5,"l":2,"r":33,"nan_left":false},{"f":"b_ko_rate","t":0.4205,"l":3,"r":18,"nan_left":true},{"f":"a_ko_rate","t":0.3395,"l":4,"r":11,"nan_left":true},{"f":"a_inact","t":286.5,"l":5,"r":8,"nan_left":false},{"f":"b_inact","t":280.5,"l":6,"r":7,"nan_left":false},{"leaf":[0.833,0.1668,0.0002],"n":5864},{"leaf":[0.7154,0.2838,0.0008],"n":3893},{"f":"b_ko_rate","t":0.2136,"l":9,"r":10,"nan_left":true},{"leaf":[0.7312,0.2688,0.0],"n":3809},{"leaf":[0.6261,0.3735,0.0005],"n":2126},{"f":"b_sigma","t":7.8161,"l":12,"r":15,"nan_left":false},{"f":"d_mu","t":10.0721,"l":13,"r":14,"nan_left":true},{"leaf":[0.6989,0.3011,0.0],"n":2142},{"leaf":[0.5683,0.4317,0.0],"n":864},{"f":"a_ko_rate","t":0.6047,"l":16,"r":17,"nan_left":true},{"leaf":[0.5382,0.4609,0.0008],"n":2393},{"leaf":[0.3799,0.6201,0.0],"n":1524},{"f":"a_sigma","t":7.8305,"l":19,"r":26,"nan_left":true},{"f":"a_ko_rate","t":0.58,"l":20,"r":23,"nan_left":true},{"f":"d_mu","t":-12.3315,"l":21,"r":22,"nan_left":false},{"leaf":[0.5147,0.4853,0.0],"n":579},{"leaf":[0.6547,0.3453,0.0],"n":2702},{"f":"d_rp","t":333.5,"l":24,"r":25,"nan_left":true},{"leaf":[0.4991,0.5009,0.0],"n":1082},{"leaf":[0.3125,0.6875,0.0],"n":240},{"f":"b_ko_rate","t":0.589,"l":27,"r":30,"nan_left":false},{"f":"d_streak","t":-1.5,"l":28,"r":29,"nan_left":true},{"leaf":[0.4638,0.5362,0.0],"n":940},{"leaf":[0.586,0.414,0.0],"n":756},{"f":"d_mu","t":-6.5756,"l":31,"r":32,"nan_left":true},{"leaf":[0.3214,0.6786,0.0],"n":1089},{"leaf":[0.4814,0.5186,0.0],"n":727},{"f":"a_ko_rate","t":0.6973,"l":34,"r":49,"nan_left":true},{"f":"b_ko_rate","t":0.6531,"l":35,"r":42,"nan_left":true},{"f":"a_ko_rate","t":0.5531,"l":36,"r":39,"nan_left":true},{"f":"a_inact","t":1112.5,"l":37,"r":38,"nan_left":false},{"leaf":[0.6145,0.3854,0.0002],"n":11506},{"leaf":[0.4852,0.5148,0.0],"n":7149},{"f":"b_sigma","t":7.1654,"l":40,"r":41,"nan_left":false},{"leaf":[0.6336,0.3664,0.0],"n":423},{"leaf":[0.397,0.603,0.0],"n":3657},{"f":"a_sigma","t":7.1426,"l":43,"r":46,"nan_left":false},{"f":"d_kod_rate","t":0.3944,"l":44,"r":45,"nan_left":true},{"leaf":[0.5438,0.4562,0.0],"n":1039},{"leaf":[0.3716,0.6284,0.0],"n":261},{"f":"b_ko_rate","t":0.7671,"l":47,"r":48,"nan_left":false},{"leaf":[0.3449,0.6551,0.0],"n":3105},{"leaf":[0.2381,0.7619,0.0],"n":4934},{"f":"b_sigma","t":7.1751,"l":50,"r":57,"nan_left":false},{"f":"b_ko_rate","t":0.7947,"l":51,"r":54,"nan_left":true},{"f":"d_streak","t":6.5,"l":52,"r":53,"nan_left":true},{"leaf":[0.5211,0.4789,0.0],"n":1044},{"leaf":[0.398,0.602,0.0],"n":407},{"f":"d_streak","t":-1.5,"l":55,"r":56,"nan_left":true},{"leaf":[0.2381,0.7619,0.0],"n":252},{"leaf":[0.3609,0.6391,0.0],"n":230},{"f":"a_ko_rate","t":0.8129,"l":58,"r":61,"nan_left":false},{"f":"d_kod_rate","t":-0.6181,"l":59,"r":60,"nan_left":false},{"leaf":[0.1802,0.8198,0.0],"n":444},{"leaf":[0.3388,0.6612,0.0],"n":2692},{"f":"d_streak","t":1.5,"l":62,"r":63,"nan_left":false},{"leaf":[0.2986,0.7002,0.0012],"n":844},{"leaf":[0.1974,0.8026,0.0],"n":3110},{"f":"d_age","t":-12.315,"l":65,"r":94,"nan_left":true},{"f":"a_ko_rate","t":0.5179,"l":66,"r":81,"nan_left":true},{"f":"b_ko_rate","t":0.4152,"l":67,"r":74,"nan_left":true},{"f":"a_sub_rate","t":0.5981,"l":68,"r":71,"nan_left":true},{"f":"b_sub_rate","t":0.4068,"l":69,"r":70,"nan_left":true},{"leaf":[0.2859,0.3597,0.3544],"n":10584},{"leaf":[0.2434,0.2732,0.4834],"n":5275},{"f":"b_sigma","t":7.1609,"l":72,"r":73,"nan_left":false},{"leaf":[0.343,0.2619,0.3951],"n":691},{"leaf":[0.1815,0.2603,0.5582],"n":3250},{"f":"a_sub_rate","t":0.0507,"l":75,"r":78,"nan_left":true},{"f":"b_sub_rate","t":0.3274,"l":76,"r":77,"nan_left":true},{"leaf":[0.2216,0.5211,0.2572],"n":3880},{"leaf":[0.1595,0.4335,0.407],"n":1511},{"f":"a_sub_rate","t":0.6519,"l":79,"r":80,"nan_left":true},{"leaf":[0.3686,0.3665,0.2648],"n":944},{"leaf":[0.2429,0.3729,0.3842],"n":531},{"f":"b_sub_rate","t":0.2367,"l":82,"r":89,"nan_left":true},{"f":"b_sigma","t":6.7656,"l":83,"r":86,"nan_left":false},{"f":"b_ko_rate","t":0.6414,"l":84,"r":85,"nan_left":true},{"leaf":[0.3857,0.471,0.1433],"n":293},{"leaf":[0.186,0.6783,0.1357],"n":258},{"f":"d_rp","t":389.5,"l":87,"r":88,"nan_left":true},{"leaf":[0.194,0.5158,0.2902],"n":2815},{"leaf":[0.1865,0.6036,0.2099],"n":1115},{"f":"d_mu","t":5.8672,"l":90,"r":93,"nan_left":true},{"f":"b_sub_rate","t":0.6619,"l":91,"r":92,"nan_left":true},{"leaf":[0.3218,0.3799,0.2983],"n":637},{"leaf":[0.1982,0.326,0.4758],"n":227},{"leaf":[0.3275,0.5371,0.1354],"n":229},{"f":"b_ko_rate","t":0.4055,"l":95,"r":110,"nan_left":true},{"f":"a_ko_rate","t":0.4871,"l":96,"r":103,"nan_left":true},{"f":"b_sub_rate","t":0.6962,"l":97,"r":100,"nan_left":true},{"f":"b_sigma","t":7.3337,"l":98,"r":99,"nan_left":true},{"leaf":[0.5129,0.2356,0.2515],"n":3578},{"leaf":[0.355,0.2528,0.3923],"n":724},{"f":"a_inact","t":63.5,"l":101,"r":102,"nan_left":true},{"leaf":[0.3009,0.1348,0.5643],"n":319},{"leaf":[0.3885,0.2033,0.4082],"n":610},{"f":"b_sub_rate","t":0.5742,"l":104,"r":107,"nan_left":true},{"f":"b_sigma","t":7.78,"l":105,"r":106,"nan_left":true},{"leaf":[0.4395,0.3556,0.2049],"n":1181},{"leaf":[0.2512,0.5163,0.2326],"n":215},{"f":"a_inact","t":97.5,"l":108,"r":109,"nan_left":false},{"leaf":[0.2065,0.3806,0.413],"n":247},{"leaf":[0.3372,0.3718,0.2911],"n":347},{"f":"a_ko_rate","t":0.4428,"l":111,"r":118,"nan_left":true},{"f":"b_ko_rate","t":0.8111,"l":112,"r":115,"nan_left":true},{"f":"a_sub_rate","t":0.5228,"l":113,"r":114,"nan_left":true},{"leaf":[0.4414,0.3539,0.2047],"n":1407},{"leaf":[0.3329,0.3479,0.3192],"n":730},{"f":"b_inact","t":118.5,"l":116,"r":117,"nan_left":false},{"leaf":[0.2587,0.4279,0.3134],"n":201},{"leaf":[0.2415,0.5362,0.2222],"n":207},{"f":"b_ko_rate","t":0.6511,"l":119,"r":122,"nan_left":true},{"f":"b_sub_rate","t":0.2317,"l":120,"r":121,"nan_left":false},{"leaf":[0.4152,0.4212,0.1637],"n":501},{"leaf":[0.2826,0.4723,0.2451],"n":506},{"f":"d_kod_rate","t":0.2865,"l":123,"r":124,"nan_left":true},{"leaf":[0.3235,0.5412,0.1353],"n":680},{"leaf":[0.1836,0.628,0.1884],"n":207}]}}; // <TREES>

const TREE_ACC = 0.707;   // accuracy del tree vincitore sui match dal 2019 (metrics.json)
const _days = (a, b) => Math.round((b - a) / 864e5);
const _date = s => { const m = String(s || '').match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? new Date(+m[1], m[2] - 1, +m[3]) : null; };
// "03·04·1998" o "??·??·1999" -> data (giorno/mese ignoti = metà anno)
const _born = s => { const p = String(s || '').split('·'); return /^\d{4}$/.test(p[2]) ? new Date(+p[2], +p[1] - 1 || 6, +p[0] || 1) : null; };
// "mm/yyyy" -> data a metà mese (le date dei meme)
const _month = s => { const m = String(s || '').match(/^(\d{1,2})\/(\d{4})$/); return m ? new Date(+m[2], +m[1] - 1, 15) : null; };

// stato di un fighter al suo ultimo match
function fighterState(f) {
  const H = f.history || [], last = H[H.length - 1];
  if (f.os) {   // fighter vero: stato OpenSkill dal database (ratings.js)
    const s = f.os, d = _date(s.last), b = _born(f.born);
    return {rp: last ? last.rp : 1000, mu: s.mu, sigma: s.sigma, n: s.n, w: s.w, l: s.l, streak: s.streak,
            ko_rate: s.w ? s.kow / s.w : 0, sub_rate: s.w ? s.subw / s.w : 0, kod_rate: s.l ? s.kol / s.l : 0,
            inact: s.gap, age: b && d ? _days(b, d) / 365.25 : null, height: f.cm || s.height};
  }
  // meme: tutto dai match inventati di data.js
  let w = 0, l = 0, streak = 0, kow = 0, subw = 0, kol = 0;
  H.forEach(h => {
    const k = methodKind(h.method);
    if (h.res === 'W') { w++; streak = streak > 0 ? streak + 1 : 1; kow += k === 'ko'; subw += k === 'sub'; }
    else if (h.res === 'L') { l++; streak = streak < 0 ? streak - 1 : -1; kol += k === 'ko'; }
    else streak = 0;
  });
  const n = w + l, rp = last ? last.rp : 1000;
  // ponytail: sigma dal numero di match con la curva dei fighter veri (8,3 all'esordio, ~5 dopo 20, ~3,8 dopo 60); mu di conseguenza dal rating
  const sigma = 25 / 3 / Math.sqrt(1 + 0.09 * n), mu = (rp - 1000) / 25 + 3 * sigma;
  const d1 = last && _month(last.date), d0 = H.length > 1 && _month(H[H.length - 2].date), b = _born(f.born);
  return {rp, mu, sigma, n, w, l, streak, ko_rate: w ? kow / w : 0, sub_rate: w ? subw / w : 0, kod_rate: l ? kol / l : 0,
          inact: d0 && d1 ? _days(d0, d1) : null, age: b && d1 ? _days(b, d1) / 365.25 : null, height: f.cm};
}

function treeFeatures(a, b) {
  const A = fighterState(a), B = fighterState(b), x = {};
  ['rp', 'mu', 'n', 'w', 'l', 'streak', 'kod_rate', 'age', 'height'].forEach(k =>
    (x['d_' + k] = A[k] == null || B[k] == null ? null : A[k] - B[k]));
  ['sigma', 'ko_rate', 'sub_rate', 'inact'].forEach(k => { x['a_' + k] = A[k]; x['b_' + k] = B[k]; });
  // regole come nell'arena: due pugili = boxe, altrimenti MMA
  const box = a.sport === 'Boxe' && b.sport === 'Boxe', kick = a.sport === 'Kickboxing' && b.sport === 'Kickboxing';   // due kickboxer: regole da striking
  Object.assign(x, {g_mma: box || kick ? 0 : 1, g_boxing: box ? 1 : 0, g_striking: kick ? 1 : 0});
  return x;
}

// scikit-learn: valore <= soglia va a sinistra; valore mancante segue nan_left
function walkTree(tree, x) {
  const path = [];
  let i = 0, nd = tree.nodes[0];
  while (!nd.leaf) {
    const v = x[nd.f], miss = v == null || Number.isNaN(v), right = miss ? !nd.nan_left : v > nd.t;
    path.push({f: nd.f, t: nd.t, v, miss, right});
    i = right ? nd.r : nd.l; nd = tree.nodes[i];
  }
  const p = {}; tree.classes.forEach((c, k) => (p[c] = nd.leaf[k]));
  return {path, p, n: nd.n};
}

function predictFight(a, b) {
  const x = treeFeatures(a, b), W = walkTree(TREES.winner, x), M = walkTree(TREES.method, x);
  return {pA: W.p.a_vince, method: {KO: M.p.KO, SUB: M.p.SUB, DEC: M.p.DEC}, win: W, met: M, x};
}

// la domanda di un nodo, leggibile: numeri con la virgola, quote in percentuale, giorni interi
const _num = (v, d = 0) => (Math.round(v * 10 ** d) / 10 ** d).toLocaleString('it-IT').replace('-', '−');
function nodeQuestion(s, a, b) {
  const A = surname(a), B = surname(b), t = s.t;
  const Q = {
    d_rp: `Differenza di rating (${A} − ${B}) > ${_num(t)}?`,
    d_mu: `Differenza di forza OpenSkill μ (${A} − ${B}) > ${_num(t, 1)}?`,
    a_sigma: `Incertezza sul rating di ${A} (σ) > ${_num(t, 1)}?`,
    b_sigma: `Incertezza sul rating di ${B} (σ) > ${_num(t, 1)}?`,
    d_n: `${A} ha più di ${_num(t)} match di ${B}?`,
    d_w: `${A} ha più di ${_num(t)} vittorie di ${B}?`,
    d_l: `${A} ha più di ${_num(t)} sconfitte di ${B}?`,
    d_streak: `Serie in corso (${A} − ${B}) > ${_num(t, 1)}?`,
    a_ko_rate: `${A} vince per KO più del ${_num(t * 100)}% delle volte?`,
    b_ko_rate: `${B} vince per KO più del ${_num(t * 100)}% delle volte?`,
    a_sub_rate: `${A} vince per sottomissione più del ${_num(t * 100)}% delle volte?`,
    b_sub_rate: `${B} vince per sottomissione più del ${_num(t * 100)}% delle volte?`,
    d_kod_rate: `KO subiti (${A} − ${B}) > ${_num(t * 100)}% delle sconfitte?`,
    a_inact: `${A} era fermo da più di ${_num(t)} giorni?`,
    b_inact: `${B} era fermo da più di ${_num(t)} giorni?`,
    d_age: `Differenza di età (${A} − ${B}) > ${_num(t, 1)} anni?`,
    d_height: `Differenza di altezza (${A} − ${B}) > ${_num(t)} cm?`,
    g_mma: 'Si combatte con regole MMA?',
    g_boxing: 'Si combatte con regole da boxe?',
    g_striking: 'Si combatte a kickboxing o muay thai?',
  };
  return Q[s.f] || `${s.f} > ${_num(t, 2)}?`;
}
// il valore vero del match per quel nodo, nella stessa unità della domanda
function nodeValue(s) {
  if (s.miss) return 'dato mancante';
  if (/^g_/.test(s.f)) return s.v ? 'sì' : 'no';
  if (/rate$/.test(s.f)) return _num(s.v * 100) + '%';
  return _num(s.v, /sigma|mu|age|streak/.test(s.f) ? 1 : 0);
}
