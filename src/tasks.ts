import { sendTelegramMessage } from "./telegram";

let DB: any;

export const setDB = (db: any) => DB = db;

export const getAllTasks = async (chatId: string) => {
  let data = await DB.get(chatId);
  if (data === null) {
    return [];
  }
  return JSON.parse(data);
};

export const createTask = async (chatId: string, title: string) => {
  const tasks = await getAllTasks(chatId);
  tasks.push({ title, status: "OPEN" });
  await DB.put(chatId, JSON.stringify(tasks));
};

export const clearTask = async (chatId: string, taskId: number) => {
  const tasks = await getAllTasks(chatId);
  tasks[taskId]["status"] =
    tasks[taskId]["status"] === "OPEN" ? "CLOSED" : "OPEN";
  await DB.put(chatId, JSON.stringify(tasks));
  await sendTelegramMessage(chatId, `T${taskId} ${tasks[taskId]['status'] === "OPEN" ? "reopened" : "closed"}`)
};

export const genOpenTasksMessage = async (chatId: string) => {
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
        `/T${task.id} ${task.title}`
    );
  const message = `${openTasks.length} open tasks\n\n` + openTasks.join("\n");
  await sendTelegramMessage(chatId, message);
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
