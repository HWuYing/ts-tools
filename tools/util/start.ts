import express from 'express';
import browserSync from 'browser-sync';
import { existenceClient } from '../config';
import cleanDir from './clean';
import serverHotDev from '../lib/dev.server';
import clientHotDev from '../lib/dev.client';
import serverEntryHotDev from '../lib/dev.server.entry';
import dllDev from '../lib/dev.dll';

const app = express();

export default async (): Promise<any> => {
  await cleanDir();
  await dllDev();
  await clientHotDev(app);
  await serverEntryHotDev();
  const host = await serverHotDev(app);
  return new Promise((resolve, reject) => {
    existenceClient ? browserSync.create().init({
      ui: false,
      proxy: {
        target: host,
        middleware: app,
      },
    }, (error, bs) => error ? reject(error) : resolve(bs)) : Promise.resolve();
  });
}
