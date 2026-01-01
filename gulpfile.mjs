import { src, dest, series, parallel, watch as gulpWatch } from 'gulp';
import ts from 'gulp-typescript';
import del from 'del';
import merge from 'merge-stream';

// TypeScript project respects tsconfig.json (module: nodenext, outDir: out, etc.)
const tsProject = ts.createProject('tsconfig.json');

const paths = {
  ts: 'src/**/*.ts',
  static: 'src/static/**/*',
  outDir: 'out'
};

export function clean() {
  return del([`${paths.outDir}/**`, `!${paths.outDir}`]);
}

export function buildTs() {
  const tsResult = tsProject.src().pipe(tsProject());
  const dts = tsResult.dts.pipe(dest(paths.outDir));
  const js = tsResult.js.pipe(dest(paths.outDir));
  return merge(dts, js);
}

export function copyStatic() {
  // Copies everything under src/static to out/, preserving folder structure
  return src(paths.static, { allowEmpty: true }).pipe(dest(paths.outDir));
}

export const build = series(clean, parallel(buildTs, copyStatic));

export function watch() {
  gulpWatch(paths.ts, buildTs);
  gulpWatch(paths.static, copyStatic);
}

export const dev = series(build, watch);
export default build;
