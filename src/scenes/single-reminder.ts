import { MyContext, MyWizardSession, ReminderType, scenes } from "utils";
import { Markup, Scenes } from "telegraf";
import { callbackQuery } from 'telegraf/filters';
import { Message } from "telegraf/typings/core/types/typegram";
import { handleCustomTime, handleMinutes } from "@handlers/time-handlers";

export const singleReminderScene = new Scenes.WizardScene<MyContext>(
    scenes.SINGLE_REMINDER,
    async (ctx) => {
        await ctx.reply('О чем вам напомнить?', Markup.removeKeyboard());
        return ctx.wizard.next();
    },
    async (ctx) => {
        (ctx.session as MyWizardSession).userText = (ctx.message as Message.TextMessage).text;

        await ctx.reply('Когда мне напомнить о событии?',
        Markup.inlineKeyboard([
            [Markup.button.callback('Через 10 минут', 'remind_min_10')],
            [Markup.button.callback('Через 30 минут', 'remind_min_30')],
            [Markup.button.callback('Через 1 час', 'remind_min_60')],
            [Markup.button.callback('Через 3 часа', 'remind_min_180')],
            [Markup.button.callback('Указать свое время', 'remind_custom_time')],
            [Markup.button.callback('Установить дату и время', 'remind_custom_data_time')],
        ]));
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (!ctx.has(callbackQuery('data'))) {
            ctx.scene.leave();
            return;
        }
        const reminderType: ReminderType = ctx.callbackQuery.data.split('remind_')[1] as ReminderType;
        (ctx.session as MyWizardSession).reminderType = reminderType
        if (reminderType.startsWith('min')) {
            handleMinutes(ctx);
        } else if(reminderType === 'custom_time') {
            await ctx.reply('Пожалуйста, введите время в формате HH:MM (например, 09:30)');
            return ctx.wizard.next();
        } else {
            return ctx.wizard.next();
        }
    },
    async (ctx) => {
        const reminderType: Omit<ReminderType, 'min'> = (ctx.session as MyWizardSession).reminderType;
        if (reminderType === 'custom_time') {
            handleCustomTime(ctx);
        } else {

        }
        return;
    }
);
