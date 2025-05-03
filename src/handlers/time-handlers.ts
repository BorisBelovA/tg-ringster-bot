import { callbackQuery } from 'telegraf/filters';
import { MyContext, MyWizardSession } from "@utils/context";
import {
    createCustomTimeTodayNotification,
    createMinutesNotification,
    executeInNMilliseconds,
    executeInNMinutes
} from '@utils/notifications';
import { Message } from 'telegraf/typings/core/types/typegram';
import { timeValid } from '@utils/time-validators';

// Run notification 
export const handleMinutes = (ctx: MyContext): void => {
    if (!ctx.has(callbackQuery('data'))) {
        ctx.scene.leave();
        return;
    }
    const minutes = +ctx.callbackQuery.data.split('min_')[1];
    const text = (ctx.session as MyWizardSession).userText ?? '';
    ctx.reply(createMinutesNotification(text, minutes))
    executeInNMinutes(ctx, minutes, text);
    ctx.scene.leave();
}

export const handleCustomTime = async (ctx: MyContext): Promise<void> => {
    const inputtedTime = (ctx.message as Message.TextMessage).text;
    const showErrorAndLeave = (error: string) => {
        ctx.reply(error);
        ctx.scene.leave();
    }
    if (!timeValid(inputtedTime)) {
        showErrorAndLeave('Вы указали неверное время');
        return;
    }
    // Validated above
    const [hours, minutes] = inputtedTime?.split(':');
    const targetDate = new Date();
    targetDate.setHours(+hours);
    targetDate.setMinutes(+minutes);
    const reminderText = (ctx.session as MyWizardSession).userText ?? '';
    
    ctx.reply(createCustomTimeTodayNotification(reminderText, inputtedTime));

    executeInNMilliseconds(
        ctx,
        Math.abs(new Date().getTime() - targetDate.getTime()),
        reminderText
    );
    ctx.scene.leave();
}