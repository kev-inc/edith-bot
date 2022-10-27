import { sendTelegramMessage } from "./telegram"

export const genHelpMessage = async (chatId: string) => {
    const message = '*Welcome\\. I am EDITH\\.*\n' +
    '/tasks \\- _Get your list of open tasks_\n' + 
    '/closedtasks \\- _Get your list of closed tasks_\n'
    await sendTelegramMessage(chatId, message);
}