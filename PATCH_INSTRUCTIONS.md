# Quick installation instructions

This archive is a **safe refresh patch** for the existing `Global_Holiday` repository.

It deliberately keeps the current React / Create React App structure so you do not have to migrate the whole project immediately before the interview.

## 1. Back up the current project

Make a copy of your existing project folder first.

## 2. Copy these files into the existing repository

Copy the contents of this patch into the root of your existing `Global_Holiday` project and allow it to replace files with the same names.

The patch replaces:

- `README.md`
- `src/App.js`
- `src/App.css`
- `src/App.test.js`
- `src/components/HolidayList.js`
- `src/components/HolidayList.css`
- `src/components/HolidayList.test.js`
- `src/components/Modal.js`
- `src/components/Modal.css`
- `src/components/Footer.js`
- `src/components/Footer.css`
- `src/locales/en/translation.json`
- `src/locales/es/translation.json`

It does **not** change `package.json` or `package-lock.json`.

## 3. Test locally

From the project folder:

```bash
npm install
npm start
```

Check:

1. the site no longer stays on `Loading...`
2. holidays appear
3. search works
4. country/type filters work
5. date filters work
6. details modal opens and closes
7. dark mode works
8. English / Spanish switching works
9. refresh the page and confirm theme/language persist

## 4. Run the tests

```bash
npm test
```

If the older dependency stack causes a testing-library compatibility warning, do not start a dependency migration immediately before the interview. The production application is the first priority.

## 5. Commit the maintenance refresh

Example:

```bash
git add .
git commit -m "Refresh holiday finder API handling and UI"
git push
```

If Vercel is connected to the GitHub repository, the push should trigger a deployment.

## What this refresh fixes

- legacy Nager.Date v2 API endpoint -> v3
- infinite `Loading...` state when the API request fails
- duplicate API request in `App.js`
- weak/no API error feedback
- no retry path
- stale README
- stale copyright year
- inconsistent light/dark page background
- outdated tests that no longer matched the component behaviour
- limited filtering feedback
- modal accessibility / Escape behaviour
- basic mobile layout

## What I deliberately did NOT change tonight

I did not perform a full Create React App -> Vite migration or a major dependency upgrade.

That would be a sensible future improvement, but it creates unnecessary deployment risk immediately before an interview.

## Interview explanation

A concise way to explain the refresh:

> I originally built the project independently during the summer before my final year. When I revisited it, I found realistic maintenance issues: the external API had moved from a legacy endpoint, errors could leave the application stuck in a loading state, documentation was stale, and some tests no longer represented the current implementation. I prioritised the runtime failure first, removed duplicate responsibility for fetching data, added explicit error and retry handling, then improved the UI, accessibility and documentation. It was a useful example of maintaining existing software rather than simply rewriting it.
