# Reevue

Landing page da Reevue em português do Brasil (`/pt-br`) e espanhol latino-americano (`/es`). A raiz `/` redireciona para `/pt-br`.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). O servidor redireciona para `/pt-br`.

Para o formulário enviar de verdade, copie `.env.example` para `.env.local` e preencha as variáveis do Google Sheets (veja abaixo).

```bash
npm run lint
npm run build
npm start
```

## Editar traduções

Os textos visíveis ficam nos dicionários tipados:

- `lib/dictionaries/pt-br.ts`
- `lib/dictionaries/es.ts`

O tipo compartilhado está em `lib/dictionary.ts`. Uma chave nova precisa existir nos dois idiomas, senão o TypeScript acusa o erro. Componentes reutilizam esses dicionários; não espalhe frases soltas pela interface.

## Formulário de contato → Google Sheets

O formulário (nome, perfil, imobiliária, país, estado, cidade, DDI + WhatsApp, e-mail, interesse, solução, site e dificuldade) envia os dados por uma Server Action para um Google Apps Script, que grava uma linha na planilha.

1. Crie uma planilha no Google Sheets.
2. Extensões → Apps Script. Cole o conteúdo de `scripts/google-sheet.gs`.
3. Configurações do projeto → Propriedades do script → adicione `SECRET` com uma senha longa qualquer.
4. Implantar → Nova implantação → tipo "App da Web". Executar como: você. Quem tem acesso: qualquer pessoa. Autorize e copie a URL `/exec`.
5. No `.env.local` (e na Vercel): `GOOGLE_SHEET_WEBHOOK_URL` = URL copiada, `GOOGLE_SHEET_WEBHOOK_SECRET` = o mesmo `SECRET`.
6. Reinicie `npm run dev`. Se alterar o script depois, crie uma nova versão da implantação.

Sem essas variáveis o formulário mostra o erro de envio.

## Publicar na Vercel

1. Importe o repositório na Vercel.
2. Confirme o framework Next.js. O comando de build é `npm run build`.
3. Em Settings → Environment Variables, adicione as variáveis do `.env.example` para Production e Preview.
4. Faça o deploy pelo painel da Vercel.

Este repositório não dispara deploy automático a partir daqui.

## Antes do lançamento

- Definir `NEXT_PUBLIC_SITE_URL` com o domínio real, em `https`, para publicar canonical, Open Graph absoluto, hreflang e sitemap.
- Conferir os dois links de formulário e o texto de confirmação do Google Forms.
- Incluir e-mail ou redes sociais apenas se os endereços forem reais. Sem valor, o rodapé não mostra contato.
- Revisar a cópia quando houver data de lançamento, preço ou recursos disponíveis. A página deixa explícito que a Reevue está em desenvolvimento.
- As fotos de imóvel são ilustrativas, da licença do Unsplash, e não representam clientes.

## Rotas

| Caminho | Idioma |
| --- | --- |
| `/` | Redireciona para `/pt-br` |
| `/pt-br` | Português do Brasil (`pt-BR`) |
| `/es` | Espanhol latino-americano (`es-419`) |
