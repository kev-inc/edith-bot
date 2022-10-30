import { ASK_FOR_REMINDER, ASK_FOR_TASK, COMMANDS, NEW_REMINDER, NEW_TASK, VIEW_TASKS } from "./constants";
import { genHelpMessage } from "./help";
import { askForReminder, genAskReminderDateMessage, genAskReminderTimeMessage, genReminderClearMessage, genReminderSetMessage } from "./reminders";
import {
  askForTask,
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

const handleCallbackQuery = async (payload: any) => {
  const chatId: string = payload.callback_query.message.chat.id
  const messageId: string = payload.callback_query.message.message_id
  const callback_data = payload.callback_query.data
  if (callback_data === "tasks") {
    await genOpenTasksMessage(chatId, messageId)
  } else if (callback_data.startsWith("close_")) {
    // eg close_123
    const [_, taskId] = callback_data.split("_")
    await clearTask(chatId, messageId, parseInt(taskId))
    await genOpenTasksMessage(chatId);
  } else if (callback_data.startsWith("setreminder_")) {
    // eg setreminder_123
    const [_, taskId] = callback_data.split("_")
    await genAskReminderDateMessage(chatId, messageId, taskId)
  } else if (callback_data.startsWith("clearreminder_")) {
    // eg clearreminder_123
    const [_, taskId] = callback_data.split("_")
    await clearReminder(chatId, taskId)
    await genReminderClearMessage(chatId, messageId, taskId)
    await showTask(chatId, taskId)
  } else if (callback_data.startsWith("R_")) {
    // eg R_123_01012022 or R_123_01012022_18
    const [_, taskId, date, hour] = callback_data.split("_")
    if (hour) {
      await genReminderSetMessage(chatId, messageId, taskId, date, hour)
      await genOpenTasksMessage(chatId)
    } else {
      await genAskReminderTimeMessage(chatId, messageId, taskId, date)
    }
  }
}

const handleMessage = async (payload: any) => {
  const chatId: string = payload.message.chat.id;
  const text: string = payload.message.text;

  switch (text) {
    case VIEW_TASKS: await genOpenTasksMessage(chatId);
      break
    case NEW_TASK: await askForTask(chatId)
      break
    case NEW_REMINDER: await askForReminder(chatId)
      break
    case COMMANDS.START:
    case COMMANDS.HELP:
      await genHelpMessage(chatId);
      break
    case COMMANDS.CLOSED_TASKS:
      await genClosedTasksMessage(chatId);
      break
    default:
      if (text.startsWith("/T")) {
        const taskNumber = text.split(" ")[0];
        const taskIndex = parseInt(taskNumber.substring(2));
        await showTask(chatId, taskIndex);
      }
      break
  }
}

const handleReplyToMessage = async (payload: any) => {
  const chatId: string = payload.message.chat.id;
  const text: string = payload.message.text;
  const replyingText: string = payload.message.reply_to_message.text

  switch (replyingText) {
    case ASK_FOR_TASK: 
      await createTask(chatId, text);
      await genOpenTasksMessage(chatId);
      break;
    case ASK_FOR_REMINDER:
      const taskId = await createTask(chatId, text);
      await genAskReminderDateMessage(chatId, null, taskId.toString())
      break
  }
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
    const { message, callback_query } = payload
    if (callback_query) {
      await handleCallbackQuery(payload)
    } else if (message) {
      const { reply_to_message } = message
      if (reply_to_message) {
        await handleReplyToMessage(payload)
      } else {
        await handleMessage(payload)
      }
    }

    return new Response("Hello World!");
  },
};
