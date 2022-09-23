import Koa from 'koa';
import Router from 'koa-router';
import staticFiles from 'koa-static';
import { nodeResolve } from 'koa-node-resolve';
import { Readable } from 'stream';

import { renderIndex } from './templates/index.js';

const app = new Koa();
const router = new Router();

// http://localhost:3000/?name=foo
router.get('/', (ctx) => {
  const name = ctx.query.name ?? 'SSR Explorer';
  ctx.type = 'text/html';
  ctx.body = Readable.from(renderIndex({ name }));
});

app.use(router.routes());
app.use(nodeResolve());
app.use(staticFiles('.'));
app.listen(3000, () => console.log('server started: http://localhost:3000'));
