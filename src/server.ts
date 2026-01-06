import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import chalk from 'chalk';

import authRouter from '../api/auth';
import adminRouter from '../api/admin';
import chatServer from '../api/chat-server';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Connect mongoose
 */

const db = "mongodb://localhost:27017/mvp";
mongoose.connect(db).then(() => {
  console.log(chalk.green("MongoDB is connected..."))
}).catch((err) => console.log(err));

/**
 * Start socket.io chat server
 */
const { __httpServer } = chatServer;
if (__httpServer && !__httpServer.listening) {
  __httpServer.listen(3000, () => {
    console.log(chalk.yellow("Socket.IO is running at 3000"));
  });
}


/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
