import dotenv from 'dotenv';

dotenv.config();

const {
  DB_DEV_NAME,
  DB_USER_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_TEST_NAME,
  DB_TEST_USER_NAME,
  DB_TEST_PASSWORD,
  DB_TEST_HOST,
  DB_TEST_PORT,
  PRODUCTION_USERNAME,
  PRODUCTION_PASSWORD,
  PRODUCTION_HOST,
  PRODUCTION_DATABASE,
  PRODUCTION_PORT,
} = process.env;
const dialect = 'postgres';

module.exports = {
  development: {
    username: DB_USER_NAME,
    password: DB_PASSWORD,
    database: DB_DEV_NAME,
    host: '127.0.0.1',
    port: DB_PORT,
    dialect,
  },
  test: {
    username: DB_TEST_USER_NAME,
    password: DB_TEST_PASSWORD,
    database: DB_TEST_NAME,
    host: DB_TEST_HOST,
    port: DB_TEST_PORT,
    logging: false,
    dialect,
  },
  production: {
    username: PRODUCTION_USERNAME,
    password: PRODUCTION_PASSWORD,
    database: PRODUCTION_DATABASE,
    host: PRODUCTION_HOST,
    port: PRODUCTION_PORT,
    logging: false,
    dialect,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
