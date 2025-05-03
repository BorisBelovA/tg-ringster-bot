import { Telegraf } from "telegraf";
import { startAction } from "./start";
import { createReminder } from "./create-reminder";
import { ACTION_LABELS, ACTIONS, MyContext } from "utils";


export function setupActions(bot: Telegraf<MyContext>) {
    
    bot.start(startAction);

    // Hears instead of action because of using keyboard instead of inline keyboard
    bot.hears(ACTION_LABELS.CREATE_REMINDER, createReminder);
}