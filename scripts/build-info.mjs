import { writeFileSync } from 'node:fs';

const file = new URL('../src/app/build-info.ts', import.meta.url);
writeFileSync(file, `export const BUILD_TIME = '${new Date().toISOString()}';\n`);
