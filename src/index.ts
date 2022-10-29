import { NEW_REMINDER, NEW_TASK, VIEW_TASKS } from "./constants";
import { genHelpMessage } from "./help";
import { genAskReminderDateMessage, genAskReminderTimeMessage, genReminderClearMessage, genReminderSetMessage } from "./reminders";
import {
  clearReminder,
  clearTask,
  createTask,
  genClosedTasksMessage,
  genOpenTasksMessage,
  setDB,
  showTask,
} from "./tasks";
import { setApiKey } from "./telegram";

export interface Env {
  DB: KVNamespace;
  API_KEY: string;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    setApiKey(env.API_KEY);
    setDB(env.DB);
    const payload: any = await request.json();
    console.log(payload);
    if ("callback_query" in payload) {
      const chatId: string = payload.callback_query.message.chat.id
      const messageId: string = payload.callback_query.message.message_id
      const callback_data = payload.callback_query.data
      if (callback_data === "tasks") {
        await genOpenTasksMessage(chatId, messageId)
      } else if (callback_data.startsWith("close_")) {
        // eg close_123
        const taskId = callback_data.split("_")[1]
        await clearTask(chatId, messageId, parseInt(taskId))
        await genOpenTasksMessage(chatId);
      } else if (callback_data.startsWith("setreminder_")) {
        // eg setreminder_123
        const taskId = callback_data.split("_")[1]
        await genAskReminderDateMessage(chatId, messageId, taskId)
      } else if (callback_data.startsWith("clearreminder_")) {
        // eg clearreminder_123
        const taskId = callback_data.split("_")[1]
        await clearReminder(chatId, taskId)
        await genReminderClearMessage(chatId, messageId, taskId)
        await showTask(chatId, taskId)
      } else if (callback_data.startsWith("R_")) {
        // eg R_123_01012022 or R_123_01012022_18
        const [_, taskId, date, hour] = callback_data.split("_")
        if (hour) {
          await genReminderSetMessage(chatId, messageId, taskId, date, hour)
          await showTask(chatId, taskId)
        } else {
          await genAskReminderTimeMessage(chatId, messageId, taskId, date)
        }
      }
    } else if ("message" in payload) {
      const chatId: string = payload.message.chat.id;
      const text: string = payload.message.text;
      if (text.startsWith("/")) {
        if (text.startsWith("/T")) {
          const taskNumber = text.split(" ")[0];
          const taskIndex = parseInt(taskNumber.substring(2));
          await showTask(chatId, taskIndex);
          // await clearTask(chatId, taskIndex);
          // await genOpenTasksMessage(chatId);
        } else if (text === "/closedtasks") {
          await genOpenTasksMessage(chatId);
          await genClosedTasksMessage(chatId);
        } else if (text === "/help" || text === "/start") {
          await genHelpMessage(chatId);
        }
      } else if (text === VIEW_TASKS) {
        await genOpenTasksMessage(chatId);
      } else if (text === NEW_TASK) {
        
      } else if (text === NEW_REMINDER) {

      } else {
        if ("forward_sender_name" in payload.message) {
          const senderName = payload.message.forward_sender_name;
          await createTask(chatId, `(${senderName}) ${text}`);
        } else if ("forward_from" in payload.message) {
          const senderName = payload.message.forward_from.first_name;
          await createTask(chatId, `(${senderName}) ${text}`);
        } else {
          await createTask(chatId, text);
        }
        await genOpenTasksMessage(chatId);
      }
    }

    return new Response("Hello World!");
  },
};
