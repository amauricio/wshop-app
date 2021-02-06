require('dotenv').config();

const { PG_USER, PG_PW, PG_DB, PG_HOST, SEQUELIZE_DB_DIALECT, NODE_ENV, PG_SOCKET } = process.env;

module.exports = {
  development: {
    username: PG_USER,
    password: PG_PW,
    database: `${PG_DB}-testing`,
    host: PG_HOST,
    dialect: SEQUELIZE_DB_DIALECT,
    logging: false,
    schema: 'public',
    socket: PG_SOCKET,
  },
  test: {
    username: PG_USER,
    password: PG_PW,
    database: `${PG_DB}-testing`,
    host: PG_HOST,
    logging: false,
    schema: 'public',
    dialect: SEQUELIZE_DB_DIALECT,
    socket: PG_SOCKET,
  },
  staging: {
    username: PG_USER,
    password: PG_PW,
    database: `${PG_DB}-staging`,
    host: PG_HOST,
    dialect: SEQUELIZE_DB_DIALECT,
    logging: true,
    schema: 'public',
    socket: PG_SOCKET,
  },
  production: {
    username: PG_USER,
    password: PG_PW,
    database: `${PG_DB}-production`,
    host: PG_HOST,
    dialect: SEQUELIZE_DB_DIALECT,
    logging: true,
    schema: 'public',
    socket: PG_SOCKET,
  },
};
