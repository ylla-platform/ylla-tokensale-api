const Controller = require('./controller');

class Subscribers extends Controller {
  constructor() {
    super();
    this.collection = 'subscribers';
  }

  async post(ctx) {
    const data = ctx.request.body;

    data.updatedAt = new Date().toISOString();
    data.createdAt = new Date().toISOString();

    try {
      await ctx.db.query(
        'INSERT INTO subscribers(email, subscribed) values($1, $2)',
        [
          data.email,
          true
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
