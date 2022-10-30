import { ASK_FOR_REMINDER, REMINDER_KEYBOARD } from "./constants";
import { getDBKeys, getFromDB } from "./db";
import { getAllTasks, setReminderTime } from "./tasks";
import { editTelegramMessage, sendTelegramMessage } from "./telegram";
import { genDateKeyboard, genReminderTimeUsingString, genTimeKeyboard, hasReminderPassed } from "./utils";

export const askForReminder = async (chatId: string) => {
  await sendTelegramMessage(chatId, ASK_FOR_REMINDER, {force_reply: true})
}

export const genReminderClearMessage = async (
  chatId: string,
  messageId: string,
  taskId: string,
) => {
    const tasks = await getAllTasks(chatId)
    const message = `Reminder cleared for /T${taskId} ${tasks[taskId]['title']}`
    await editTelegramMessage(chatId, messageId, message);
}

export const genReminderSetMessage = async (
  chatId: string,
  messageId: string,
  taskId: string,
  date: string,
  hour: string
) => {
    const reminder = genReminderTimeUsingString(date + hour, "DDMMYYYYhh")
    const timestamp = reminder.valueOf()
    const tasks = await getAllTasks(chatId)
    let message = `Reminder set for */T${taskId} ${tasks[taskId]['title']}*`
    message += `\n⏰ ${reminder.fromNow()} \\(${reminder.format(
      "DD MMM, ha"
    )}\\)`;
    await setReminderTime(chatId, parseInt(taskId), timestamp)
    await editTelegramMessage(chatId, messageId, message);
}

export const genAskReminderTimeMessage = async (
  chatId: string,
  messageId: string,
  taskId: string,
  date: string
) => {
  const message = "Please set the time";
  const keyboard = genTimeKeyboard(taskId, date)
  await editTelegramMessage(chatId, messageId, message, keyboard);

};

export const genAskReminderDateMessage = async (
  chatId: string,
  messageId: string|null,
  taskId: string
) => {
  const message = "When would you like me to remind you?";
  const keyboard = genDateKeyboard(taskId)
  if (messageId == null) {
    await sendTelegramMessage(chatId, message, keyboard);
  } else {
    await editTelegramMessage(chatId, messageId, message, keyboard);
  }
};

export const sendReminders = async () => {
  const dbkeys = await getDBKeys()
  const chatIds = dbkeys.keys
  console.log(chatIds)
  for (const chatId of chatIds) {
    const id = chatId.name
    const tasks = await getAllTasks(id)
    console.log(id, tasks)
    for (const [index, task] of tasks.entries()) {
      const {title, status, reminderTime} = task
      const isOpen = status === "OPEN"
      const hasPassed = hasReminderPassed(reminderTime)
      console.log(title, hasPassed)
      if (isOpen && hasPassed) {
        sendTelegramMessage(id, `🔔 /T${index} ${title} 🔔`, {inline_keyboard: REMINDER_KEYBOARD})
      }
    }
  }
  return 1
}