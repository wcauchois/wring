#!/usr/bin/env node

const child_process = require('child_process');
const open = require('open');

const binDir = child_process.execSync("npm bin").toString().trim();

const proc = child_process.exec(`${binDir}/wring-manage-backend`, {
  stdio: 'pipe',
  shell: true
});

proc.on('error', err => {
  console.error(`Failed to start subprocess`, err);
});

proc.on('exit', code => {
  console.log(`Process exited with code:`, code);
  process.exit(code)
});

open('http://localhost:4667');

