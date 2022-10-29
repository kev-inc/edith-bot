import { NEW_REMINDER, NEW_TASK, VIEW_TASKS } from "./constants";
import { sendTelegramMessageWithMenu } from "./telegram"

export const genHelpMessage = async (chatId: string) => {
    const message = '*Welcome\\. I am EDITH\\.*'
    const menu = {
        keyboard: [
          [VIEW_TASKS],
          [NEW_TASK],
          [NEW_REMINDER],
        ],
      };
    await sendTelegramMessageWithMenu(chatId, message, menu)
}