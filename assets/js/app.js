(function () {
  const works = window.WORKS || [];
  const grid = document.getElementById("grid");

  // ---------- Traduções (o português vem do próprio HTML) ----------
  const EN = {
    "nav.works": "Works", "nav.about": "About", "nav.cv": "CV", "nav.press": "Press", "nav.contact": "Contact",
    "hero.eyebrow": "Visual artist · Painting · Drawing · Photography",
    "hero.lede": "Portraits of loved ones, landscapes and colour. Oil painting, pastel, ink and photography — from Caxias do Sul and Porto Alegre to Australia.",
    "hero.cta": "View works",
    "hero.caption": "Oil on canvas, 165 × 110 cm",
    "works.title": "Works",
    "cat.all": "All", "cat.pintura": "Painting", "cat.desenho": "Drawing", "cat.fotografia": "Photography", "cat.coletivo": "Collective",
    "about.title": "About",
    "about.body":
      "<p>Monique Maccari is a visual artist born in Caxias do Sul, Brazil, with an extensive body of work in painting, drawing and digital photography — most of her collection being oil portraits. She has been painting since the age of nine.</p>" +
      "<p>She holds a Bachelor of Visual Arts from the Institute of Arts at the Federal University of Rio Grande do Sul (UFRGS). From 2016 to 2022 she was a member of <strong>Studio P — Open Painting Studio, Research and Outreach</strong>, an outreach project of the Institute of Arts coordinated by Marilice Villeroy Corona: a studio open to participants from outside the university, exploring contemporary painting in all its multiplicity — from hyperrealist representation to installation painting, from figuration to abstraction. The group met weekly, hosted guest artists and theorists, and organised painting seminars, urban interventions and exhibitions — from its first group show at MARGS (2017) to the Curitiba Biennial (2019).</p>" +
      "<p>Her research focuses on portraiture and landscape. She works from photographs of people she is close to, building the image through the brushstroke: intervention is part of the process, revealing personality through detail — the physical memory shaped by emotional and cultural memories.</p>" +
      "<p>She now lives in Australia, where she keeps painting and has also taken up ceramics as a member of the Gold Coast Potters Association.</p>",
    "about.quote": "“I have a strong relationship with portraits. In every painting or drawing I tried to capture the essence of these people.”",
    "about.quoteSrc": "Pioneiro newspaper, 2019",
    "cv.title": "CV",
    "cv.solo": "Solo exhibition",
    "cv.solo1": "Produced and curated by Carolina Guimarães; presented by Núcleo de Arte Unificada (NAU), Reffúgio Art Café and Associação Cultural Paralela. Series Portraits, Cotton and Guitarrísticos.",
    "cv.group": "Group exhibitions",
    "cv.group1": "Studio P's 3rd-anniversary exhibition, curated by Thiana Sehn, featuring the collective paintings Panorâmica I (Mercado Público) and Panorâmica II (Botanical Garden).",
    "cv.group3": "early recipes of analogue photography",
    "cv.curator": "Curating & organisation",
    "cv.cur1": "group exhibition",
    "cv.cur2": "co-organiser of the Studio P group exhibition",
    "cv.interventions": "Art interventions (Studio P)",
    "cv.int2": "chalk mural at the UFRGS Cultural Centre (Centro Cultural da UFRGS), at the invitation of Laura Castilhos (01/08 – 23/09/2019)",
    "cv.int5": "acrylic on canvas, 120 × 600 cm (80 canvases of 30 × 30 cm), from a picnic scene photographed at Porto Alegre's Botanical Garden",
    "cv.urban": "urban intervention",
    "cv.cubic": "With Studio P, collective painting Panorâmica II — Jardim Botânico.",
    "cv.pubs": "Publications",
    "cv.teaching": "Teaching & workshops",
    "cv.teach1": "Painting workshops with Monique Maccari",
    "cv.teach1b": "Five Saturday workshops, 1:30–5:30 pm (1, 22 and 29 Sep, 6 Oct and 8 Dec 2018), starting with “From tempera to oil — phase 1”.",
    "cv.teach2": "Private painting classes",
    "cv.teach2b": "individuals and small groups, in Brazil and Australia",
    "cv.pub1": "Photographs (co-authored with Studio P).",
    "cv.ufpr": "Studio P selected through an open call, alongside the seminar “Thinking painting: the artist, teaching, research and outreach”.",
    "cv.feevale": "Curated by Júlio César Herbstrith and René Rudit; Studio P showed Panorâmica I, a collective painting based on a panoramic photo of Porto Alegre's Mercado Público.",
    "cv.tua": "collective acrylic wall painting at the UFRGS Rectorate, Porto Alegre, unveiled 12/03/2020; designed by Artur Veloso, painted by Studio P",
    "cv.maua": "mural on the Av. Mauá wall, Porto Alegre (2 April 2016), part of Santander Cultural's Arte no Muro 2016 project curated by André Venzon — 450 metres of wall painted by 30 artists and collectives",
    "press.p10": "Studio P — Getting to know UFRGS (12 min)",
    "press.p11": "Painting turns a UFRGS staircase into a bookshelf",
    "cv.germina": "painting of the truck that houses the Germina Multisector Incubator, UFRGS Campus Litoral Norte, Tramandaí (January 2019), supported by the UFRGS Science and Technology Park (ZENIT). Designed by Luiza Rio Dançante and developed by the team: a modular grid in warm colours that creates the illusion of niches holding icons of the incubator's mission",
    "cv.video": "Video",
    "cv.esc18": "Staircase painting",
    "cv.esc18b": "collective painting of the steps of a staircase at UFRGS Campus do Vale, near the Institute of Letters (early 2018)",
    "cv.aula": "Lecture and experience reports by Studio P members",
    "cv.aula2": "at the exhibition <em>Quanto mais eu pinto…</em>, Sala Fahrion, UFRGS",
    "press.p12": "Artistic creation revitalises the Germina Multisector Incubator",
    "press.p9": "Short film “Na UFRGS” — Monique appears painting",
    "press.video": "video",
    "press.p8": "Artist profile on the Studio P website",
    "press.p7": "Artists paint 450 metres of the Avenida Mauá wall in Porto Alegre",
    "cv.escada": "painting of the staircase to the Institute of Letters at UFRGS Campus do Vale, turned into a bookshelf full of books (10–16 Sep 2016). Made by 22 Studio P artists during Salão UFRGS 2016, invited by the Department of Cultural Outreach and DAV-IA",
    "cv.estudio": "Studio P's first group exhibition, alongside the II Painting Seminar: some questions for painting today.",
    "cv.edu": "Education & research",
    "cv.edu1": "Bachelor of Visual Arts",
    "cv.edu1b": "Undergraduate thesis (TCC 2020/1): “Um sítio para a pintura: a natureza como meio para aproximações” (“A site for painting: nature as a means of approach”), presented 25/11/2020, grade A. Supervisor: Marilice Villeroy Corona.",
    "cv.grad": "Graduating exhibition of the thesis “Um sítio para a pintura: a natureza como meio para aproximações”.",
    "cv.poster": "View poster",
    "cv.news": "Press",
    "cv.edu2": "Open painting studio, research and outreach (Institute of Arts, UFRGS), coordinated by Marilice Villeroy Corona. Outreach project with 18 undergraduate and 2 master's students; participation certified on 06/08/2020.",
    "cv.edu3": "Undergraduate research scholarship BIC — UFRGS",
    "cv.edu3b": "“A representação na pintura contemporânea: procedimentos metapicturais e outras estratégias — a atualização do retrato” (Representation in contemporary painting: metapictorial procedures and other strategies — updating the portrait), theoretical-practical research in painting, presented at Salão UFRGS 2016.",
    "cv.bicposter": "View poster",
    "cv.events": "Workshops, seminars & talks",
    "cv.kiln": "with Porsche Owen",
    "cv.pottery": "Pottery classes",
    "cv.pottery1": "with Jo Mackenzie (Amare Ceramics)",
    "cv.pottery2": "Australia, as a member of the association (Apr 2024 – Jun 2025)",
    "press.title": "Press & links",
    "press.p1": "“3x4” exhibition by Caxias-born artist Monique Maccari opens to the public",
    "press.p3": "Portfolio on Behance",
    "press.p4": "Studio P: Projeto Grafite de Giz — chalk mural at the UFRGS Cultural Centre",
    "press.p5": "Lattes CV (Brazilian academic CV)",
    "press.p6": "Previous website",
    "contact.title": "Contact",
    "contact.body": "Portrait commissions, exhibitions, collaborations or just a chat about painting — get in touch.",
    "footer.rights": "All images are the artist's own work.",
    "ui.images": (n) => `${n} images`,
  };
  const PT = { "ui.images": (n) => `${n} imagens` };

  document.querySelectorAll("[data-i18n]").forEach((el) => (PT[el.dataset.i18n] ??= el.textContent));
  document.querySelectorAll("[data-i18n-html]").forEach((el) => (PT[el.dataset.i18nHtml] = el.innerHTML));

  let lang = "pt";
  try { lang = localStorage.getItem("lang") || (navigator.language.startsWith("pt") ? "pt" : "en"); } catch (e) {}
  const t = (k) => (lang === "en" ? EN : PT)[k];

  function applyLang() {
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
    document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
    document.querySelectorAll("[data-i18n-html]").forEach((el) => (el.innerHTML = t(el.dataset.i18nHtml)));
    document.querySelector(".lang").textContent = lang === "en" ? "PT" : "EN";
    renderGrid();
  }
  document.querySelector(".lang").addEventListener("click", () => {
    lang = lang === "en" ? "pt" : "en";
    try { localStorage.setItem("lang", lang); } catch (e) {}
    applyLang();
  });

  // ---------- Grade de séries ----------
  let filter = "all";
  function renderGrid() {
    grid.innerHTML = "";
    works.forEach((w, i) => {
      const cover = w.images[0];
      const btn = document.createElement("button");
      btn.className = "work";
      btn.type = "button";
      btn.dataset.category = w.category;
      btn.hidden = filter !== "all" && filter !== w.category;
      btn.innerHTML = `
        <div class="work-img">
          <img src="${cover.thumb}" width="${cover.w}" height="${cover.h}" loading="lazy" alt="${w.title}, ${w.year}">
          ${w.images.length > 1 ? `<span class="work-count">${t("ui.images")(w.images.length)}</span>` : ""}
        </div>
        <div class="work-meta"><span class="work-title">${w.title}</span><span class="work-year">${w.year}</span></div>
        <span class="work-tech">${w.technique[lang]}</span>`;
      btn.addEventListener("click", () => openViewer(i, 0));
      grid.appendChild(btn);
    });
  }
  document.querySelectorAll(".filter").forEach((b) =>
    b.addEventListener("click", () => {
      filter = b.dataset.filter;
      document.querySelectorAll(".filter").forEach((x) => x.classList.toggle("is-active", x === b));
      grid.querySelectorAll(".work").forEach((el) => (el.hidden = filter !== "all" && filter !== el.dataset.category));
    })
  );

  // ---------- Visualizador ----------
  const viewer = document.getElementById("viewer");
  const vImg = document.getElementById("viewer-img");
  let cur = { s: 0, i: 0 };

  function show() {
    const w = works[cur.s];
    const img = w.images[cur.i];
    vImg.src = img.src;
    vImg.alt = img.caption || `${w.title}, ${w.year}`;
    document.getElementById("viewer-title").textContent = `${w.title} (${w.year})`;
    let tech = w.technique[lang];
    if (/cm/.test(img.caption)) tech = tech.replace(/,[^,]*cm.*$/, "");
    document.getElementById("viewer-caption").textContent = [img.caption, tech].filter(Boolean).join(" — ");
    document.getElementById("viewer-count").textContent = w.images.length > 1 ? `${cur.i + 1} / ${w.images.length}` : "";
    const next = w.images[(cur.i + 1) % w.images.length];
    new Image().src = next.src;
  }
  function openViewer(s, i) {
    cur = { s, i };
    show();
    viewer.showModal();
  }
  function step(d) {
    const n = works[cur.s].images.length;
    cur.i = (cur.i + d + n) % n;
    show();
  }
  viewer.querySelector(".viewer-close").addEventListener("click", () => viewer.close());
  viewer.querySelector(".viewer-prev").addEventListener("click", () => step(-1));
  viewer.querySelector(".viewer-next").addEventListener("click", () => step(1));
  viewer.addEventListener("click", (e) => { if (e.target === viewer || e.target.tagName === "FIGURE") viewer.close(); });
  document.addEventListener("keydown", (e) => {
    if (!viewer.open) return;
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });
  let touchX = null;
  viewer.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
  viewer.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
    touchX = null;
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  applyLang();
})();
