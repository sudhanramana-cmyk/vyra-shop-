import type { Plugin } from 'vite';
import express from 'express';
import { apiRouter } from './api';

export function vitePluginApi(): Plugin {
  return {
    name: 'vite-plugin-vyra-api',
    configureServer(server) {
      const app = express();
      app.use(express.json());
      app.use('/api', apiRouter);
      server.middlewares.use((req, res, next) => {
        app(req as any, res as any, next);
      });
    }
  };
}
