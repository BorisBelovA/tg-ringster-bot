import { ACTION_LABELS, ACTIONS } from "@utils/index";
import { Context, Markup } from "telegraf";

export const startAction = (ctx: Context) => {
    ctx.reply('Привет! Я ваш бот - напоминалка.')
    return ctx.reply('Выбери команду:', Markup.keyboard([
        [Markup.button.callback(ACTION_LABELS.CREATE_REMINDER, ACTIONS.CREATE_REMINDER)],
        [Markup.button.callback(ACTION_LABELS.LIST_REMINDERS, ACTIONS.LIST_REMINDERS)],
        [Markup.button.callback(ACTION_LABELS.HELP, ACTIONS.HELP)]
      ]).resize() // ✅ здесь это уместно
    );
}