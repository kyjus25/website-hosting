import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptDir = resolve(fileURLToPath(new URL('.', import.meta.url)));
const rootDir = resolve(scriptDir, '..');
const applicationsDir = resolve(rootDir, 'applications');
const astroBin = resolve(
  rootDir,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'astro.cmd' : 'astro'
);
const validCommands = new Set(['dev', 'build']);
const availableApps = readdirSync(applicationsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const [, , command, appName, ...rawArgs] = process.argv;
const forwardedArgs = rawArgs.filter((arg) => arg !== '--');

const usage = () => {
  console.error(`Usage: bun ${command ?? 'dev'} <app> [astro args]`);
  console.error(`Apps: ${availableApps.join(', ')}`);
};

if (!validCommands.has(command)) {
  usage();
  process.exit(1);
}

if (!appName || !availableApps.includes(appName)) {
  usage();
  process.exit(1);
}

const child = spawn(astroBin, [command, ...forwardedArgs], {
  cwd: resolve(applicationsDir, appName),
  stdio: 'inherit'
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});

child.on('error', (error) => {
  console.error(`Failed to start Astro for "${appName}":`, error.message);
  process.exit(1);
});
