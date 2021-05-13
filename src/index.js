import koa from 'koa';
import { koaSwagger } from 'koa2-swagger-ui';
import yamljs from 'yamljs';
import Router from '@koa/router';
import { routes as registerRoute } from './routes/register.js';
import { routes as loginRoute } from './routes/login.js';

// yaml load to json
const spec = yamljs.load('./src/swagger.yaml');

const port = process.env.PORT || 3000;

const app = new koa();

const router = Router();

for (const routes of [registerRoute, loginRoute]) {
  routes(router);
}

app.use(
  koaSwagger({
    routePrefix: '/docs', // host at /swagger instead of default /docs
    swaggerOptions: {
      spec
    }
  })
);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
