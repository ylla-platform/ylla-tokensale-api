const Controller = require('./controller');

class Subscribers extends Controller {
  constructor() {
    super();
    this.table = 'subscribers';
  }

  /**
   * @api {post} /subscribers Add an email subscriber
   * @apiGroup Subscribers
   * @apiDescription Add an email to the email newsletter subscriber database.
   * @apiPermission public
   * @apiParam (Request body) {String} email email of subscriber
   * @apiSampleRequest /subscribers
   * @apiExample {js} javascript
   *     const data = {
   *         email: 'asdf@example.com'
   *     };
   *
   *     http.post('https://tokensale.yl.la/api/1/subscribers', data)
   *      .then(res => {
   *         const { created_at, updated_at, email } = res.data;
   *      });
   * @apiExample {curl} curl
   *     curl -X POST https://tokensale.yl.la/api/1/subscribers -d "{email: 'asdf@example.com'}"
   */
  async post(ctx) {
    const data = ctx.request.body;

    data.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    data.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

    try {
      await ctx.db.query(
        'INSERT INTO subscribers(email, subscribed, updated_at) values($1, $2, $3)',
        [
          data.email,
          true,
          data.updated_at,
        ]
      );
    } catch (err) {
      ctx.status = 500;
      const { constraint, detail } = err;
      ctx.body = { constraint, detail };
      console.error(err);
      ctx.db.end();
      return;
    }

    try {
      const res = await ctx.db.query(
        'SELECT * FROM subscribers WHERE email = $1',
        [data.email],
      )
      ctx.body = res.rows[0];
    } catch(err) {
      ctx.status = 500;
      const { constraint, detail } = err;
      ctx.body = { constraint, detail };
      console.error(err);
    }

    ctx.db.end();
  }
}

module.exports = Subscribers;
