// Dati, bandiere e icone comuni a tutte le pagine del concept.
// ponytail: dati a mano per il prototipo; nel sito vero = fighters.php / h2h.php / rating_history.php

const FIGHTERS = [
  {id: 'debuttante', moments: [{src: 'debuttante_6', look: 'L', type: 'W', cap: "In piedi sopra Esse3 (era un sogno)"}, {src: 'debuttante_5', look: 'L', type: 'D', cap: "Testa a testa con Analisi 2, rinviato"}, {src: 'debuttante_1', nocut: true, look: 'L', pos: '50% 22%', type: 'W', cap: "Sopra l'avversario · L'Informatizzato, 09/2024"}, {src: 'debuttante_4', look: 'L', pos: '45% 35%', type: 'P', cap: "Fuori dal bar, «sto fumando»"}, {src: 'debuttante_2', pos: '72% 30%', type: 'P', cap: "In azione, alle 4 di notte"}, {src: 'debuttante_3', pos: '50% 72%', type: 'P', cap: "The only limit is Esse3"}, {src: 'debuttante_7', look: 'C', pos: '50% 35%', type: 'W', cap: "Batte la carbonara ai punti (cappello da chef Clementoni, età 8+)"}, {src: 'debuttante_8', look: 'C', pos: '50% 35%', type: 'D', cap: "Masterchef contro Esse3: rinviato a domani"}, {src: 'debuttante_9', nocut: true, pos: '40% 40%', type: 'P', cap: "Allenamento col suo omonimo: il sacco. Per una volta è lui a colpire"}, {src: 'debuttante_10', nocut: true, pos: '50% 35%', type: 'W', cap: "In guardia sul ring: l'avversario non si è presentato, vittoria a tavolino (la 2ª in carriera)"}, {src: 'debuttante_11', nocut: true, pos: '45% 30%', type: 'L', cap: "Appoggiato alle corde: l'angolo gli dice di respirare, lui chiede se vale come cardio"}, {src: 'debuttante_12', nocut: true, pos: '50% 25%', type: 'W', cap: "L'urlo prima del gong: lo sentono fino a Verona Porta Nuova, l'avversario no"}, {src: 'debuttante_13', nocut: true, pos: '45% 35%', type: 'P', cap: "Servizio fotografico: il pugno verso l'obiettivo è il colpo più preciso della sua carriera"}, {src: 'debuttante_14', nocut: true, pos: '45% 30%', type: 'P', cap: "Alle corde con la giacca addosso: è arrivato in palestra, ma solo per il wifi"}, {src: 'debuttante_15', nocut: true, pos: '45% 50%', type: 'P', cap: "Allenamento sott'acqua come Ali: ha finito l'aria al primo jab, l'acqua ha vinto ai punti"}, {src: 'debuttante_16', nocut: true, pos: '50% 25%', type: 'P', cap: "Lo sguardo vero, in palestra, a fine allenamento: per una volta nessun filtro e nessun avversario"}, {src: 'debuttante_17', nocut: true, pos: '50% 20%', type: 'P', cap: "Copertina di The Ring, edizione speciale: unico pugile in copertina con 23 sconfitte e l'asciugamano già pronto"}, {src: 'debuttante_18', nocut: true, pos: '50% 30%', type: 'P', cap: "Esquire, The Passion of Manuel: le frecce sono le scadenze di Esse3"}, {src: 'debuttante_19', nocut: true, pos: '50% 35%', type: 'P', cap: "TIME lo nomina The Greatest: la redazione si è sbagliata di persona, lui ha tenuto la copia"}], look: 'L', name: 'Harrionomane', nick: 'Il Sacco', sport: 'Boxe', flags: ['it'],
   ko: 0, sub: 0, dec: 1, loss: 23, cm: 158, born: '??·10·1996', place: 'Italia', stance: 'Confusa',
   history: [
     ...["Esse3", "La VPN dell'uni", "Analisi 2", "Il tasto Ricarica", "La Marca da bollo", "Il Barbiere in ritardo"].map((opp, i) => ({opp, method: 'KO subito R1', date: `0${i + 1}/2024`, rp: 985 - i * 12, res: 'L'})),
     {opp: "L'Informatizzato", method: 'Decisione', date: '09/2024', rp: 932, res: 'W', top: true},
     ...["La Ciabatta a 3 prese", "Il Cavo sotto il sedile", "Il Database da 5 GB", "Gemini"].map((opp, i) => ({opp, method: 'TKO R1', date: `${10 + i}/2024`, rp: 914 - i * 20, res: 'L'})),
   ]},
  {id: 'vlad', moments: [{src: 'vlad_1', look: 'C', type: 'W', cap: "Braccia al cielo: ha appena battuto il Tofu (mangiandolo)"}, {src: 'vlad_2', look: 'C', type: 'L', cap: "Sullo sgabello dopo la tesi: «il relatore vuole un'altra grammatica»"}, {src: 'vlad_3', nocut: true, pos: '30% 30%', type: 'D', cap: "Verdetto pari: l'arbitro ha chiesto a ChatGPT"}, {src: 'vlad_4', look: 'C', type: 'P', cap: "Alla pesata: «sono vegetariano, le verdure non contano»"}, {src: 'vlad_5', nocut: true, pos: '40% 30%', type: 'W', cap: "Sulle corde a fine match: saluta il pubblico e i suoi studenti di ripetizioni in prima fila"}, {src: 'vlad_6', look: 'C', type: 'P', cap: "In guardia sotto il tricolore rumeno: a Chișinău dicono che è moldavo, lui annuisce e sposta il peso"}, {src: 'vlad_7', nocut: true, pos: '65% 35%', type: 'W', cap: "Schivata da manuale di controlli automatici: l'errore a regime è zero, il diretto dell'avversario pure"}, {src: 'vlad_8', nocut: true, pos: '35% 40%', type: 'L', cap: "All'angolo a testa bassa: il robot del laboratorio gli ha appena chiesto di rifare il calibro"}, {src: 'vlad_9', nocut: true, pos: '50% 30%', type: 'P', cap: "Con la colomba della pace: da vegetariano la considera una collega, non un pranzo"}, {src: 'vlad_10', nocut: true, pos: '45% 35%', type: 'P', cap: "In palestra sotto il poster di Frazier-Ali: studia il 1971 come se fosse un esame di Controlli Automatici"}], look: 'L', name: 'Vlad', nick: "L'Erborista", sport: 'Boxe', flags: ['ro', 'it'],
   ko: 7, sub: 0, dec: 4, loss: 4, cm: 178, born: '??·??·1999', place: 'Padova', stance: 'Rilassata',
   history: [
     {opp: "La Bistecca", method: "KO R1 (senza toccarla)", date: '01/2024', rp: 1120, res: 'W'},
     {opp: "Il Tram di Padova", method: "TKO R1 (frenata)", date: '02/2024', rp: 1100, res: 'L'},
     {opp: "Lo Spritz", method: "Decisione unanime", date: '04/2024', rp: 1134, res: 'W'},
     {opp: "Lo Studente di ripetizioni", method: "Decisione unanime", date: '06/2024', rp: 1161, res: 'W'},
     {opp: "Harrionomane", method: "KO R1 (stava chiedendo a Gemini)", date: '08/2024', rp: 1201, res: 'W'},
     {opp: "Il Robot del laboratorio", method: "KO R1 (bug suo)", date: '10/2024', rp: 1174, res: 'L'},
     {opp: "ROS (Robot Operating System)", method: "TKO R3 (dipendenze risolte)", date: '01/2025', rp: 1208, res: 'W'},
     {opp: "La Grigliata dei coinquilini", method: "Decisione (abbandono del barbecue)", date: '03/2025', rp: 1228, res: 'W'},
     {opp: "La Matrice Jacobiana", method: "TKO R2 (invertita)", date: '05/2025', rp: 1255, res: 'W'},
     {opp: "Il Tofu", method: "KO R1 (mangiato)", date: '07/2025', rp: 1282, res: 'W'},
     {opp: "ChatGPT", method: "Decisione (scritta da ChatGPT)", date: '09/2025', rp: 1262, res: 'L'},
     {opp: "Il Match di Hinge", method: "Decisione unanime (secondo appuntamento)", date: '11/2025', rp: 1289, res: 'W'},
     {opp: "Il Divano", method: "KO R1 (si è alzato)", date: '01/2026', rp: 1316, res: 'W'},
     {opp: "L'Esame di Controlli Automatici", method: "KO R2", date: '03/2026', rp: 1350, res: 'W', top: true},
     {opp: "La Tesi sulle Grammatiche Formali", method: "KO R1, rinviato", date: '05/2026', rp: 1330, res: 'L'},
   ]},
  {id: 'ali', moments: [{src: 'ali_5', look: 'C', type: 'L', pos: '50% 40%', cap: "La testa bassa"}, {src: 'ali_6', mood: true, nocut: true, type: 'D', pos: '55% 45%', cap: "Contro Joe Frazier"}, {src: 'ali_7', nocut: true, type: 'W', pos: '40% 40%', cap: "In piedi sopra Liston"}, {src: 'ali_8', mood: true, nocut: true, type: 'D', pos: '55% 40%', cap: "Testa a testa"}, {src: 'ali_3', look: 'C', type: 'W', cap: 'Le braccia al cielo'}, {src: 'ali_2', nocut: true, pos: '50% 50%', type: 'W', cap: 'Contro Cleveland Williams, 1966 · KO tecnico R3'}, ], look: 'L', name: 'Muhammad Ali', nick: 'The Greatest', sport: 'Boxe', flags: ['us'],
   ko: 37, sub: 0, dec: 19, loss: 5, cm: 191, born: '17·01·1942', place: 'Louisville, US', stance: 'Ortodossa'},
  {id: 'tyson', moments: [{src: 'tyson_4', nonci: "Colleziona orecchie: invece di chiedere attenzione, se la prende.", type: 'W', look: 'L', cap: "Dopo il KO"}, {src: 'tyson_5', nonci: "Ricchissimo grazie al boss Tonio, tra feste e amici strampalati.", type: 'W', look: 'C', cap: "Le cinture"}, {src: 'tyson_6', nonci: "Poco prima di finire a lavorare in una macelleria di Roma.", type: 'L', look: 'L', cap: "Il medico all'angolo"}, {src: 'tyson_7', nocut: true, type: 'L', look: 'R', cap: "L'occhio gonfio"}, {src: 'tyson_8', nonci: "«Adoro le orecchiette.»", mood: true, type: 'D', look: 'C', cap: "Stanco, a fine round"}, {src: 'tyson_2', mood: true, nocut: true, type: 'D', pos: '45% 40%', cap: "Quasi pari"}, {src: 'tyson_3', nocut: true, type: 'L', pos: '60% 30%', cap: "Abbracciato all'arbitro"}, ], look: 'L', name: 'Mike Tyson', nick: 'Iron Mike', sport: 'Boxe', flags: ['us'],
   ko: 44, sub: 0, dec: 6, loss: 7, cm: 178, born: '30·06·1966', place: 'Brooklyn, US', stance: 'Ortodossa'},
  {id: 'floyd', moments: [{src: 'floyd_4', look: 'C', type: 'W', cap: 'Il sorriso sul ring'}, {src: 'floyd_1', look: 'R', pos: '45% 28%', mood: true, type: 'L', cap: 'In ginocchio'}, {src: 'floyd_2', look: 'R', pos: '55% 35%', type: 'W', cap: 'Con la cintura'}, {src: 'floyd_3', look: 'L', pos: '45% 40%', type: 'P', cap: 'In guardia'}], look: 'L', name: 'Floyd Mayweather', nick: 'Money', sport: 'Boxe', flags: ['us'],
   ko: 27, sub: 0, dec: 23, loss: 0, cm: 170, born: '24·02·1977', place: 'Grand Rapids, US', stance: 'Ortodossa'},
  {id: 'khabib', moments: [{src: 'khabib_6', nocut: true, mood: true, type: 'D', look: 'R', cap: "Contro McGregor"}, {src: 'khabib_4', look: 'C', mood: true, type: 'L', pos: '50% 30%', cap: "Lo sguardo al cielo"}, {src: 'khabib_5', look: 'R', mood: true, type: 'L', pos: '55% 55%', cap: "In ginocchio"}, {src: 'khabib_3', look: 'C', type: 'P', cap: 'Alla pesata'}, {src: 'khabib_1', look: 'C', pos: '50% 28%', type: 'W', cap: 'La cintura alzata'}, {src: 'khabib_2', look: 'C', pos: '50% 40%', type: 'P', cap: 'In ginocchio, dopo la vittoria'}], look: 'C', name: 'Khabib Nurmagomedov', nick: 'The Eagle', sport: 'MMA', flags: ['ru'],
   ko: 8, sub: 11, dec: 10, loss: 0, cm: 178, born: '20·09·1988', place: 'Sildi, RU', stance: 'Ortodossa'},
  {id: 'fedor', moments: [{src: 'fedor_4', look: 'C', type: 'W', cap: 'Le cinture Pride'}, {src: 'fedor_1', look: 'C', pos: '40% 35%', type: 'W', cap: 'Il braccio alzato'}, {src: 'fedor_2', look: 'C', pos: '50% 40%', type: 'W', cap: 'La bandiera tra i denti'}, {src: 'fedor_3', look: 'C', pos: '60% 45%', type: 'L', cap: '«Le sconfitte insegnano più delle vittorie»'}], look: 'C', name: 'Fedor Emelianenko', nick: 'The Last Emperor', sport: 'MMA', flags: ['ru'],
   ko: 16, sub: 15, dec: 9, loss: 6, cm: 183, born: '28·09·1976', place: 'Rubizhne, UA', stance: 'Ortodossa'},
  {id: 'topuria', moments: [{src: 'topuria_3', look: 'C', mood: true, type: 'L', pos: '50% 40%', cap: "In ginocchio"}, {src: 'topuria_4', type: 'W', pos: '60% 40%', cap: "Il braccio alzato"}, {src: 'topuria_5', mood: true, nocut: true, type: 'D', pos: '45% 45%', cap: "La rosa e la cintura"}, {src: 'topuria_1', look: 'C', type: 'W', cap: 'Due cinture, due bandiere'}, {src: 'topuria_2', look: 'C', type: 'W', cap: 'Dopo il KO'}], look: 'C', name: 'Ilia Topuria', nick: 'El Matador', sport: 'MMA', flags: ['es', 'ge'],
   ko: 7, sub: 8, dec: 2, loss: 0, cm: 173, born: '21·01·1997', place: 'Halle, DE', stance: 'Ortodossa'},
];

// look = verso della foto: L guarda a sinistra, R a destra, C di fronte.
// faceTo('R') dice se specchiare la foto perché guardi verso destra (e viceversa).
const faceTo = (f, dir) => f.look !== 'C' && f.look !== dir;
// mood: true = foto da usare solo nel verdetto simulato (quell'esito nella carriera vera non c'è)
// foto di un momento: il ritaglio (fighter senza sfondo) se c'è, altrimenti la foto intera
const momentImg = (f, m) => (m.nocut
  ? `<img class="full" src="img/momenti/${m.src}.jpg" alt="${esc(f.name)}: ${esc(m.cap)}" style="object-position:${m.pos || '50% 30%'}">`
  : `<img class="cutimg" src="img/momenti/${m.src}_cut.webp" alt="${esc(f.name)}: ${esc(m.cap)}" onerror="this.onerror=null;this.className='full';this.src='img/momenti/${m.src}.jpg'">`);
const byId = id => FIGHTERS.find(f => f.id === id);
const wins = f => f.ko + f.sub + f.dec;
const surname = f => f.name.split(' ').pop();
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const $ = id => document.getElementById(id);

// bandiere SVG locali (flagcdn), sempre DOPO il nome
const FLAG_NAMES = {us: 'Stati Uniti', ru: 'Russia', es: 'Spagna', ge: 'Georgia', it: 'Italia', ro: "Romania"};
const flagsHtml = f => f.flags.map(c => `<img class="flag" src="img/flags/${c}.svg" alt="${FLAG_NAMES[c]}" title="${FLAG_NAMES[c]}">`).join('');

// Set grafico a DUE SPESSORI: ogni tratto è MEDIO o GROSSO, niente altro.
//   icone (viewBox 24):          medio 1.75 · grosso 3.5  (class="w2" = grosso, il resto è medio)
//   grafiche grandi (~1000):     medio 3    · grosso 9    (STROKE_BIG)
//   mappa nascita (viewBox 400): medio 1.25 · grosso 3.75 (stesso rapporto 1:3 delle grafiche grandi)
// 24×24, colore = currentColor. Export: icons/*.svg + icons/index.html (node icons/export.js)
const STROKE = {m: 1.75, g: 3.5}, STROKE_BIG = {m: 3, g: 9}, STROKE_MAP = {m: 1.25, g: 3.75};
const ICON_PATHS = {
  // sport
  // regola: poche forme grandi, nessun dettaglio sotto ~3.5 unità (a matita i dettagli minuti si perdono)
  boxe: '<path class="w2" d="M7 11V7a4 4 0 0 1 4-4h3a4 4 0 0 1 4 4v6a5 5 0 0 1-5 5H8.5"/><path d="M7 11H5.5a2 2 0 0 0 0 4H7"/><path d="M8.5 18v3.5h7.5V18"/>',
  mma: '<path class="w2" d="M6 6h12v9a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5Z"/><path d="M6 11h12M9.5 6V2.5M14.5 6V2.5"/>',
  // elementi
  fuoco: '<path class="w2" d="M12 21a6 6 0 0 0 6-6c0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-3-2 2-3 4-3 7a6 6 0 0 0 6 6Z"/><path d="M12 21a3 3 0 0 1-3-3c0-1.8 1.5-3 3-5.5 1.5 2.5 3 3.7 3 5.5a3 3 0 0 1-3 3Z"/>',
  presa: '<path class="w2" d="M4 14c3-1 5-4 8-4s4 2 4 4"/><path class="w2" d="M20 10c-3 1-5 4-8 4s-4-2-4-4"/><circle cx="12" cy="12" r="9.5"/>',
  distanza: '<rect class="w2" x="4" y="3" width="16" height="18"/><path d="M8 9h8M8 15h8"/>',
  // dati del fighter
  altezza: '<path d="M6 3v18M6 6h4M6 12h4M6 18h4"/><path class="w2" d="M14.5 8l3.5-4 3.5 4M18 4v16M14.5 16l3.5 4 3.5-4"/>',
  nato: '<rect x="3" y="6" width="18" height="15"/><path d="M3 11h18"/><path class="w2" d="M8 2.5V8M16 2.5V8"/>',
  luogo: '<path class="w2" d="M12 21.5s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12Z"/><circle cx="12" cy="9.5" r="3"/>',
  guardia: '<path class="w2" d="M7 21l2-8-3-3.5M17 21l-2-8 3-3.5"/><circle cx="12" cy="5" r="2.5"/><path d="M8 11h8"/>',
  picco: '<path class="w2" d="M2.5 20.5 9 11l4 5 3-4 5.5 8.5Z"/><path d="M16 12V3l5 2.5L16 8"/>',
  serie: '<path class="w2" d="M13.5 2 4.5 14h7l-1 8 9-12.5h-7Z"/>',
  vs: '<path class="w2" d="M4.5 4.5l15 15M19.5 4.5l-15 15"/>',
  play: '<rect x="3" y="4" width="18" height="16"/><path class="w2" d="M9.5 8.5v7l6-3.5Z"/>',
  scheda: '<rect x="4" y="3" width="16" height="18"/><circle class="w2" cx="12" cy="9.5" r="3.5"/><path d="M7 18.5c1-3 3-4 5-4s4 1 5 4"/>',
  // metodi
  m_ko: '<path class="w2" d="M4 13V9a2 2 0 0 1 4 0v-1a2 2 0 0 1 4 0v1a2 2 0 0 1 4 0v4a6 6 0 0 1-6 6H8a4 4 0 0 1-4-4Z"/><path d="M19 3.5l-1.5 4M22.5 9h-4"/>',
  m_sub: '<circle cx="12" cy="7.5" r="3.5"/><path d="M5 21.5c0-4 3-7 7-7s7 3 7 7"/><path class="w2" d="M3.5 11c3 2.5 14 2.5 17 0"/>',
  m_dec: '<rect x="4" y="2.5" width="14" height="19"/><path d="M7.5 8h7M7.5 13h4"/><path class="w2" d="M12.5 17l3 3 6-7"/>',
  // esiti
  vittoria: '<path class="w2" d="M9 21C4.5 19 3 14 4 8.5M15 21c4.5-2 6-7 5-12.5"/><path d="M12 3.5l1.8 3.6 4 .6-2.9 2.8.7 4L12 12.6l-3.6 1.9.7-4-2.9-2.8 4-.6Z"/>',
  sconfitta: '<path class="w2" d="M3 5.5l6 6.5 4-4 7.5 8.5"/><path d="M21 10.5v6.5h-6.5M3 21h18"/>',
  pareggio: '<circle cx="12" cy="12" r="9.5"/><path class="w2" d="M7 9.5h10M7 14.5h10"/>',
  no_contest: '<circle cx="12" cy="12" r="9.5"/><path class="w2" d="M5.5 18.5l13-13"/>',
  squalifica: '<rect class="w2" x="7" y="3.5" width="10.5" height="15" rx="1" transform="rotate(12 12.25 11)"/><path d="M3 21.5h10"/>',
  esito_ko: '<path class="w2" d="M12 2L14.4 7L19.8 5.8L17.5 10.8L21.7 14.2L16.4 15.5L16.3 21L12 17.6L7.7 21L7.6 15.5L2.3 14.2L6.5 10.8L4.2 5.8L9.6 7Z"/>',
  esito_sub: '<circle cx="12" cy="12" r="9.5"/><circle class="w2" cx="12" cy="12" r="5"/>',
  esito_dec: '<rect x="2.5" y="3.5" width="5.5" height="13"/><rect x="9.25" y="3.5" width="5.5" height="13"/><rect x="16" y="3.5" width="5.5" height="13"/><path class="w2" d="M2.5 20.5h19"/>',
  atterramento: '<path d="M2 21h20"/><path class="w2" d="M3 17h11l3-1.5"/><circle cx="19" cy="13" r="2.5"/>',
  // match
  round: '<path class="w2" d="M4 3.5V21M20 3.5V21"/><path d="M4 8.5h16M4 14h16M2 21h20"/>',
  cronometro: '<circle class="w2" cx="12" cy="13.5" r="7.5"/><path d="M12 13.5V8.5M9.5 2.5h5"/>',
  cintura: '<path d="M2 9h6M2 15h6M16 9h6M16 15h6"/><rect class="w2" x="8" y="6" width="8" height="12" rx="2"/>',
  evento: '<path class="w2" d="M2.5 5.5h19v4a2.5 2.5 0 0 0 0 5v4h-19v-4a2.5 2.5 0 0 0 0-5Z"/><path d="M15.5 5.5v13"/>',
  timbro: '<path d="M12 2.5a3.5 3.5 0 0 1 3.5 3.5c0 2-1.5 3-1.5 5h-4c0-2-1.5-3-1.5-5A3.5 3.5 0 0 1 12 2.5Z"/><rect class="w2" x="4" y="13" width="16" height="4.5"/><path d="M4.5 21h15"/>',
  bandiera: '<path class="w2" d="M5 21.5V3"/><path d="M5 4h13l-3.5 4.5L18 13H5"/>',
  // sito
  video: '<rect class="w2" x="2.5" y="6.5" width="12.5" height="11"/><path d="M15 10.5l6.5-3.5v10l-6.5-3.5"/>',
  spoiler: '<path d="M2 12s4-6.5 10-6.5S22 12 22 12s-4 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/><path class="w2" d="M4.5 19.5l15-15"/>',
  podio: '<path class="w2" d="M2.5 21v-7h6.5V7h6v9h6.5v5Z"/><path d="M9 14v7M15 16v5"/>',
  confronto: '<path d="M12 2.5v19"/><path class="w2" d="M9.5 6.5H4M9.5 12H6M9.5 17.5H3"/><path d="M14.5 6.5h4.5M14.5 12h6.5M14.5 17.5H19"/>',
  zoom: '<circle class="w2" cx="10" cy="10" r="7"/><path class="w2" d="M15.5 15.5l5.5 5.5"/><path d="M10 6.5v7M6.5 10h7"/>',
};
// class="w2" -> tratto grosso; tutto il resto eredita il medio dal gruppo
const iconBody = name => ICON_PATHS[name].replace(/class="w2"/g, `class="w2" stroke-width="${STROKE.g}"`);
// stile matita: due passate con gli STESSI due spessori (la seconda leggera e spostata) + filtro che rende il tratto irregolare
const icon = (name, label) => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'}><g filter="url(#pencil)" stroke-width="${STROKE.m}">${iconBody(name)}</g><g filter="url(#pencil2)" stroke-width="${STROKE.m}" opacity=".3" transform="translate(.4 -.3)">${iconBody(name)}</g></svg>`;
// icona dell'esito di un verdetto o di un metodo scritto ("KO R2", "Sottomissione", "Squalifica"...)
const outcomeIcon = how => (/no contest/i.test(how) ? 'no_contest' : /pareggio/i.test(how) ? 'pareggio' : /squalifica/i.test(how) ? 'squalifica'
  : /sottomissione/i.test(how) ? 'esito_sub' : /decisione/i.test(how) ? 'esito_dec' : 'esito_ko');
// i filtri della matita, una volta per pagina. Unità = viewBox 24 dell'icona: spostamento piccolo,
// così il tratto trema ma resta sottile/spesso come deve (con valori alti i due pesi si impastano)
const PENCIL_DEFS = `<defs>
  <filter id="pencil" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale=".7"/></filter>
  <filter id="pencil2" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="1" seed="9" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1"/></filter>
</defs>`;
document.body.insertAdjacentHTML('beforeend', `<svg width="0" height="0" style="position:absolute" aria-hidden="true">${PENCIL_DEFS}</svg>`);
const sportIcon = f => icon(f.sport === 'MMA' ? 'mma' : 'boxe', f.sport);

// Carriere ricostruite dal record vero (riserva se records.js manca): sconfitte e match chiave al numero giusto.
// Il rating vero (OpenSkill) lo mette ratings.js; questo è solo il segnaposto finché non arriva.
// [avversario, data, metodo, topWin?]
const CAREERS = {
  ali: {W: {20: ['Sonny Liston', '02/1964', 'RTD R6 · titolo'], 29: ['Zora Folley', '03/1967', 'KO R7'], 30: ['Jerry Quarry', '10/1970', 'RTD R3'], 46: ['George Foreman', '10/1974', 'KO R8 · titolo', true], 49: ['Joe Frazier', '10/1975', 'RTD R14']},
        L: {32: ['Joe Frazier', '03/1971', 'Decisione unanime'], 42: ['Ken Norton', '03/1973', 'Decisione divisa'], 57: ['Leon Spinks', '02/1978', 'Decisione divisa'], 60: ['Larry Holmes', '10/1980', 'RTD R10'], 61: ['Trevor Berbick', '12/1981', 'Decisione unanime']}},
  tyson: {W: {28: ['Trevor Berbick', '11/1986', 'TKO R2 · titolo'], 35: ['Michael Spinks', '06/1988', 'KO R1', true], 41: ['Razor Ruddock', '06/1991', 'Decisione unanime'], 42: ['Peter McNeeley', '08/1995', 'Squalifica R1']},
          L: {38: ['Buster Douglas', '02/1990', 'KO R10'], 46: ['Evander Holyfield', '11/1996', 'TKO R11'], 47: ['Evander Holyfield', '06/1997', 'Squalifica R3'], 53: ['Lennox Lewis', '06/2002', 'KO R8'], 55: ['Danny Williams', '07/2004', 'KO R4'], 56: ['Kevin McBride', '06/2005', 'RTD R6'], 57: ['Jake Paul', '11/2024', 'Decisione unanime']}},
  floyd: {W: {39: ['Oscar De La Hoya', '05/2007', 'Decisione divisa'], 48: ['Manny Pacquiao', '05/2015', 'Decisione unanime', true], 50: ['Conor McGregor', '08/2017', 'TKO R10']}, L: {}},
  khabib: {W: {27: ['Conor McGregor', '10/2018', 'Sottomissione R4', true], 28: ['Dustin Poirier', '09/2019', 'Sottomissione R3'], 29: ['Justin Gaethje', '10/2020', 'Sottomissione R2']}, L: {}},
  fedor: {W: {16: ['Antonio Rodrigo Nogueira', '03/2003', 'Decisione unanime', true], 24: ['Mirko Cro Cop', '08/2005', 'Decisione unanime']},
          L: {5: ['Tsuyoshi Kohsaka', '12/2000', 'TKO (taglio)'], 33: ['Fabrício Werdum', '06/2010', 'Sottomissione R1'], 34: ['Antônio Silva', '02/2011', 'TKO R2'], 35: ['Dan Henderson', '07/2011', 'KO R1'], 40: ['Ryan Bader', '01/2019', 'KO R1'], 46: ['Ryan Bader', '02/2023', 'TKO R1']}},
};

function buildHistory(f) {
  const c = CAREERS[f.id], n = wins(f) + f.loss, h = [];
  let rp = 1000;
  for (let i = 1; i <= n; i++) {
    const L = c.L[i], W = c.W[i], res = L ? 'L' : 'W', e = L || W;
    const step = res === 'L' ? -150 - 40 * (i / n) : (W && W[3] ? 140 : 18 + 50 * (1 - i / n));
    rp = Math.round(Math.max(600, rp + step + 12 * Math.sin(i * 1.7)));
    h.push({opp: e ? e[0] : `Match #${i}`, date: e ? e[1] : '', method: e ? e[2] : (res === 'W' ? 'Vittoria' : '—'),
            rp, res, top: !!(W && W[3]), key: !!e, est: true});
  }
  f.history = h;
}
// record veri (records.js, dal database del progetto): match reali in ordine, numeri ricalcolati da lì.
// rp qui è un segnaposto: ratings.js lo sostituisce col rating OpenSkill vero match per match.
const EXTRA_TOPS = {topuria: ['Alexander Volkanovski']};
function buildFromRecords(f) {
  const R = RECORDS[f.id], st = RECORD_STATS[f.id], n = R.length;
  // top win: confronto per cognome (nel database i nomi possono avere accenti o secondi nomi)
  const tops = [...Object.values((CAREERS[f.id] || {}).W || {}).filter(w => w[3]).map(w => w[0]), ...(EXTRA_TOPS[f.id] || [])].map(t => t.split(' ').pop());
  Object.assign(f, {ko: st.ko, sub: st.sub, dec: st.dec, loss: st.loss, draw: st.draw, nc: st.nc});
  let rp = 1000;
  f.history = R.map((r, i) => {
    const top = r.res === 'W' && tops.some(t => r.opp.includes(t));
    const step = r.res === 'W' ? (top ? 140 : 18 + 50 * (1 - i / n)) : r.res === 'L' ? -150 - 40 * (i / n) : 0;
    rp = Math.round(Math.max(600, rp + step + 12 * Math.sin(i * 1.7)));
    return {opp: r.opp, date: r.date, dd: r.dd, year: r.year, method: r.method + (r.event ? ` · ${r.event}` : ''), rp, res: r.res,
            top, key: true, est: true, yearEst: false};
  });
}
FIGHTERS.forEach(f => {
  if (typeof RECORDS !== 'undefined' && RECORDS[f.id]) buildFromRecords(f);
  else if (!f.history && CAREERS[f.id]) buildHistory(f);
});

// Anno di ogni match: quelli con data sono veri, gli altri stimati tra le date note (inizio/fine carriera inclusi).
const CAREER_SPAN = {ali: [1960, 1981], tyson: [1985, 2024], floyd: [1996, 2017], khabib: [2008, 2020],
                     fedor: [2000, 2023], topuria: [2015, 2025], debuttante: [2024, 2024], vlad: [2024, 2026]};
function assignYears(f) {
  const H = f.history, span = CAREER_SPAN[f.id];
  if (!H || !span || H.every(h => h.year)) return;   // record veri: anni già giusti
  const known = H.map(h => { const m = String(h.date).match(/(19|20)\d{2}/); return m ? +m[0] : null; });
  if (known[0] == null) known[0] = span[0];
  if (known[H.length - 1] == null) known[H.length - 1] = span[1];
  H.forEach((h, i) => {
    const dated = /(19|20)\d{2}/.test(String(h.date));
    let p = i, n = i;
    while (known[p] == null) p--;
    while (known[n] == null) n++;
    h.year = p === n ? known[p] : Math.round(known[p] + (known[n] - known[p]) * (i - p) / (n - p));
    h.yearEst = !dated;
  });
}
FIGHTERS.forEach(assignYears);

// Biografia in stile Nonciclopedia (struttura e tipo di umorismo presi dalla loro voce su Mike Tyson; testo nostro, tutto inventato).
// [[...]] = voce inesistente (link rosso), [senza fonte] / [citazione necessaria] = note.
byId('debuttante').bio = {
  intro: "Harrionomane (Verona, ottobre 1996, segno della Bilancia – ancora sveglio, sono le 4 di notte) è un pugile italiano, sviluppatore web notturno, trentenne e fuoricorso di lungo corso[senza fonte], considerato da molti esperti il più grande sconfitto della storia del [[pugilato da cortile]]. Con un record di 1 vittoria e 23 sconfitte detiene il titolo mondiale di costanza, e ha costruito un database di 31.000 lottatori senza trovarne uno che riesca a battere.",
  sections: [
    ["Vita e morti", "Nato con i guantoni già allacciati, perde il primo incontro contro l'ostetrica. Cresce come l'unico essere umano che ricorda le date degli appelli: quando un amico si presenta all'esame il giorno sbagliato, lui risponde soltanto \"era lunedì\", e il malcapitato va al tappeto senza essere toccato.", {img: "debuttante_16", side: "R", cap: "Una delle rare foto senza sconfitta in corso."}],
    ["Formazione accademica", "Studia Informatica all'[[Università di Verona]] da così tanti anni che la segreteria gli fa gli auguri a Natale: è fuoricorso da abbastanza tempo da conoscere a memoria le scadenze della segreteria, il costo della marca da bollo e l'aula di ogni appello. Il suo avversario storico è [[Analisi 2]]: l'incontro viene rinviato di sessione in sessione perché \"c'è troppa roba\", ma lui assicura che ce la fa[citazione necessaria]. Convinto di aver già vinto, ha presentato la [[domanda di laurea]] con Analisi 2 ancora da passare: la segreteria l'ha respinta al primo round, per KO tecnico. È l'unico studente della storia ad aver perso contro un modulo PDF."],
    ["Il successo (presunto)", "Nel settembre 2024 conquista la sua unica vittoria contro l'Informatizzato, chiudendo \"in cima alla lista, meglio di tutti\", come ricorda a chiunque gli capiti a tiro. La borsa dell'incontro ammonta a una marca da bollo da 16 euro, che ha dovuto pagare lui.", {img: "debuttante_10", side: "L", cap: "In guardia sul ring, a guardare un avversario che non si è mai presentato."}],
    ["Le tecniche", "Il chiudi-e-riapri: davanti a qualsiasi errore non ricarica mai la pagina, chiude la scheda e la riapre, perché \"se ricarichi non va\". Il gancio Gemini: prima di tirare un pugno chiede a [[Gemini]] di descriverlo. La guardia a occhiali: le mani proteggono le lenti, non la faccia, perché \"la faccia si rimargina, gli occhiali costano\"[senza fonte]. Il telefono altrove: alle chiamate decisive non risponde, il telefono è \"da un'altra parte\"; se è scarico, lo trovate in [[CV2]].", {img: "debuttante_9", side: "R", cap: "Contro il sacco: l'unico match in cui parte favorito, e non sempre."}],
    ["Incontri importanti", "Harrionomane contro Esse3: perso, \"non va mai niente quando serve\". Harrionomane contro la VPN dell'università: installata, disinstallata, mai battuta (\"mica è NordVPN\"). Harrionomane contro il Barbiere: il barbiere è in ritardo, lui dichiara vittoria per forfait, poi scopre che deve aspettare anche il collega. La rivincita con Analisi 2 è in calendario: lui sa già la data, voi no.", {img: "debuttante_11", side: "R", cap: "Alle corde. Il secondo gli chiede se sta bene, lui chiede che round è."}],
    ["Il nome", "Il soprannome nasce da una vaga somiglianza con un noto mago occhialuto inglese. Lui nega, ma ultimamente non aiuta: è appena stato operato e deve ancora togliersi i punti, che restano gli unici punti messi a segno in tutta la carriera[citazione necessaria]. Nato sotto il segno della Bilancia, l'unica che lo vede sempre nella categoria giusta.", {img: "debuttante_19", side: "R", cap: "TIME lo nomina The Greatest. La redazione cercava un altro, lui ha tenuto la copia."}],
    ["Valori", "Sui principi è imbattuto. Gli hanno offerto un milione di dollari per vendere un amico e ha rifiutato senza nemmeno chiedere a [[Gemini]]. Gli amici, commossi, hanno fatto notare che l'offerta era stata fatta da loro, per vedere cosa succedeva. Ha rifiutato anche la seconda.", {img: "debuttante_15", side: "L", cap: "Allenamento sott'acqua come Ali: l'aria è finita al primo jab, i principi no."}],
    ["Instagram", "Il suo profilo è un archivio completo di sé stesso, sempre in giacca e cravatta: in palestra, in cucina, sul ring. Gli esperti di moda lo considerano il primo pugile della storia a combattere in completo blu senza mai togliersi la cravatta, nemmeno quando perde[senza fonte].", {img: "debuttante_17", side: "R", cap: "The Ring, edizione speciale: unico in copertina con l'asciugamano già pronto."}],
    ["Musica ed edit", "Produce musica con l'intelligenza artificiale: basi, ritornelli e una voce che giura non essere la sua. Monta poi edit dei suoi amici al rallentatore con musica epica, rendendoli più forti di quanto lui sia mai stato sul ring. Gli amici ringraziano; i loro avversari meno.", {img: "debuttante_18", side: "L", cap: "Esquire, The Passion: le frecce sono le scadenze di Esse3."}],
    ["Scacchi", "Sulla scacchiera è un'altra persona: ha superato i 2000 di Elo, l'unico ranking in cui sta sopra la maggior parte della gente. Quando perde batte i pugni sul tavolo: sono i colpi più potenti mai registrati in carriera, e non ne è andato a segno nemmeno uno sull'avversario.", {img: "debuttante_12", side: "R", cap: "Il momento esatto in cui l'avversario ha giocato il cavallo."}],
    ["Vita sentimentale", "Sta preparando l'incontro più importante della carriera. Per la prima volta studia l'agenda dell'altra parte prima di salire sul ring, compresi gli orari dell'uscita da scuola[senza fonte], e si presenta puntuale. Gli allenatori parlano di una maturità tattica mai vista.", {img: "debuttante_14", side: "L", cap: "In giacca anche alle corde: al primo appuntamento bisogna presentarsi bene."}],
    ["Fight Lighthouse", "Dopo la 23ª sconfitta fonda un database di oltre 31.000 lottatori, pesante 5 GB, così da avere sempre qualcuno contro cui perdere. Ci lavora dalle 2 alle 4 di notte. Un giorno cancella tutte le foto \"per rifarle\" e per settimane ogni campione del mondo appare come una [[silhouette]]. Toglie dal sito il rosso, il giallo e il marrone e li sostituisce con azzurro e grigio; quando gli chiedono \"perché blu?\" risponde con una risata di quaranta secondi[senza fonte].", {img: "debuttante_13", side: "R", cap: "Il pugno verso l'obiettivo: l'unico colpo andato a segno, sul fotografo."}],
    ["Il fonico", "Nel tempo libero presta servizio come impianto audio itinerante: si presenta con casse e mixer suoi, chiede subito se avete una ciabatta (tre prese, lunga se si sta fuori) e poi perde un cavo. Il cavo viene sempre ritrovato sotto il sedile della macchina, seguito da due bicipiti in emoji."],
    ["Curiosità", "È alto 158 cm, ma solo appena uscito dal barbiere. Fuma solo Winston Blue, ma te lo dice con due mesi di ritardo, convinto di essersi sognato la domanda. È il consulente ufficiale per i locali dove festeggiare la laurea: garantisce che sono pieni di quarantenni, e lo dice da trentenne. Di una sua foto in giacca e cravatta ha dichiarato di essere \"stra figo\", citando come fonte: nessuno.", {img: "debuttante_7", side: "L", cap: "Fuori dal ring si allena in cucina: la carbonara lo batte ai punti."}],
  ],
  quotes: [
    "«Era lunedì.» — Harrionomane, a chi ha sbagliato la data dell'esame",
    "«Non ricaricare: chiudi la scheda e riapri.» — Harrionomane, dall'angolo",
    "«Chiedo a Gemini.» — Harrionomane, prima di ogni round",
    "«Sono stra figo in questa foto.» — cit. nessuno",
    "«Scacco.» — Harrionomane, seguito da un pugno sul tavolo",
    "«Non vi venderei nemmeno per un milione.» — Harrionomane, agli amici che lo stavano mettendo alla prova",
  ],
  categories: ["Pugili che si allenano alle 4 di notte", "Sconfitti da Esse3", "Gente che sa sempre la data dell'appello", "Fuoricorso con la cravatta", "Scacchisti con colpi proibiti", "Bilance che non perdono il peso"],
};

// Vlad: struttura e tipo di umorismo presi dalle voci Nonciclopedia Padova, Boxe, Vegetariano, Tofu, Intelligenza artificiale,
// ChatGPT, Ingegnere, Studente fuori sede, Studente universitario, Tesi di laurea, Marijuana (lette il 15/10/2026); testo nostro.
// statistiche alimentari di Vlad (meme): numeri grandi + composizione del piatto
byId('vlad').diet = {
  stats: [
    {v: '412', u: 'kg/anno', k: 'Tofu', n: "Due volte e mezzo il suo peso. Lo marina nella soia dal 2019."},
    {v: '1.096', u: 'zucchine', k: "All'anno", n: "Tre al giorno: una per round."},
    {v: '38', u: 'vasetti/mese', k: 'Hummus', n: "Il cecio è il suo sparring partner preferito."},
    {v: '0', u: 'bistecche', k: 'Mangiate in carriera', n: "Una l'ha battuta per KO: è nel registro."},
    {v: '4', u: 'camomille', k: 'Prima di ogni match', n: "Per questo lo chiamano rilassato[senza fonte]."},
    {v: '23', u: '%', k: 'Ripetizioni pagate in verdura', n: "Le mamme degli studenti pagano in cassette dell'orto."}
  ],
  plate: [['Verdure', 46], ['Legumi', 22], ['Tofu', 18], ['Pasta', 10], ['Tisane (solide)', 4]]
};
byId('vlad').bio = {
  intro: "Vlad (Padova, 1999[citazione necessaria] – in sessione) è un pugile rumeno (anzi moldavo, ma a Padova nessuno sa indicare la Moldavia sulla cartina[senza fonte]) dei pesi leggeri, studente di robotica alla magistrale, insegnante di ripetizioni e vegetariano praticante, noto nei bassifondi di [[Piazza delle Erbe]] come L'Erborista. Appartiene alla rara sottospecie del pugile-ingegnere: piccola creatura pelosa con occhiali sottili, mullet d'ordinanza e sguardo professionalmente assente. Il suo stile, definito dai giudici \"molto rilassato\"[senza fonte], gli ha fruttato 11 vittorie, 4 sconfitte e un numero imprecisato di pisolini sullo sgabello, anche durante gli incontri vinti.",
  sections: [
    ["Origini", "Nasce in Moldavia, ma sui documenti c'è scritto Romania: la differenza gliela chiedono a ogni controllo e lui ogni volta risponde con una cartina disegnata a mano. Cresce a Padova, città celebre per i suoi tre senza: il Santo senza nome, il Caffè senza porte e lo studente senza fretta. Da neonato rifiuta l'omogeneizzato di vitello e pretende quello alle zucchine, aprendo la prima crisi diplomatica della famiglia. A sei anni smonta il tostapane \"per capire come ragiona\": il tostapane non si è più ripreso, la colazione nemmeno.", {img: "vlad_6", side: "R", cap: "Sotto il tricolore rumeno. Moldavo, ma non diteglielo prima del peso."}],
    ["La nobile arte del pugilismo", "Scopre la boxe, sport in cui due sconosciuti pagano per prendersi a pugni davanti a un pubblico che soffre più di loro, guardando un video tutorial a velocità 2x. Si presenta alla prima lezione in palestra con i guantoni rossi, i pantaloncini blu e gli occhiali, che si rifiuta di togliere perché \"senza non vedo l'avversario, e nemmeno la palestra\". L'allenatore gli propone un soprannome con Sugar, come tutti i grandi; lui lo rifiuta: lo zucchero raffinato non rientra nella sua dieta. Il primo grande scalpo arriva nell'agosto 2024: [[Harrionomane]], steso al primo round mentre chiedeva a Gemini come si para un diretto.", {img: "vlad_7", side: "L", cap: "La schivata che ha reso celebre il suo baricentro, e il suo fisioterapista."}],
    ["Formazione accademica", "Frequenta la magistrale in robotica all'[[Università di Padova]] da abbastanza tempo da avere il proprio nome inciso sul banco dell'aula studio. Il suo avversario storico è la [[Matrice Jacobiana]], che lo ha battuto innumerevoli volte in sogno ma mai sul ring, dove nel maggio 2025 l'ha invertita al secondo round. Per la tesi, invece di un robot, sceglie le [[grammatiche e linguaggi formali]]: in pratica insegna a una macchina quali frasi sono ammesse, dopo anni passati a insegnarlo agli allievi di ripetizioni. La tesi è in calendario da tre sessioni; il relatore continua a rispondere che la sua grammatica \"genera troppe frasi\", lui risponde che è un pregio[citazione necessaria]."],
    ["Il robot e l'intelligenza artificiale", "Nell'ottobre 2024 affronta il braccio robotico del suo laboratorio, programmato da lui stesso. Il robot vince per KO al primo round grazie a un errore di segno nel suo codice; Vlad sostiene ancora oggi che \"il bug era intenzionale\". L'anno dopo sfida [[ChatGPT]]: l'incontro finisce ai punti, ma il verdetto viene scritto da ChatGPT, che si assegna la vittoria con grande cortesia e tre elenchi puntati. Da allora Vlad definisce l'IA \"Abbastanza Inutile\", tranne quando c'è da scrivere la mail al relatore."],
    ["Il maestro di ripetizioni", "Per pagare affitto e verdure dà ripetizioni di matematica ai ragazzi delle superiori, che grazie a lui risolvono un'equazione di secondo grado e conoscono a memoria la differenza tra tofu morbido e tofu compatto. È imbattuto contro i suoi allievi, ma solo perché non li lascia mai rispondere. Le famiglie lo pagano in contanti e in torte salate, rigorosamente senza speck."],
    ["Dieta e preparazione atletica", "Segue un regime vegetariano stretto: le proteine arrivano dal [[tofu]], che mangia a qualsiasi ora e in qualsiasi forma, il ferro dagli spinaci, la cattiveria agonistica da nessuna parte. Alla pesata chiede di non conteggiare le verdure \"perché sono acqua\". Una volta il preparatore ha provato a fargli mangiare una bistecca prima di un incontro importante: Vlad l'ha mandata al tappeto senza toccarla, con un monologo sugli allevamenti intensivi durato tre round.", {diet: true}],
    ["Lo stile di combattimento", "La guardia rilassata: braccia basse e sguardo perso verso un punto lontano, cosa che confonde gli avversari al punto da farli sentire in colpa. Il diretto in cinematica inversa: prima di colpire calcola la traiettoria, e quando ha finito l'avversario è già sotto la doccia. La presa dell'erborista: avvicina l'avversario e gli illustra con calma la differenza tra salvia, rosmarino e altre [[erbe aromatiche]][senza fonte], finché quello non si addormenta in piedi.", {img: "vlad_8", side: "R", cap: "All'angolo tra un round e l'altro: ripassa la Jacobiana a mente."}],
    ["Vita sentimentale e social", "Il look fa parte della strategia: mullet castano, occhiali a filo d'oro senza montatura sotto, orecchino pendente e camicie vintage a fantasia comprate al mercatino, tanto che i giudici lo hanno scambiato più volte per un professore di filosofia del 1974 entrato per sbaglio. Fuori dal ring è un agonista ancora più attivo: su [[Hinge]] vanta più match che incontri in carriera, e il suo procuratore sospetta che li organizzi con lo stesso calendario degli allenamenti. Il suo genere fotografico è il selfie in camera, avvolto in una nuvola di fumo, con lo sguardo fisso nell'obiettivo: i critici lo definiscono \"neorealismo da affitto studentesco\", i coinquilini \"apri la finestra\"."],
    ["Curiosità", "Entra sul ring con una borraccia di tisana e un accendino di cui nessuno ha mai capito l'utilità. Quando non posa col fumo, posa con la [[chitarra]]: nessuno l'ha mai sentito suonare, ma l'accordo di Do lo tiene in foto da anni. È l'unico pugile ad aver battuto il Divano per KO: si è alzato, e nessuno ci credeva. Ai fan che gli chiedono come si rilassa prima di un incontro risponde \"con le erbe giuste\", e poi parla per venti minuti di camomilla[citazione necessaria].", {img: "vlad_5", side: "L", cap: "Sulle corde: in prima fila i suoi studenti di ripetizioni, con i compiti fatti."}],
  ],
  quotes: [
    "«Hai mangiato?» — sua madre, a ogni suono della campanella",
    "«Stavolta la Jacobiana l'ho invertita bene.» — Vlad, al secondo round",
    "«Il bug era intenzionale.» — Vlad, dal tappeto",
    "«Tranquillo, rilassati.» — Vlad, all'arbitro",
  ],
  categories: ["Pugili vegetariani per motivi etici e di peso", "Robot che hanno battuto chi li ha programmati", "Padovani rilassati", "Maestri di ripetizioni imbattuti contro i propri allievi"],
};

// "Secondo Nonciclopedia": verificato sul sito (API di ricerca, 15/10/2026) che solo Mike Tyson ha una voce sua.
// Gag riassunte con parole nostre + citazioni brevi; licenza Nonciclopedia CC BY-NC-SA, con link alla voce.
const NONCI = {
  tyson: {url: 'https://nonciclopedia.org/wiki/Mike_Tyson', own: true,
    gags: ['Da bambino picchia i compagni di scuola e a 16 anni, dopo aver visto Rocky, sceglie una carriera decisamente poco sportiva.',
           'Grazie al boss Tonio diventa ricchissimo e passa le giornate tra feste e amici strampalati.',
           'Caduto in disgrazia, finisce a lavorare in una macelleria di Roma.',
           'Tra gli avversari c\'è Alì, che lo batte più volte, e Joe Rocchio, in una serie di incontri che non finisce mai.',
           'Colleziona orecchie umane: invece di chiedere attenzione, se la prende.'],
    quotes: ['«Adoro le orecchiette.» — Mike Tyson', '«Io c\'ho i pugni nelle mani!!!» — Mike Tyson']},
  _wrestling: {url: 'https://nonciclopedia.org/wiki/Wrestling', own: false, title: 'Wrestling',
    gags: ['Per gli ingenui è uno sport epico, per le persone sane un reality travestito da violenza.',
           "All'inizio gli incontri erano veri, con mosse leggendarie come il salto sul divano; poi arrivarono le scommesse.",
           'Dopo le intercettazioni sulla sua falsità è stato retrocesso in Serie B degli sport, con 15 punti di penalizzazione.',
           'I cattivi si alleano e si tradiscono a turno, i buoni vincono sempre: nessuna sorpresa.'],
    quotes: ['«Questi sono eroi VERI, che prendono mazzate VERE…» — qualcuno, sul wrestling']},
  _judo: {url: 'https://nonciclopedia.org/wiki/Judo', own: false, title: 'Judo',
    gags: ['Si impara solo per corrispondenza: le istruzioni arrivano sotto la porta.',
           'La cintura più forte di tutte, a quanto pare, è quella del Barcellona.',
           "Lo «strangolamento economico»: presti soldi all'avversario con interessi altissimi.",
           'Il maestro sceglie sempre te per stendere i tappetini e ti mette contro il compagno più grosso.'],
    quotes: []},
  _arbitro: {url: 'https://nonciclopedia.org/wiki/Arbitro', own: false, title: 'Arbitro',
    gags: ["L'arbitro è un animale mansueto, che si lascia convincere da denaro e orologi di lusso.",
           'Resta sempre asciutto, pulito e illeso, qualunque cosa succeda intorno a lui.',
           'È colpa sua, sempre: i tifosi non hanno dubbi.'],
    quotes: ['«Meglio un morto in casa che un arbitro alla porta.» — detto popolare']},
  _pugilato: {url: 'https://nonciclopedia.org/wiki/Pugilato', own: false, title: 'Pugilato',
    gags: ['Il pugilato è un passatempo masochista, dove il pubblico si rovina più dei pugili.',
           'L\'"attacco d\'ala" è una tecnica presa da un Pokémon: si salta agitando il braccio come un pollo.',
           'Rocky è un eroe quasi invincibile, con centinaia di nemici abbattuti e proiettili deviati da scudi alieni.',
           'Babbo è il pugile più forte di sempre: vince prima ancora che l\'incontro cominci.'],
    quotes: []},
};
// fighter senza voce propria -> la voce più vicina al suo stile (lottatori: wrestling; Fedor: judo/sambo; Mayweather: l'arbitro, ai punti)
const NONCI_FALLBACK = {khabib: '_wrestling', topuria: '_wrestling', fedor: '_judo', floyd: '_arbitro', ali: '_pugilato'};


// Altezza media per categoria (CONCEPT_GRAFICO_UNICO.md: UFC per categoria; boxe solo massimi). null = media non disponibile.
const DIVISION = {
  ali: {name: 'pesi massimi della boxe', avg: 187.3}, tyson: {name: 'pesi massimi della boxe', avg: 187.3},
  floyd: {name: 'pesi welter della boxe', avg: null}, khabib: {name: 'pesi leggeri UFC', avg: 178.0},
  topuria: {name: 'pesi piuma UFC', avg: 175.9}, fedor: {name: 'pesi massimi MMA', avg: 191.6},
  debuttante: {name: 'pesi massimi della boxe', avg: 187.3},
  vlad: {name: 'pesi leggeri della boxe', avg: null},
};
function heightPhrase(f) {
  const d = DIVISION[f.id];
  if (!d || !d.avg) return d ? `Media dei ${d.name}: non ancora calcolata` : '';
  const diff = Math.round(f.cm - d.avg);
  if (Math.abs(diff) <= 2) return `Nella media dei ${d.name} (${String(d.avg).replace('.', ',')} cm)`;
  return `${Math.abs(diff)} cm ${diff > 0 ? 'più alto' : 'più basso'} della media dei ${d.name}`;
}
// metodo -> forma del nodo
const methodKind = m => (/sottomissione/i.test(m) ? 'sub' : /decisione|pareggio|no contest|non registrato/i.test(m) ? 'dec' : 'ko');


// Video: ricerca su YouTube del match (i link diretti del progetto vengono dal suo database video).
const videoUrl = (f, h) => `https://www.youtube.com/results?search_query=${encodeURIComponent(`${f.name} vs ${h.opp} ${h.year || ''} full fight`)}`;

// Modalità spoiler: nasconde esiti e metodi in tutto il sito, ricordata tra le pagine.
const SPOILER_KEY = 'fl_spoiler';
const spoilerOn = () => { try { return localStorage.getItem(SPOILER_KEY) === '1'; } catch (e) { return false; } };
const spoilerButtons = on => document.querySelectorAll('.spoilerbtn').forEach(b => { b.innerHTML = icon('spoiler') + (on ? 'Spoiler: nascosti' : 'Spoiler: visibili'); b.setAttribute('aria-pressed', on); });
function spoilerToggle() {
  const on = !spoilerOn();
  try { localStorage.setItem(SPOILER_KEY, on ? '1' : '0'); } catch (e) {}
  document.body.classList.toggle('spoiler', on);
  spoilerButtons(on);
}
document.body.classList.toggle('spoiler', spoilerOn());
spoilerButtons(spoilerOn());
document.addEventListener('click', e => { const r = e.target.closest('.spoiler .sp'); if (r) r.classList.add('shown'); });

// ponytail: copertina che si alterna senza toccare le pagine — sceglie una foto a ogni visita (fissa per la sessione)
// e riscrive gli src img/<id>.webp (e _ghost/_glow) appena compaiono. Se le varianti crescono, meglio un campo f.img usato dalle pagine.
(() => {
  const ALT = {debuttante: ['debuttante', 'debuttante_b', 'debuttante_b', 'debuttante_c', 'debuttante_c', 'debuttante_d', 'debuttante_d'],   // la vecchia esce 1 volta su 7
               tyson: ['tyson', 'tyson_b', 'tyson_c', 'tyson_d']};   // tyson_d e' specchiata per guardare a sinistra (look 'L')
  const pick = {};
  for (const id in ALT) {
    let k; try { k = sessionStorage.getItem('cover_' + id); } catch (e) {}
    if (!k || !ALT[id].includes(k)) { k = ALT[id][Math.floor(Math.random() * ALT[id].length)]; try { sessionStorage.setItem('cover_' + id, k); } catch (e) {} }
    if (k !== id) pick[id] = k;
  }
  if (!Object.keys(pick).length || typeof document === 'undefined') return;
  const re = new RegExp('img/(' + Object.keys(pick).join('|') + ')(_ghost|_glow)?\\.webp');
  const fix = el => { for (const a of ['src', 'href']) { const v = el.getAttribute && el.getAttribute(a); if (v && re.test(v)) el.setAttribute(a, v.replace(re, (m, id, suf) => `img/${pick[id]}${suf || ''}.webp`)); } };
  const scan = root => { if (root.nodeType !== 1) return; fix(root); root.querySelectorAll('img, image').forEach(fix); };
  new MutationObserver(ms => ms.forEach(m => { if (m.type === 'attributes') fix(m.target); else m.addedNodes.forEach(scan); }))
    .observe(document.documentElement, {subtree: true, childList: true, attributes: true, attributeFilter: ['src', 'href']});
  document.addEventListener('DOMContentLoaded', () => scan(document.body));
})();

// le foto più colorate di ogni fighter: a ogni visita una fascia a caso prende uno sfondo a colori sfumato
const COLOR_BG = {"ali": ["ali_1", "ali_4", "ali_7"], "debuttante": ["debuttante_19", "debuttante_12", "debuttante_15"], "fedor": ["fedor_4", "fedor_2", "fedor_1"], "floyd": ["floyd_4", "floyd_1"], "khabib": ["khabib_2", "khabib_3", "khabib_4"], "topuria": ["topuria_1", "topuria_2"], "tyson": ["tyson_1", "tyson_6", "tyson_5"], "vlad": ["vlad_10", "vlad_9", "vlad_5"]};
