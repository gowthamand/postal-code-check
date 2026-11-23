# Angular Postal PIN

## What is Angular Postal PIN?

Angular Postal PIN is a small, single-page Angular application that looks up
**Indian postal PIN codes**. Enter a 6-digit PIN code and the app lists every
post office that serves it — name, branch type, district, state and region —
using the public [Postal PIN Code API](https://api.postalpincode.in).

It is built with standalone components, signals and the new `@for` control flow,
and runs zoneless on the latest Angular.

## Release Information

| Item              | Version  |
| ----------------- | -------- |
| Angular           | 22.x     |
| Angular CLI       | 22.x     |
| TypeScript        | 6.0.x    |
| RxJS              | 7.8.x    |
| Test runner       | Vitest 4 |

### Changelog

- **Angular 12 → 22 upgrade**
  - Switched to the `@angular/build:application` builder (esbuild/Vite).
  - Replaced `AppModule` with standalone `bootstrapApplication` + `provideHttpClient()`.
  - Removed `zone.js`, `polyfills.ts` and environment files (zoneless by default).
  - Component state moved to signals; template uses `@for` and `ngModel`.
  - Typed `PostalService` responses (`PincodeResponse`, `PostOffice`).
  - Replaced Karma/Jasmine with Vitest + jsdom; specs rewritten to cover the search flow.
- Fixes a build failure on modern Node (`ERR_OSSL_EVP_UNSUPPORTED`) caused by Angular 12's webpack.

## Server Requirements

- **Node.js** `^22.22.3`, `^24.15.0` or `>=26.0.0` (pinned to 22.23.2 in `.nvmrc`)
- **npm** 10 or newer
- Network access to `https://api.postalpincode.in` at runtime

> Angular 22 does **not** run on Node 20 or earlier. With nvm, run `nvm use` in the project root.

## Installation

```bash
nvm use
```

```bash
npm install
```

The project ships an `.npmrc` with `legacy-peer-deps=true`; this works around an
npm 10 resolver bug (`Cannot read properties of null (reading 'edgesOut')`)
triggered by Vitest's optional peer dependencies.

## Usage

### Development server

```bash
npm start
```

Open `http://localhost:4200/`. The app reloads automatically when source files change.

### Build

```bash
npm run build
```

Production artifacts are written to `dist/angular-postal-pin/browser/`.

### Running unit tests

```bash
npm test -- --watch=false
```

### Code scaffolding

```bash
npx ng generate component component-name
```

## Project Structure

```
src/
├── main.ts                    # bootstrapApplication + providers
├── index.html
├── styles.css
└── app/
    ├── app.component.ts       # search form state (signals)
    ├── app.component.html     # form + results table
    ├── app.component.css
    ├── app.component.spec.ts  # Vitest specs
    └── postal.service.ts      # Postal PIN Code API client
```

## Build Verification

Last verified on Node 22.23.2:

| Check                    | Result                                   |
| ------------------------ | ---------------------------------------- |
| `npm run build`          | ✔ Success — initial bundle 194 kB (54 kB gzipped) |
| `npm test`               | ✔ 3 / 3 tests passed                     |
| Manual check (`110001`)  | ✔ Post offices listed in the results table |

## Resources

- [Angular documentation](https://angular.dev)
- [Angular CLI reference](https://angular.dev/cli)
- [Angular update guide](https://angular.dev/update-guide)
- [Postal PIN Code API](https://api.postalpincode.in)

## Further help

Run `npx ng help` or see the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
