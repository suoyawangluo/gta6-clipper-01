// gta6-clipper-01 entry program (Node 22, standard library only).
// The entry is a public YouTube video: this program's only job is to hand
// the video's address to the grader by copying VIDEO.json from the
// repository root into /output. It never touches the network or the clock.
//
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const video = readFileSync(join(botDir, 'VIDEO.json'), 'utf8');
const parsed = JSON.parse(video);
if (typeof parsed !== 'object' || parsed === null || typeof parsed.url !== 'string') {
  throw new Error('VIDEO.json must be a JSON object with a url string');
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'VIDEO.json'), video);
console.log(`wrote ${join(outDir, 'VIDEO.json')} — url: ${parsed.url || '(placeholder, fill in after upload)'}`);
