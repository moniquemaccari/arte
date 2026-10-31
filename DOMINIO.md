# Domínio próprio: moniquemaccari.com

O site já funciona em qualquer endereço (só usa caminhos relativos). Para ligar o domínio:

## 1. Comprar o domínio ✅
Comprado na **Cloudflare** em 31/10/2026, válido até 31/10/2027. Conferir em *Manage domain* que a **renovação automática** está ligada.

## 2. Ativar o GitHub Pages
Repositório `moniquemaccari/arte` → **Settings → Pages** → *Deploy from a branch* → branch do site, pasta `/ (root)` → Save.

## 3. Registros de DNS (Cloudflare → moniquemaccari.com → DNS → Records)
Criar os registros abaixo com **Proxy status: DNS only** (nuvem cinza), senão o GitHub não consegue emitir o certificado HTTPS:

| Tipo | Nome / Host | Valor |
|---|---|---|
| A | @ (vazio) | 185.199.108.153 |
| A | @ (vazio) | 185.199.109.153 |
| A | @ (vazio) | 185.199.110.153 |
| A | @ (vazio) | 185.199.111.153 |
| CNAME | www | moniquemaccari.github.io |

## 4. Ligar o domínio no repositório
- O arquivo `CNAME` (uma linha: `moniquemaccari.com`) já está na raiz do repositório. ✅
- Em **Settings → Pages → Custom domain**, conferir que aparece `moniquemaccari.com` e esperar o "DNS check successful" (de minutos até algumas horas).
- Marcar **Enforce HTTPS**.


## 5. Depois
- Trocar os links no Instagram, Behance, LinkedIn, Lattes, CV e assinatura de e-mail para https://moniquemaccari.com
- Opcional e grátis: e-mail contato@moniquemaccari.com encaminhando para o Gmail (Email Forwarding do Porkbun ou Cloudflare Email Routing).
