import { sendTelegramMessage, sendTelegramMessageWithMenu } from "./telegram"

export const genHelpMessage = async (chatId: string) => {
    const message = '*Welcome\\. I am EDITH\\.*\n' +
    '/tasks \\- _Get your list of open tasks_\n' + 
    '/closedtasks \\- _Get your list of closed tasks_\n'
    const menu = {
        keyboard: [
          ["View Tasks"],
          ["Create New Task"],
          ["Create New Reminder"],
        ],
      };
    await sendTelegramMessageWithMenu(chatId, message, menu)
}