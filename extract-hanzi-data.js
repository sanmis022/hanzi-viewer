#!/usr/bin/env node
// Unzip the stroke data archive and rename files using hex code points

const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const repoRoot = __dirname;
const zipPath = path.join(repoRoot, 'hanzi-data', 'hanzi-data.zip');
const extractDir = path.join(repoRoot, 'hanzi-data', '_extract');

fs.mkdirSync(extractDir, {recursive: true});
// extract all json files without directory structure
execSync(`unzip -o -j "${zipPath}" '*.json' -d "${extractDir}"`, {stdio: 'inherit'});

for (const file of fs.readdirSync(extractDir)) {
  if (!file.endsWith('.json')) continue;
  const char = path.parse(file).name;
  if (char === '.gitkeep') continue;
  const code = char.codePointAt(0).toString(16);
  const destPath = path.join(repoRoot, 'hanzi-data', `${code}.json`);
  fs.renameSync(path.join(extractDir, file), destPath);
}
fs.rmSync(extractDir, {recursive: true, force: true});
console.log('Extraction complete.');
