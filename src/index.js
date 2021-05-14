import koa from 'koa';
import swagger2Koa from 'swagger2-koa';
import * as swagger from 'swagger2';
import Router from '@koa/router';
import { routes as registerRoute } from './routes/register.js';
import { routes as loginRoute } from './routes/login.js';

const { ui, validate } = swagger2Koa;

// yaml load to json
const spec = swagger.loadDocumentSync('./src/swagger.yaml');

if (!swagger.validateDocument(spec)) {
  throw Error('Invalid swagger file');
}

const port = process.env.PORT || 3000;

const app = new koa();

const router = Router();

for (const routes of [registerRoute, loginRoute]) {
  routes(router);
}

app.use(router.routes());
app.use(router.allowedMethods());

app.use(ui(spec, '/docs'));
app.use(validate(spec));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
