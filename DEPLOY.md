# Deploy na Vercel

## Pré‑requisitos
- Repositório GitHub: `https://github.com/Jctrading77/sitejc.git` na branch `main`.
- Build local passando: `npm run build` gera `dist/`.
- `vercel.json` presente com:
  - `framework: "vite"`
  - `buildCommand: "npm run build"`
  - `outputDirectory: "dist"`

## Passo a passo (Dashboard)
1. Acesse a Vercel e clique em `Add New → Project`.
2. Selecione o repositório `sitejc` (GitHub).
3. Confirme as configurações detectadas (Framework: Vite, Build: `npm run build`, Output: `dist`).
4. Clique em `Deploy` e aguarde.
5. Cada push na `main` dispara novo deploy automaticamente.

## Via CLI (opcional)
- Login: `npx vercel login` (interativo).
- Link/criação: `npx vercel --yes`.
- Produção: `npx vercel --prod`.

## Dicas
- Para SPA com React Router, configurar rewrites para `index.html` (não necessário aqui).
- Variáveis de ambiente: `Vercel → Settings → Environment Variables`.