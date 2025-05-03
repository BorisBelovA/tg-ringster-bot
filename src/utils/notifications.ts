import { Context } from "telegraf";

export const createMinutesNotification = (
    text: string,
    minutes: number
) => `⏰ Напомнить через ${minutes} минут о "${text}"`

export const createCustomTimeTodayNotification = (
    text: string,
    inputtedTime: string
) => `⏰ Напомнить о "${text}" сегодня в ${inputtedTime}`;

export function executeInNMinutes(ctx: Context, minutes: number, text: string) {
  setTimeout(() => {
    ctx.reply(`⏰ Напоминание: ${text}`);
  }, minutes * 60 * 1000);
}

export function executeInNMilliseconds(ctx: Context, milliseconds: number, text: string) {
    setTimeout(() => {
      ctx.reply(`⏰ Напоминание: ${text}`);
    }, milliseconds);
}
