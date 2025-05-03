import { Scenes } from "telegraf";
export type ReminderType = 'min' | 'custom_time' | 'custom_data_time';

export interface MyWizardSession extends Scenes.WizardSessionData {
  userText?: string;
  reminderType: ReminderType
}

export interface MyContext extends Scenes.WizardContext<MyWizardSession> {}