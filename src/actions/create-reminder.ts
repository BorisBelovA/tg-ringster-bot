import { MyContext } from "@utils/context";
import { scenes } from "@utils/scenes";

export const createReminder = (ctx: MyContext) => {
    return ctx.scene.enter(scenes.SINGLE_REMINDER);
}

