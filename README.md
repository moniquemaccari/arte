# Monique Maccari — site e portfólio

Site estático (HTML/CSS/JS puro, sem build) reunindo pintura, desenho e fotografia de Monique Maccari, com currículo, imprensa e contato. Bilíngue: português / inglês (botão no topo).

## Ver localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## Publicar (GitHub Pages)

Settings → Pages → *Deploy from a branch* → escolha a branch e a pasta `/ (root)`.

## Estrutura

- `index.html` — página única (Obras, Sobre, Currículo, Imprensa, Contato)
- `assets/css/style.css` — estilos (tema claro/escuro automático)
- `assets/js/app.js` — galeria com filtros, visualizador e traduções
- `assets/js/data.js` — lista das séries e imagens (gerado)
- `assets/img/<série>/` — imagens em alta (1400px); `assets/thumbs/` — miniaturas
- `tools/series.json` + `tools/build_data.py` — dados importados do WordPress e script que gera `data.js`

## Adicionar uma série nova

1. Coloque as imagens em `assets/img/<slug>/01.jpg, 02.jpg…` e miniaturas em `assets/thumbs/<slug>/`.
2. Acrescente a série em `tools/series.json` e em `CATEGORY`/`META` no `tools/build_data.py`.
3. Rode `python3 tools/build_data.py`.

## Fontes

Conteúdo reunido de moniquemaccari.wordpress.com, Behance, Currículo Lattes, Pioneiro/GZH (2019) e UFRGS Difusão Cultural.
