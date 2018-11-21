module.exports = {
  production: {
    postgres: {
      host: process.env.YLLA_TOKENSALE_PRODUCTION_PG_HOST,
      database: process.env.YLLA_TOKENSALE_PRODUCTION_PG_DB,
      port: 5432,
      user: process.env.YLLA_TOKENSALE_PRODUCTION_PG_USER,
      password: process.env.YLLA_TOKENSALE_PRODUCTION_PG_PASS,
      ssl: true
    }
  },

  development: {
    mongodb: {
      url: process.env.FULLSTACK_MONGODB_URL
    },
    rethinkdb: {
      host: process.env.FULLSTACK_RETHINKDB_HOST,
      port: process.env.FULLSTACK_RETHINKDB_PORT,
      url: process.env.FULLSTACK_RETHINKDB_DB
    },
    redis: {
      url: process.env.FULLSTACK_REDIS_URL
    },
    postgres: {
      host: process.env.YLLA_TOKENSALE_DEVELOPMENT_PG_HOST,
      database: process.env.YLLA_TOKENSALE_DEVELOPMENT_PG_DB,
      port: 5432,
      user: process.env.YLLA_TOKENSALE_DEVELOPMENT_PG_USER,
      password: process.env.YLLA_TOKENSALE_DEVELOPMENT_PG_PASS,
      ssl: true
    }
  },

  test: {
    mongodb: {
      url: process.env.FULLSTACK_TEST_MONGODB_URL
    }
  }
};

