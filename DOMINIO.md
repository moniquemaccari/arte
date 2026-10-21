# Domínio próprio: moniquemaccari.com

O site já funciona em qualquer endereço (só usa caminhos relativos). Para ligar o domínio:

## 1. Comprar o domínio
- Em porkbun.com (ou Cloudflare), comprar **moniquemaccari.com** por 1 ano, com renovação automática.
- Não comprar extras (hospedagem, e-mail, SSL): o GitHub Pages já dá hospedagem e HTTPS.

## 2. Ativar o GitHub Pages
Repositório `moniquemaccari/arte` → **Settings → Pages** → *Deploy from a branch* → branch do site, pasta `/ (root)` → Save.

## 3. Registros de DNS (no painel do registrador)
Apagar os registros que vierem por padrão (parking) e criar:

| Tipo | Nome / Host | Valor |
|---|---|---|
| A | @ (vazio) | 185.199.108.153 |
| A | @ (vazio) | 185.199.109.153 |
| A | @ (vazio) | 185.199.110.153 |
| A | @ (vazio) | 185.199.111.153 |
| CNAME | www | moniquemaccari.github.io |

## 4. Ligar o domínio no repositório
- Mover `tools/dominio/CNAME` para a raiz do repositório (é um arquivo de uma linha: `moniquemaccari.com`) e publicar.
- Em **Settings → Pages → Custom domain**, conferir que aparece `moniquemaccari.com` e esperar o "DNS check successful" (de minutos até algumas horas).
- Marcar **Enforce HTTPS**.

O `CNAME` fica guardado em `tools/dominio/` até o domínio estar comprado: se ele for para a raiz antes, o endereço do GitHub passa a redirecionar para um domínio que ainda não existe e o site sai do ar.

## 5. Depois
- Trocar os links no Instagram, Behance, LinkedIn, Lattes, CV e assinatura de e-mail para https://moniquemaccari.com
- Opcional e grátis: e-mail contato@moniquemaccari.com encaminhando para o Gmail (Email Forwarding do Porkbun ou Cloudflare Email Routing).
