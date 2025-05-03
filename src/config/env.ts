import dotenv from 'dotenv';

export const BOT_TOKEN = (() => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Running in non-prod');
    dotenv.config();
  }
  console.log('BOT_TOKEN in env:', process.env.BOT_TOKEN);
  const token = process.env.BOT_TOKEN;
  if (!token) {
    throw new Error('BOT_TOKEN is not set in .env file');
  }
  return token;
})();
