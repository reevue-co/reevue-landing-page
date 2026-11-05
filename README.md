# Reevue

Landing page da Reevue em português do Brasil (`/pt-br`) e espanhol latino-americano (`/es`). A raiz `/` redireciona para `/pt-br`.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). O servidor redireciona para `/pt-br`.

Para simular os formulários, copie `.env.example` para `.env.local` e preencha as URLs.

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

## Configurar o Google Forms

Defina as variáveis públicas:

- `NEXT_PUBLIC_GOOGLE_FORM_URL_PT`
- `NEXT_PUBLIC_GOOGLE_FORM_URL_ES`

As duas podem usar a mesma URL. Todos os botões de acesso antecipado abrem o formulário do idioma atual em uma nova aba. Se a variável estiver vazia ou não for um endereço `http`/`https`, o botão deixa de navegar e mostra o aviso de cadastro em breve. Não há integração direta com planilhas.

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
