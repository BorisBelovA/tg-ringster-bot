import { Scenes, session, Telegraf } from 'telegraf';
import { BOT_TOKEN } from '@config/env';
import { setupActions } from '@actions/index';
import { singleReminderScene } from '@scenes/single-reminder';
import { MyContext } from 'utils';

export function startBot() {
  const bot = new Telegraf<MyContext>(BOT_TOKEN);

  const stage = new Scenes.Stage<MyContext>([singleReminderScene]);
  bot.use(session());
  bot.use(stage.middleware());

  setupActions(bot);

  bot.launch().then(() => {
    console.log('🚀 Bot started');
  });

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}
