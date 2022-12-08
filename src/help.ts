import { MENU_KEYBOARD } from "./constants";
import { sendTelegramMessageWithMenu } from "./telegram"

export const genHelpMessage = async (chatId: string) => {
    const message = 'Please click on the menu buttons to get started!'
    await sendTelegramMessageWithMenu(chatId, message, MENU_KEYBOARD)
}
