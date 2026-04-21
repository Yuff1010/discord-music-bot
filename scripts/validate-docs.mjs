import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const requiredFiles = [
  'README.md',
  'AGENTS.md',
  'docs/INDEX.md',
  'docs/HARNESS.md',
  'docs/product-specs/PRD.md',
  'docs/project/PROJECT.md',
  'docs/project/PROGRESS.md',
  'docs/exec-plans/active/mvp-core-music-bot.md',
];

const contentChecks = [
  {
    path: 'README.md',
    patterns: [
      'docs/INDEX.md',
      'docs/product-specs/PRD.md',
      'docs/project/PROGRESS.md',
      'docs/HARNESS.md',
    ],
  },
  {
    path: 'AGENTS.md',
    patterns: [
      'docs/INDEX.md',
      'docs/project/PROGRESS.md',
      'docs/exec-plans/active/mvp-core-music-bot.md',
    ],
  },
  {
    path: 'docs/project/PROGRESS.md',
    patterns: [
      'Last updated:',
      '## Current Snapshot',
      '## Completed',
      '## In Progress',
      '## Next Up',
      '## Risks / Blockers',
    ],
  },
  {
    path: 'docs/HARNESS.md',
    patterns: [
      '## Mechanical Checks',
      'npm run docs:check',
      'Repository is the system of record',
    ],
  },
  {
    path: 'docs/exec-plans/active/mvp-core-music-bot.md',
    patterns: [
      'Status: active',
      'Last updated:',
      '../../product-specs/PRD.md',
      '../../project/PROJECT.md',
    ],
  },
];

const errors = [];

for (const relativePath of requiredFiles) {
  const fullPath = join(rootDir, relativePath);
  if (!existsSync(fullPath)) {
    errors.push(`Missing required documentation file: ${relativePath}`);
  }
}

for (const check of contentChecks) {
  const fullPath = join(rootDir, check.path);
  if (!existsSync(fullPath)) {
    continue;
  }

  const content = readFileSync(fullPath, 'utf8');
  for (const pattern of check.patterns) {
    if (!content.includes(pattern)) {
      errors.push(`Missing pattern "${pattern}" in ${check.path}`);
    }
  }
}

if (errors.length > 0) {
  console.error('Documentation harness failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Documentation harness passed. Validated ${requiredFiles.length} required files.`);
