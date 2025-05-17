import dotenv from 'dotenv';

export const BOT_TOKEN = (() => {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
  }
  const token = process.env.BOT_TOKEN;
  if (!token) {
    throw new Error('BOT_TOKEN is not set in .env file');
  }
  return token;
})();

export const PORT = (() => {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
  }
  const port = process.env.PORT;
  if (!port) {
    throw new Error('PORT is not set in .env file');
  }
  return port;
})();

export const IS_PROD = (() => {
  return process.env.NODE_ENV === 'production'
})();

export const DOMAIN = (() => {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
  }
  const domain = process.env.DOMAIN;
  if (!domain) {
    throw new Error('DOMAIN is not set in .env file');
  }
  return domain;
})();