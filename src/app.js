const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
// const router = require('koa-router');
// const websockify = require('koa-websocket');
const DB = require('./db.postgres');
const routes = require('./routes');
const middleware = require('./middleware');

const db = new DB();
// const api = router();
const app = new Koa();
// const socket = websockify(app);

app
  .use(bodyParser())
  .use(cors({
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
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
app.listen(port, () => console.warn(`server started http://localhost:${port} ${process.pid} pid`));

module.exports = app;
