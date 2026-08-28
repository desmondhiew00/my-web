# desmondhiew.com

Personal site. Astro shell with the app rendered as a React island.

```sh
pnpm install
pnpm dev        # astro dev
pnpm build      # astro build -> dist/
pnpm preview    # serve dist/
pnpm typecheck  # astro check
pnpm lint       # eslint ./src
pnpm extract    # lingui extract -> src/locales/{locale}/messages.po
```

- `src/pages/index.astro` — page shell + `<head>` metadata, mounts `src/App.tsx` with `client:only="react"`.
- `src/components`, `src/hooks` — React app.
- `src/i18n/index.ts` + `src/locales/*/messages.po` — Lingui catalogs; `en` is bundled, `ja`/`zh-CN` load on demand. Add copy with the `t`/`Trans` macros, then run `pnpm extract` and fill in the `msgstr`s.
- `astro.config.mjs` — React integration (with the Lingui babel macro) plus Lingui, Tailwind and svgr Vite plugins.

Deploys to Firebase Hosting from `dist/` (`.github/workflows/firebase-hosting-merge.yml`).
