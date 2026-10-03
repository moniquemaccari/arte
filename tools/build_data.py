"""Gera assets/js/data.js a partir de tools/series.json (exportado do WordPress)."""
import json, re, subprocess, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
series = json.load(open(ROOT / "tools/series.json"))

CATEGORY = {
    "pintura": ["seu-helio", "retratos", "retratos-2", "o-vermelho", "grace-and-philip"],
    "desenho": ["algodao", "guitarristicos", "nankin"],
    "fotografia": ["pensionato", "pensionato-ii", "pensionato-iii", "pensionato-iv", "sobe", "pilhar",
                   "gaivotas", "cockscomb", "pena", "meia", "retrato-fotografico", "detalhe",
                   "diario-de-bordo", "pintura-na-fotografia", "sem-titulo-2018", "neo",
                   "processos-quimicos-da-fotografia"],
    "coletivo": ["panoramica-ii-studiop", "quanto-mais-eu-pinto", "no-estudio-margs", "gabinete-a-ceu-aberto", "exposicao-fabbrica"],
}
ORDER = [s for c in CATEGORY.values() for s in c]

# Títulos, anos e técnicas revisados (o WordPress tinha alguns vazios).
META = {
    "seu-helio": ("3×4", "2016", "Óleo sobre tela, 165 × 110 cm", "Oil on canvas, 165 × 110 cm"),
    "retratos": ("Retratos I", "2015", "Óleo sobre tela", "Oil on canvas"),
    "retratos-2": ("Retratos II", "2018–2019", "Óleo e pastel oleoso sobre tela", "Oil and oil pastel on canvas"),
    "o-vermelho": ("O Vermelho", "2019–2020", "Acrílica, pastel e óleo sobre tela", "Acrylic, pastel and oil on canvas"),
    "grace-and-philip": ("Grace and Philip", "2019", "Pintura", "Painting"),
    "algodao": ("Algodão", "2018", "Pastel seco sobre algodão", "Soft pastel on cotton"),
    "guitarristicos": ("Guitarrísticos", "2018", "Nanquim, grafite, carvão e pastel sobre papel, 29 × 42 cm",
                       "Ink, graphite, charcoal and pastel on paper, 29 × 42 cm"),
    "nankin": ("Nanquim", "2018–2021", "Caneta nanquim sobre papel Canson", "Ink pen on Canson paper"),
    "pensionato": ("Pensionato", "2015", "Fotografia digital", "Digital photography"),
    "pensionato-ii": ("Pensionato II", "2015", "Fotografia digital", "Digital photography"),
    "pensionato-iii": ("Pensionato III", "2015", "Fotografia digital", "Digital photography"),
    "pensionato-iv": ("Pensionato IV", "2015", "Fotografia digital", "Digital photography"),
    "sobe": ("Sobe", "2015", "Fotografia digital", "Digital photography"),
    "pilhar": ("Pilhar", "2016", "Fotografia digital", "Digital photography"),
    "gaivotas": ("Gaivotas", "2016", "Fotografia digital", "Digital photography"),
    "cockscomb": ("Cockscomb", "2015", "Fotografia digital", "Digital photography"),
    "pena": ("Pena", "2015", "Digitalização", "Scanography"),
    "meia": ("Meia", "2015", "Digitalização", "Scanography"),
    "retrato-fotografico": ("Retrato fotográfico", "2015", "Fotografia digital — fotolivro", "Digital photography — photobook"),
    "detalhe": ("DEtalhe", "2019", "Fotografia digital", "Digital photography"),
    "diario-de-bordo": ("Diário de Bordo", "2018", "Fotografia digital", "Digital photography"),
    "pintura-na-fotografia": ("Pintura na Fotografia", "2019", "Fotografia digital", "Digital photography"),
    "sem-titulo-2018": ("Sem título", "2018", "Fotografia digital", "Digital photography"),
    "neo": ("Neo", "2019", "Fotografia e colagem", "Photography and collage"),
    "processos-quimicos-da-fotografia": ("Processos químicos da fotografia", "2015",
                                         "Processos históricos de revelação (papel salgado e albuminado)",
                                         "Historical printing processes (salt and albumen prints)"),
    "panoramica-ii-studiop": ("Panorâmica II — Jardim Botânico (Studio P)", "2018",
                              "Acrílica sobre tela, 80 telas de 30 × 30 cm (120 × 600 cm) — homenagem a Thiana Sehn",
                              "Acrylic on canvas, 80 canvases of 30 × 30 cm (120 × 600 cm) — tribute to Thiana Sehn"),
    "exposicao-fabbrica": ("Exposição Fábbrica", "2019", "Vista de exposição", "Exhibition view"),
    "gabinete-a-ceu-aberto": ("Gabinete a céu aberto — Studio P", "2016",
                              "Pintura coletiva no muro da Av. Mauá, Projeto Arte no Muro 2016",
                              "Collective mural on the Av. Mauá wall, Arte no Muro 2016"),
    "no-estudio-margs": ("No eStúdio — MARGS", "2017", "Exposição coletiva do Studio P, Sala João Fahrion, MARGS",
                         "Studio P group exhibition, Sala João Fahrion, MARGS"),
    "quanto-mais-eu-pinto": ("Quanto mais eu pinto, mais eu vejo…", "2018", "Exposição coletiva do Studio P, Sala Fahrion, UFRGS",
                             "Studio P group exhibition, Sala Fahrion, UFRGS"),
}


def decode(url):
    n = url.rsplit("/", 1)[1].rsplit(".", 1)[0]
    n = re.sub(r"c3([0-9a-f]{2})", lambda m: bytes([0xC3, int(m.group(1), 16)]).decode("utf8", "replace"), n)
    return n


FIXES = {"Mae e Rafa": "Mãe e Rafa", "Fotografia Digital": ""}
OVERRIDES = {"felicidade-em-penca": "Felicidade em penca, 2020, 90 × 120 cm (detalhe)",
             "decomposicao": "Decomposição", "tapete-de-samambaias": "Tapete de samambaias",
             "begonha": "Begônia", "triptico": "Tríptico", "alecrim": "Alecrim"}


def caption(url):
    for key, text in OVERRIDES.items():
        if key in url:
            return text
    c = _caption(url)
    name = c.split(",")[0]
    if name in FIXES:
        c = FIXES[name] and c.replace(name, FIXES[name], 1)
    return c


def _caption(url):
    """Extrai 'Nome, ano' de nomes como 'carol-2018-oleo-sobre-tela-50x50cm'."""
    n = decode(url).replace("monique-maccari-", "")
    m = re.match(r"^([a-zà-ÿ\-]+?)-(?:\d-)?(20\d\d)-(.*)$", n, re.I)
    if not m:
        return ""
    name = m.group(1).replace("-", " ").strip()
    name = " ".join(w if w in ("e",) else w.capitalize() for w in name.split())
    if name.lower() in ("sem título", "sem titulo"):
        name = "Sem título"
    rest = m.group(3)
    dims = re.search(r"(\d+)\s*-?x-?\s*(\d+)\s*cm", rest)
    dim = f", {dims.group(1)} × {dims.group(2)} cm" if dims else ""
    return f"{name}, {m.group(2)}{dim}"


def size(path):
    out = subprocess.check_output(["identify", "-format", "%w %h", str(ROOT / path)]).decode().split()
    return int(out[0]), int(out[1])


cat_of = {s: c for c, ss in CATEGORY.items() for s in ss}
by_slug = {s["slug"]: s for s in series}
data = []
for slug in ORDER:
    s = by_slug[slug]
    title, year, tech_pt, tech_en = META[slug]
    imgs = []
    caps = s.get("captions") or [""] * len(s["images"])
    for src, local, cap in zip(s["src"], s["images"], caps):
        w, h = size(local)
        imgs.append({"src": local, "thumb": local.replace("assets/img/", "assets/thumbs/"),
                     "w": w, "h": h, "caption": cap or caption(src)})
    data.append({"slug": slug, "category": cat_of[slug], "title": title, "year": year,
                 "technique": {"pt": tech_pt, "en": tech_en}, "images": imgs})

js = "// Gerado por tools/build_data.py — não editar à mão.\nwindow.WORKS = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n"
(ROOT / "assets/js").mkdir(parents=True, exist_ok=True)
(ROOT / "assets/js/data.js").write_text(js)
print(len(data), "séries,", sum(len(d["images"]) for d in data), "imagens")
