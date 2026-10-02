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
      "<p>She holds a Bachelor of Visual Arts from the Institute of Arts at the Federal University of Rio Grande do Sul (UFRGS). Since 2016 she has been a member of <strong>Studio P — Open Painting Studio, Research and Outreach</strong>, coordinated by Marilice Villeroy Corona.</p>" +
      "<p>Her research focuses on portraiture and landscape. She works from photographs of people she is close to, building the image through the brushstroke: intervention is part of the process, revealing personality through detail — the physical memory shaped by emotional and cultural memories.</p>" +
      "<p>She now lives in Australia, where she keeps painting.</p>",
    "about.quote": "“I have a strong relationship with portraits. In every painting or drawing I tried to capture the essence of these people.”",
    "about.quoteSrc": "Pioneiro newspaper, 2019",
    "cv.title": "CV",
    "cv.solo": "Solo exhibition",
    "cv.solo1": "Curated by Carolina Guimarães; produced by Núcleo de Arte Unificada (NAU) and Paralela. Series Portraits, Cotton and Guitarrísticos.",
    "cv.group": "Group exhibitions",
    "cv.group1": "Curated by Thiana Sehn; Studio P.",
    "cv.group3": "early recipes of analogue photography",
    "cv.curator": "Curating & organisation",
    "cv.cur1": "group exhibition",
    "cv.cur2": "co-organiser of the Studio P group exhibition",
    "cv.interventions": "Art interventions (Studio P)",
    "cv.int2": "at the invitation of Laura Castilhos",
    "cv.int5": "80 canvases, Botanical Garden",
    "cv.urban": "urban intervention",
    "cv.edu": "Education & research",
    "cv.edu1": "Bachelor of Visual Arts",
    "cv.edu1b": "Supervisor: Marilice Villeroy Corona.",
    "cv.edu2": "Open painting studio, research and outreach (UFRGS)",
    "cv.edu3": "Undergraduate research scholarship BIC — UFRGS",
    "cv.edu3b": "“Representing personality through the painted portrait”, theoretical-practical research in painting.",
    "cv.events": "Workshops, seminars & talks",
    "cv.kiln": "with Porsche Owen",
    "press.title": "Press & links",
    "press.p1": "“3x4” exhibition by Caxias-born artist Monique Maccari opens to the public",
    "press.p3": "Portfolio on Behance",
    "press.p4": "Instagram post",
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
