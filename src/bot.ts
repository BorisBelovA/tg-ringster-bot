import { Scenes, session, Telegraf } from 'telegraf';
import { BOT_TOKEN, DOMAIN, IS_PROD, PORT } from './config/env';
import { setupActions } from '@actions/index';
import { singleReminderScene } from '@scenes/single-reminder';
import { MyContext } from 'utils';
import express from 'express';

const app = express();

export async function startBot() {
  const bot = new Telegraf<MyContext>(BOT_TOKEN);

  const stage = new Scenes.Stage<MyContext>([singleReminderScene]);
  bot.use(session());
  bot.use(stage.middleware());

  setupActions(bot);
  startListening(bot);

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

const startListening = async (bot: Telegraf<MyContext>) => {
  if (IS_PROD) {
    if (!DOMAIN) {
      throw new Error('DOMAIN environment variable is required in production');
    }
    if (!PORT) {
      throw new Error('PORT environment variable is required in production');
    }
    app.use(express.json()); // важно: телеграм шлёт JSON
    
    app.post('/telegram', (req, res, next) => {
      console.log('✅ Telegram webhook hit');
      next();
    });

    app.use(bot.webhookCallback('/telegram'));

    await bot.telegram.setWebhook(`https://${DOMAIN}/telegram`);
    console.log(`✅ Webhook set to https://${DOMAIN}/telegram`);

    app.get('/', (req, res) => {
      res.send('🤖 Bot is running via webhook')
    });

    app.get('/test', (req, res) => {
      res.send('✅ Bot server is live');
    });
    
    app.listen(PORT, () => {
      console.log(`🚀 Express server listening on port ${PORT}`);
    });
  } else {
    bot.launch().then(() => {
      console.log('🚀 Bot started locally');
    });
  }
}
