const Koa = require('koa');
const DB = require('./db.postgres');
const bodyParser = require('koa-bodyparser');
const routes = require('./routes');
// const router = require('koa-router');
// const websockify = require('koa-websocket');
const middleware = require('./middleware');

const db = new DB();
// const api = router();
const app = new Koa();
const cors = require('kcors');
// const socket = websockify(app);

app
  .use(bodyParser())
  .use(cors({
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE']
  }))
  .use(db.connect);

middleware(app);
routes(app);

// api.get('/test', async (ctx, next) => {
//   ctx.websocket.send('Hello World');
//   ctx.websocket.on('message', function(message) {
//     console.log(message);
//   });
// });
//
// app.ws.use(api.routes()).use(api.allowedMethods());

// // response
// app.use(async (ctx) => {
//   ctx.body = 'Hello World'
// });

const port = process.env.YLLA_PORT;
console.log('PORT', port);
app.listen(port, () => console.warn(`server started http://localhost:${port} ${process.pid} pid`));

module.exports = app;

