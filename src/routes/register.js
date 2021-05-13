export const routes = (router) => {
  router.post('/register', async (ctx) => {
    ctx.body = 'User is Registered';
  });
};
