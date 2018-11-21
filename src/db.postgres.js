const http = require('http');
const { Pool } = require('pg')
const conf = require('./conf');

class Postgres {
  constructor(opts) {
    this.opts = opts;
    this.connect = this.connect.bind(this);
    this.close = this.close.bind(this);
  }

  async connect(ctx, next) {
    try {
      const pool = new Pool({
        user: conf.env.postgres.user,
        password: conf.env.postgres.password,
        host: conf.env.postgres.host,
        port: conf.env.postgres.port,
        database: conf.env.postgres.database,
        ssl: conf.env.postgres.ssl,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      });

      ctx.db = await pool.connect();
    } catch (err) {
      console.error(err);
      console.warn('unable to connect: ', `postgres://${conf.env.postgres.host}:${conf.env.postgres.port}/${conf.env.postgres.database}`);
      ctx.status = 500;
      ctx.body = err.message || http.STATUS_CODES[ctx.status];
    }

    await next();
  }

  async close(ctx, next) {
    await ctx.db.release();
    await next();
  }
}

module.exports = Postgres;
