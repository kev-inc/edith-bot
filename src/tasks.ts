import { editTelegramMessage, editTelegramMessageWithMenu, sendTelegramMessage, sendTelegramMessageWithMenu } from "./telegram";
import moment from "moment";
import { ASK_FOR_TASK, MENU_KEYBOARD } from "./constants";

let DB: any;

export const setDB = (db: any) => (DB = db);

export const getAllTasks = async (chatId: string) => {
  let data = await DB.get(chatId);
  if (data === null) {
    return [];
  }
  return JSON.parse(data);
};

export const askForTask = async (chatId: string) => {
  await sendTelegramMessage(chatId, ASK_FOR_TASK, {force_reply: true})
}

export const createTask = async (chatId: string, title: string) => {
  const tasks = await getAllTasks(chatId);
  tasks.push({ title, status: "OPEN" });
  await DB.put(chatId, JSON.stringify(tasks));
};

export const clearTask = async (
  chatId: string,
  messageId: string,
  taskId: number
) => {
  const tasks = await getAllTasks(chatId);
  tasks[taskId]["status"] =
    tasks[taskId]["status"] === "OPEN" ? "CLOSED" : "OPEN";
  await DB.put(chatId, JSON.stringify(tasks));
  await editTelegramMessage(
    chatId,
    messageId,
    `T${taskId} ${tasks[taskId]["status"] === "OPEN" ? "reopened" : "closed"}`
  );
};

export const setReminderTime = async (
  chatId: string,
  taskId: number,
  reminderTime: number
) => {
  const tasks = await getAllTasks(chatId);
  tasks[taskId]["reminderTime"] = reminderTime;
  await DB.put(chatId, JSON.stringify(tasks));
};

export const clearReminder = async (chatId: string, taskId: number) => {
  const tasks = await getAllTasks(chatId);
  delete tasks[taskId]["reminderTime"];
  await DB.put(chatId, JSON.stringify(tasks));
};

export const showTask = async (chatId: string, taskId: number) => {
  const tasks = await getAllTasks(chatId);
  const task = tasks[taskId];
  let message = `/T${taskId}\n` + `*${task.title}*`;
  if ("reminderTime" in task) {
    const reminder = moment(task["reminderTime"]);
    message += `\n⏰ ${reminder.fromNow()} \\(${reminder.format(
      "DD MMM, ha"
    )}\\)`;
  }
  const keyboard = {
    inline_keyboard: [
      [
        "reminderTime" in task
          ? { text: "⏰ Clear Reminder", callback_data: `clearreminder_${taskId}` }
          : { text: "⏰ Set Reminder", callback_data: `setreminder_${taskId}` },
      ],
      [{ text: "✅ Close", callback_data: `close_${taskId}` }],
      [{ text: "🏠 Back to tasks", callback_data: "tasks" }],
    ],
  };
  await sendTelegramMessage(chatId, message, keyboard);
};



export const genOpenTasksMessage = async (
  chatId: string,
  messageId: string | null = null
) => {
  const tasks = await getAllTasks(chatId);
  const openTasks = tasks
    .map(
      (task: { id: number; title: string; status: string }, index: number) => {
        task.id = index;
        return task;
      }
    )
    .filter(
      (task: { id: number; title: string; status: string }) =>
        task.status === "OPEN"
    )
    .map(
      (task: { id: number; title: string; status: string }) =>
        `/T${task.id} ${task.title} ${"reminderTime" in task ? "⏰" : ""}`
    );
  const message = `*${openTasks.length} open tasks*\n\n` + openTasks.join("\n");
  if (messageId === null) {
    await sendTelegramMessageWithMenu(chatId, message, MENU_KEYBOARD);
  } else {
    await editTelegramMessageWithMenu(chatId, messageId, message, MENU_KEYBOARD);
  }
};

export const genClosedTasksMessage = async (chatId: string) => {
  const tasks = await getAllTasks(chatId);
  const openTasks = tasks
    .map(
      (task: { id: number; title: string; status: string }, index: number) => {
        task.id = index;
        return task;
      }
    )
    .filter(
      (task: { id: number; title: string; status: string }) =>
        task.status === "CLOSED"
    )
    .map(
      (task: { id: number; title: string; status: string }) =>
        `/T${task.id} ${task.title}`
    );
  const message = `${openTasks.length} closed tasks\n\n` + openTasks.join("\n");
  await sendTelegramMessage(chatId, message);
};
