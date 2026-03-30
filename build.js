#!/usr/bin/env node
// Simple build script for hypersim
// - Compiles main/ipc/common TypeScript (tsconfig.json)
// - Bundles renderer entries with webpack (webpack.renderer.config.mjs)
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

  // After copying, update importmap in out so browser resolves modules correctly
  try {
    updateImportMap();
  } catch (err) {
    warn(`updateImportMap failed: ${err && err.message}`);
  }
}

function updateImportMap() {
  const srcImportMap = path.join(staticDir, 'browser', 'importmap.json');
  const outImportMap = path.join(outDir, 'browser', 'importmap.json');
  if (!fs.existsSync(srcImportMap)) return;
  try {
    const raw = fs.readFileSync(srcImportMap, 'utf8');
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object' || !data.imports) return;
    let changed = false;
    for (const key of Object.keys(data.imports)) {
      const val = data.imports[key];
      if (typeof val !== 'string') continue;
      // Replace ../../node_modules/... (from src/static/browser) with ../node_modules/... (from out/browser)
      const newVal = val.replace(/\.\.\/\.\.\/node_modules\//g, '../node_modules/');
      if (newVal !== val) {
        data.imports[key] = newVal;
        changed = true;
        log(`importmap: ${key}: ${val} -> ${newVal}`);
      }
    }
    fs.mkdirSync(path.dirname(outImportMap), { recursive: true });
    fs.writeFileSync(outImportMap, JSON.stringify(data, null, 2), 'utf8');
    if (changed) log(`updated importmap ${path.relative(projectRoot, outImportMap)}`);
    else log(`copied importmap to ${path.relative(projectRoot, outImportMap)}`);
  } catch (err) {
    warn(`failed to update importmap: ${err && err.message}`);
  }
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

function resolveLocalWebpack() {
  const isWin = process.platform === 'win32';
  const bin = isWin ? 'webpack.cmd' : 'webpack';
  const binPath = path.join(projectRoot, 'node_modules', '.bin', bin);
  if (fs.existsSync(binPath)) return binPath;
  return null;
}

function runWebpackOnce() {
  const configRel = 'webpack.renderer.config.mjs';
  const args = ['--config', configRel];
  const localWebpack = resolveLocalWebpack();
  const isWin = process.platform === 'win32';
  let res;
  if (localWebpack) {
    if (isWin) {
      const cmdStr = `"${localWebpack}" ${args.join(' ')}`;
      log(`running: ${cmdStr}`);
      res = spawnSync(cmdStr, { stdio: 'inherit', cwd: projectRoot, shell: true });
    } else {
      log(`running: ${localWebpack} ${args.join(' ')}`);
      res = spawnSync(localWebpack, args, { stdio: 'inherit', cwd: projectRoot, shell: false });
    }
    if (res.status === 0) return res;
    warn(`local webpack exited with code ${res.status}`);
  }

  log(`running: ${npxCommand()} webpack ${args.join(' ')}`);
  res = spawnSync(
    npxCommand(),
    ['webpack', ...args],
    { stdio: 'inherit', cwd: projectRoot, shell: isWin }
  );
  return res;
}

function spawnWebpackWatch() {
  const configRel = 'webpack.renderer.config.mjs';
  const args = ['--config', configRel, '--watch'];
  const localWebpack = resolveLocalWebpack();
  const isWin = process.platform === 'win32';

  if (isWin) {
    if (localWebpack) {
      const cmdStr = `"${localWebpack}" ${args.join(' ')}`;
      log(`watch: ${cmdStr}`);
      return spawn(cmdStr, { stdio: 'inherit', cwd: projectRoot, shell: true });
    }
    const npxStr = `${npxCommand()} webpack ${args.join(' ')}`;
    log(`watch: ${npxStr}`);
    const child = spawn(npxStr, { stdio: 'inherit', cwd: projectRoot, shell: true });
    child.once('error', (err) => warn(`npx webpack error: ${err && err.message}`));
    return child;
  }

  if (localWebpack) {
    log(`watch: ${localWebpack} ${args.join(' ')}`);
    return spawn(localWebpack, args, { stdio: 'inherit', cwd: projectRoot, shell: false });
  }

  log(`watch: ${npxCommand()} webpack ${args.join(' ')}`);
  return spawn(npxCommand(), ['webpack', ...args], { stdio: 'inherit', cwd: projectRoot, shell: false });
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
  log('webpack renderer start');
  const wres = runWebpackOnce();
  if (wres.status !== 0) {
    log('webpack renderer failed');
    process.exit(wres.status || 1);
  }
  log('webpack renderer done');
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

  const wpChild = spawnWebpackWatch();
  wpChild.on('error', (err) => warn(`webpack watch error: ${err && err.message}`));
  wpChild.on('close', (code) => {
    log(`webpack watch exited with code ${code}`);
    process.exit(code ?? 0);
  });

  child.on('close', (code) => {
    log(`tsc watch exited with code ${code}`);
    try {
      wpChild.kill('SIGTERM');
    } catch (_) {
      /* ignore */
    }
    process.exit(code ?? 0);
  });
}

(async function main() {
  if (isClean) clean();
  if (isWatch) await buildWatch();
  else await buildOnce();
})();
