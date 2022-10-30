import { MENU_KEYBOARD } from "./constants";
import { sendTelegramMessageWithMenu } from "./telegram"

export const genHelpMessage = async (chatId: string) => {
    const message = '*Welcome\\. I am EDITH\\.*'
    await sendTelegramMessageWithMenu(chatId, message, MENU_KEYBOARD)
}