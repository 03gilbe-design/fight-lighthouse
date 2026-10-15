# Prepara le immagini dei poster (poster.js): dipinti ritoccati, ritagli rembg, retini a punti.
# Lancio: C:\Python310\python.exe img\poster\prep_poster.py   (sorgenti in img/poster/src, vedi FONTI.txt)
import pathlib
from PIL import Image, ImageOps, ImageEnhance, ImageDraw, ImageFilter

HERE = pathlib.Path(__file__).parent
SRC, IMG = HERE / 'src', HERE.parent
FIGHTERS = ['debuttante', 'vlad', 'ali', 'tyson', 'floyd', 'khabib', 'fedor', 'topuria']


def cut(im):
    from rembg import remove, new_session
    global _S
    try: _S
    except NameError: _S = new_session('isnet-general-use')
    o = remove(im, session=_S)  # alpha netto: rembg lascia i bordi dei dipinti semitrasparenti
    o.putalpha(o.getchannel('A').point(lambda v: 255 if v > 90 else 0).filter(ImageFilter.GaussianBlur(.8)))
    return o


def halftone(im, cell=9, angle=45):
    """Retino a punti neri su trasparente: raggio del punto = scuro del pixel. Griglia ruotata come in stampa."""
    im = im.convert('RGBA')
    a = im.getchannel('A')
    g = ImageOps.autocontrast(im.convert('L'), cutoff=2)
    g = ImageEnhance.Contrast(g).enhance(1.25)
    W, H = im.size
    gr = g.rotate(angle, expand=True, fillcolor=255)
    ar = a.rotate(angle, expand=True, fillcolor=0)
    S = 3  # disegno a 3x e riduco: punti lisci
    out = Image.new('L', (gr.width * S, gr.height * S), 0)
    d = ImageDraw.Draw(out)
    gp, ap = gr.load(), ar.load()
    for y in range(0, gr.height, cell):
        for x in range(0, gr.width, cell):
            cx, cy = min(x + cell // 2, gr.width - 1), min(y + cell // 2, gr.height - 1)
            if ap[cx, cy] < 100: continue
            dark = 1 - gp[cx, cy] / 255
            r = cell * 0.74 * dark ** 0.8 * S
            if r < 0.6 * S: continue
            X, Y = (x + cell / 2) * S, (y + cell / 2) * S
            d.ellipse([X - r, Y - r, X + r, Y + r], fill=255)
    out = out.resize(gr.size, Image.LANCZOS).rotate(-angle, expand=True)
    ox, oy = (out.width - W) // 2, (out.height - H) // 2
    mask = out.crop((ox, oy, ox + W, oy + H))
    res = Image.new('RGBA', (W, H), (11, 11, 11, 0))
    res.putalpha(mask)
    return res


def fit(im, h):
    return im.resize((round(im.width * h / im.height), h), Image.LANCZOS)


def save(im, name, q=82):
    print(name, im.size, im.mode, flush=True)
    im.save(HERE / name, 'WEBP', quality=q, method=6)


import sys
if 'solo_retini' in sys.argv:
    for f in FIGHTERS:
        save(halftone(fit(Image.open(IMG / f'{f}.webp'), 1000)), f'ht_{f}.webp')
    sys.exit()

# 1. Arbo, Åsgårdsreien: banda dei cavalieri, schiarita (la scansione del museo e' molto scura)
a = Image.open(SRC / 'arbo.jpg').convert('RGB')
W, H = a.size
a = a.crop((0, int(H * .08), W, int(H * .78)))
a = ImageOps.autocontrast(a, cutoff=1)
a = a.point(lambda v: 255 * (v / 255) ** 0.85)
r_, g_, b_ = a.split()  # scaldo: la scansione tira al blu
a = Image.merge('RGB', (r_.point(lambda v: min(255, v * 1.12)), g_, b_.point(lambda v: v * .86)))
a = ImageEnhance.Color(a).enhance(1.1)
a = ImageEnhance.Contrast(a).enhance(1.15)
save(fit(a, 900), 'arbo.webp', 80)

# 2. Reni, San Michele: ritaglio intero
r = Image.open(SRC / 'reni.jpg').convert('RGB')
rc = cut(fit(r, 1400)); rc = rc.crop(rc.getbbox())
save(fit(rc, 1100), 'reni_cut.webp')
save(halftone(fit(rc, 1100)), 'ht_reni.webp')

# 3. Gerome, Pollice verso: il gladiatore vincitore sul vinto
g = Image.open(SRC / 'gerome.jpg').convert('RGB')
W, H = g.size
g = g.crop((int(W * .22), int(H * .50), int(W * .58), int(H * .99)))
gc = cut(g); gc = gc.crop(gc.getbbox())
save(fit(gc, 900), 'gerome_cut.webp')
save(halftone(fit(gc, 900)), 'ht_gerome.webp')

del _S; import gc; gc.collect()  # il modello rembg occupa molta RAM

# 4. Delacroix, Giaour e Hassan: bicromia nero/rosso scuro per la fascia bassa del cartellone
dl = Image.open(SRC / 'delacroix.jpg').convert('L')
dl = ImageOps.autocontrast(dl, cutoff=1)
dl = ImageOps.colorize(dl, black=(8, 0, 0), white=(150, 20, 12), mid=(60, 4, 2))
save(fit(dl, 900), 'delacroix_duo.webp', 78)

# 5. retino dei fighter (variante crema e classifiche)
for f in FIGHTERS:
    im = Image.open(IMG / f'{f}.webp')
    save(halftone(fit(im, 1000)), f'ht_{f}.webp')
