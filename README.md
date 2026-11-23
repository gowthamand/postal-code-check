# <a href="https://github.com/gowthamand/postal-code-check">Postal Code Check, Indian PIN Code Search</a>

[![Angular](https://img.shields.io/badge/Angular-22-DD0031.svg)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6.svg)](#)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933.svg)](#)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000.svg)](https://postal-code-check.vercel.app/)

<a href="https://postal-code-check.vercel.app/" target="_blank" rel="noopener noreferrer"><img src="docs/screenshots/live-demo.svg" width="24" height="24" align="absmiddle" alt=""> <b>Live Demo</b></a>

## Key Features

- Search any 6-digit Indian PIN code
- Lists every post office for the PIN: name, branch type, delivery status, district, state and region
- Input validation (digits only, 6 digits, cannot start with 0)
- Loading, "no results" and error states
- Responsive layout: a table on desktop, stacked cards on mobile
- Follows the system light or dark theme
- No backend or database needed; data comes from the public [Postal PIN Code API](https://api.postalpincode.in)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 22 (standalone components, signals, zoneless) |
| Language | TypeScript 6.0 |
| Data fetching | Angular `httpResource` |
| Build | `@angular/build` (esbuild + Vite) |
| Tests | Vitest + jsdom |
| Hosting | Vercel |

## Configuration

There are no environment variables or secrets. Node.js 22 or newer is required.

| File | Purpose |
|---|---|
| `vercel.json` | Build command, output folder and single-page-app rewrite for Vercel |

## Run Locally

```bash
git clone https://github.com/gowthamand/postal-code-check
cd postal-code-check

npm install
npm start
```

Open http://localhost:4200

Build for production (output in `dist/angular-postal-pin/browser/`):

```bash
npm run build
```

Run the unit tests:

```bash
npm test -- --watch=false
```

## Project Structure

```
src/main.ts                        App bootstrap (bootstrapApplication + provideHttpClient)
src/app/app.component.ts           Search state: PIN input, validation, status
src/app/app.component.html         Search form, results header and table
src/app/app.component.css          Component styles and animations
src/app/postal.service.ts          Postal PIN Code API client (httpResource)
src/app/app.component.spec.ts      Unit tests (Vitest)
src/styles.css                     Global colors and light/dark theme
vercel.json                        Vercel deployment settings
```

## Screenshots

**Desktop**
![Desktop](docs/screenshots/desktop.jpg)

**Mobile**
<img src="docs/screenshots/mobile.jpg" alt="Mobile" width="320">

## ⭐ Don't forget to give a star and fork!
