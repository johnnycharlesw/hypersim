#!/usr/bin/env node
// Simple build script for hypersim
// - Compiles TypeScript according to tsconfig.json
// - Copies static assets from src/static to out
// - Optional flags:
//   --clean  : remove the out directory before building
//   --watch  : run tsc in watch mode and watch/copy static assets on changes

import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const projectRoot = __dirname;
const outDir = path.join(projectRoot, 'out');
const staticDir = path.join(projectRoot, 'src', 'static');

const args = process.argv.slice(2);
const isWatch = args.includes('--watch');
const isClean = args.includes('--clean');

function log(msg) {
  console.log(`[build] ${msg}`);
}

function warn(msg) {
  console.warn(`[build] WARN: ${msg}`);
}

function clean() {
  log(`clean ${outDir}`);
  fs.rmSync(outDir, { recursive: true, force: true });
}

function copyStatic() {
  if (!fs.existsSync(staticDir)) return;
  fs.mkdirSync(outDir, { recursive: true });
  log(`copy static ${path.relative(projectRoot, staticDir)} -> ${path.relative(projectRoot, outDir)}`);
  // Skip copying SCSS sources; they are compiled into CSS
  fs.cpSync(staticDir, outDir, {
    recursive: true,
    force: true,
    filter: (src) => path.extname(src).toLowerCase() !== '.scss'
  });
}

function resolveLocalTsc() {
  const isWin = process.platform === 'win32';
  const bin = isWin ? 'tsc.cmd' : 'tsc';
  const binPath = path.join(projectRoot, 'node_modules', '.bin', bin);
  if (fs.existsSync(binPath)) return binPath;
  return null;
}

function resolveTsNodeScript() {
  const scriptPath = path.join(projectRoot, 'node_modules', 'typescript', 'bin', 'tsc');
  if (fs.existsSync(scriptPath)) return scriptPath;
  return null;
}

function npxCommand() {
  const isWin = process.platform === 'win32';
  return isWin ? 'npx.cmd' : 'npx';
}

function runTscOnce(tscArgs) {
  const localTsc = resolveLocalTsc();
  const tsNodeScript = resolveTsNodeScript();

  let res;
  if (localTsc) {
    log(`running: ${localTsc} ${tscArgs.join(' ')}`);
    res = spawnSync(localTsc, tscArgs, { stdio: 'inherit', cwd: projectRoot, shell: false });
    if (res.status === 0) return res;
    warn(`local tsc exited with code ${res.status}`);
  }

  log(`running: ${npxCommand()} tsc ${tscArgs.join(' ')}`);
  res = spawnSync(npxCommand(), ['tsc', ...tscArgs], { stdio: 'inherit', cwd: projectRoot, shell: false });
  if (res.status === 0) return res;
  warn(`npx tsc exited with code ${res.status}`);

  if (tsNodeScript) {
    log(`running: node ${tsNodeScript} ${tscArgs.join(' ')}`);
    res = spawnSync(process.execPath, [tsNodeScript, ...tscArgs], { stdio: 'inherit', cwd: projectRoot, shell: false });
    return res;
  }

  warn('TypeScript not found locally. Install it with: npm i -D typescript');
  return { status: 1 };
}

function spawnTscWatch(tscArgs) {
  const localTsc = resolveLocalTsc();
  const tsNodeScript = resolveTsNodeScript();
  const isWin = process.platform === 'win32';

  if (isWin) {
    // Use shell on Windows to launch .cmd reliably
    if (localTsc) {
      const cmdStr = `"${localTsc}" ${tscArgs.join(' ')}`;
      log(`watch: ${cmdStr}`);
      return spawn(cmdStr, { stdio: 'inherit', cwd: projectRoot, shell: true });
    }

    const npxStr = `${npxCommand()} tsc ${tscArgs.join(' ')}`;
    log(`watch: ${npxStr}`);
    const child = spawn(npxStr, { stdio: 'inherit', cwd: projectRoot, shell: true });
    child.once('error', (err) => warn(`npx tsc error: ${err && err.message}`));
    if (child.pid) return child;

    if (tsNodeScript) {
      const nodeStr = `"${process.execPath}" "${tsNodeScript}" ${tscArgs.join(' ')}`;
      log(`watch: ${nodeStr}`);
      return spawn(nodeStr, { stdio: 'inherit', cwd: projectRoot, shell: true });
    }

    throw new Error('TypeScript not found. Install with: npm i -D typescript');
  }

  // Non-Windows: spawn directly without shell
  if (localTsc) {
    log(`watch: ${localTsc} ${tscArgs.join(' ')}`);
    return spawn(localTsc, tscArgs, { stdio: 'inherit', cwd: projectRoot, shell: false });
  }

  log(`watch: ${npxCommand()} tsc ${tscArgs.join(' ')}`);
  const npxChild = spawn(npxCommand(), ['tsc', ...tscArgs], { stdio: 'inherit', cwd: projectRoot, shell: false });
  npxChild.once('error', (err) => warn(`npx tsc error: ${err && err.message}`));
  if (npxChild.pid) return npxChild;

  if (tsNodeScript) {
    log(`watch: node ${tsNodeScript} ${tscArgs.join(' ')}`);
    return spawn(process.execPath, [tsNodeScript, ...tscArgs], { stdio: 'inherit', cwd: projectRoot, shell: false });
  }

  throw new Error('TypeScript not found. Install with: npm i -D typescript');
}

// SCSS compilation support
let _sass = null;
async function ensureSass() {
  if (_sass) return _sass;
  try {
    const mod = await import('sass');
    _sass = mod.default || mod;
  } catch (err) {
    warn('sass module not found. Install with: npm i -D sass');
    _sass = null;
  }
  return _sass;
}

function* walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkDir(fullPath);
    } else {
      yield fullPath;
    }
  }
}

async function compileScssAll() {
  const sass = await ensureSass();
  if (!sass) return;
  if (!fs.existsSync(staticDir)) return;

  const scssFiles = [];
  for (const file of walkDir(staticDir)) {
    if (path.extname(file).toLowerCase() === '.scss') scssFiles.push(file);
  }
  if (scssFiles.length === 0) return;

  for (const file of scssFiles) {
    const rel = path.relative(staticDir, file);
    const outCssRel = rel.replace(/\.scss$/i, '.css');
    const outCssPath = path.join(outDir, outCssRel);
    fs.mkdirSync(path.dirname(outCssPath), { recursive: true });
    try {
      const result = sass.compile(file, { style: 'expanded', sourceMap: true });
      fs.writeFileSync(outCssPath, result.css, 'utf8');
      log(`scss: ${path.relative(projectRoot, file)} -> ${path.relative(projectRoot, outCssPath)}`);
    } catch (err) {
      warn(`scss compile failed for ${file}: ${err && err.message}`);
    }
  }
}

async function buildOnce() {
  log('tsc build start');
  const res = runTscOnce(['-p', '.']);
  if (res.status !== 0) {
    log('tsc build failed');
    process.exit(res.status || 1);
  }
  log('tsc build done');
  copyStatic();
  await compileScssAll();
}

async function buildWatch() {
  log('tsc watch start');
  copyStatic();
  await compileScssAll();

  if (fs.existsSync(staticDir)) {
    try {
      // Watch static dir for changes (Windows supports recursive)
      fs.watch(staticDir, { recursive: true }, async (eventType, filename) => {
        if (!filename) return;
        const changed = path.join(staticDir, filename);
        if (path.extname(changed).toLowerCase() === '.scss') {
          log(`scss change detected: ${eventType} ${filename}`);
          await compileScssAll();
        } else {
          log(`static change detected: ${eventType} ${filename}`);
          copyStatic();
        }
      });
      log('watching static assets');
    } catch (err) {
      // If recursive not supported, fall back to periodic copy (basic)
      log(`static watch not supported (${err && err.message}); falling back to periodic copy every 2s`);
      setInterval(async () => {
        copyStatic();
        await compileScssAll();
      }, 2000);
    }
  }

  const child = spawnTscWatch(['-p', '.', '--watch', '--preserveWatchOutput']);

  child.on('close', (code) => {
    log(`tsc watch exited with code ${code}`);
    process.exit(code ?? 0);
  });
}

(async function main() {
  if (isClean) clean();
  if (isWatch) await buildWatch();
  else await buildOnce();
})();
