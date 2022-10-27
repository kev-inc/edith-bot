/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import {
  clearTask,
  createTask,
  genClosedTasksMessage,
  genOpenTasksMessage,
  setDB,
} from "./tasks";
import { setApiKey } from "./telegram";

export interface Env {
  DB: KVNamespace;
  API_KEY: string
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
	setApiKey(env.API_KEY)
	setDB(env.DB)
    const payload: any = await request.json();
    const chatId: string = payload.message.chat.id;
    const text: string = payload.message.text;
    if (text.startsWith("/")) {
      if (text.startsWith("/T")) {
        const taskNumber = text.split(" ")[0];
        const taskIndex = parseInt(taskNumber.substring(2));
        await clearTask(chatId, taskIndex);
      } else if (text === "/tasks") {
      } else if (text === "/closedtaks") {
        await genClosedTasksMessage(chatId);
      }

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
    }
	await genOpenTasksMessage(chatId);

    return new Response("Hello World!");
  },
};
