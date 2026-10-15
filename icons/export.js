// Esporta il set di icone di data.js: un file SVG per icona + index.html con la griglia (24 e 64 px).
// Uso: node icons/export.js   (dalla cartella del concept o da qualsiasi posto)
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
// data.js tocca il DOM all'avvio: basta uno stub minimo per leggerne le costanti
const noop = () => {};
const document = {body: {insertAdjacentHTML: noop, classList: {toggle: noop}}, querySelectorAll: () => [], addEventListener: noop};
const {ICON_PATHS, STROKE, iconBody, PENCIL_DEFS: DEFS} = new Function('document', 'localStorage',
  fs.readFileSync(path.join(root, 'data.js'), 'utf8') + ';return {ICON_PATHS, STROKE, iconBody, PENCIL_DEFS};')(document, {getItem: () => null, setItem: noop});
const svg = name => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" color="#F2F0EB" stroke-linecap="round" stroke-linejoin="round">${DEFS}<g filter="url(#pencil)" stroke-width="${STROKE.m}">${iconBody(name)}</g><g filter="url(#pencil2)" stroke-width="${STROKE.m}" opacity=".3" transform="translate(.4 -.3)">${iconBody(name)}</g></svg>\n`;

const names = Object.keys(ICON_PATHS);
names.forEach(n => fs.writeFileSync(path.join(__dirname, `${n}.svg`), svg(n)));

const cells = names.map(n => `<figure><div class="big"><img src="${n}.svg" width="64" height="64" alt=""></div><div class="small"><img src="${n}.svg" width="24" height="24" alt=""><span>24 px</span></div><figcaption>${n}</figcaption></figure>`).join('\n');
fs.writeFileSync(path.join(__dirname, 'index.html'), `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Fight Lighthouse — Icone</title>
<link rel="stylesheet" href="../fonts.css">
<style>
:root{--black:#0B0B0B;--white:#F2F0EB;--grey:#8C8A86;--red:#E10600}
*{box-sizing:border-box}
html,body{margin:0;background:var(--black);color:var(--white)}
body{font:500 15px/1.4 Archivo,sans-serif;padding:32px clamp(16px,4vw,56px) 64px}
h1{margin:0;font:400 clamp(48px,7vw,96px)/.9 Anton;text-transform:uppercase}
h1 em{font:italic 400 .4em "Instrument Serif";color:var(--red);text-transform:none;margin-left:10px}
.k{display:flex;flex-wrap:wrap;gap:8px 28px;margin:18px 0 28px;font:600 11px "IBM Plex Mono";letter-spacing:.12em;text-transform:uppercase;color:var(--grey)}
.k b{color:var(--white)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:2px;background:#2a2a2a;border:2px solid #2a2a2a}
figure{margin:0;background:var(--black);padding:18px 12px 12px;display:flex;flex-direction:column;align-items:center;gap:12px}
.big img{display:block}
.small{display:flex;align-items:center;gap:8px;font:600 9px "IBM Plex Mono";color:var(--grey);letter-spacing:.1em}
figcaption{font:600 11px "IBM Plex Mono";letter-spacing:.1em;text-transform:uppercase}
</style>
</head>
<body>
<h1>Icone<em>due spessori</em></h1>
<div class="k"><span><b>${names.length}</b> icone · viewBox 24</span><span>Medio <b>${STROKE.m}</b></span><span>Grosso <b>${STROKE.g}</b></span><span>Grafiche grandi: medio <b>3</b> · grosso <b>9</b></span><span>Generato da icons/export.js</span></div>
<div class="grid">
${cells}
</div>
</body>
</html>
`);
console.log(`${names.length} icone esportate`);
