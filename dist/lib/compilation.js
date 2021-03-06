"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.format = format;exports.createCompilationPromise = createCompilationPromise;

function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}


function createCompilationPromise(name, compiler, config) {
  return new Promise((resolve, reject) => {
    let timeStart = new Date();
    compiler.hooks.compile.tap(name, () => {
      timeStart = new Date();
      console.info(`[${format(timeStart)}] Compiling '${name}'...`);
    });

    compiler.hooks.done.tap(name, stats => {
      console.info(stats.toString(config.stats));
      const timeEnd = new Date();
      const time = timeEnd.getTime() - timeStart.getTime();
      if (stats.hasErrors()) {
        console.info(
        `[${format(timeEnd)}] Failed to compile '${name}' after ${time} ms`);

        reject(new Error('Compilation failed!'));
      } else {
        console.info(
        `[${format(
        timeEnd)
        }] Finished '${name}' compilation after ${time} ms`);

        resolve(stats);
      }
    });
  });
}