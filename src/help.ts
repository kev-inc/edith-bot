import { MENU_KEYBOARD, NEW_REMINDER, NEW_TASK, VIEW_TASKS } from "./constants";
import { sendTelegramMessageWithMenu } from "./telegram"

export const genHelpMessage = async (chatId: string) => {
    const message = '*Welcome\\. I am EDITH\\.*'
    const menu = {
        keyboard: MENU_KEYBOARD
      };
    await sendTelegramMessageWithMenu(chatId, message, menu)
}