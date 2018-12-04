const config = {
  development: {
    dialect: 'sqlite',
    storage: 'data/dev-db.sqlite3',
  },

  test: {
    adapter: 'sqlite3',
    database: ':memory:',
    timeout: 500,
    dialect: 'sqlite',
    storage: 'data/test-db.sqlite3',
  },

  'test:ci': {
    adapter: 'sqlite3',
    database: ':memory:',
    timeout: 500,
    dialect: 'sqlite',
    storage: 'data/test-db.sqlite3',
  },

  production: {
    adapter: process.env.ADAPTER,
    dialect: process.env.DIALECT,
    storage: process.env.STORAGE,
  },
};

module.exports = config;
