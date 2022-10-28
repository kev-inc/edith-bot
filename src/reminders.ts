import moment from "moment";
import { getAllTasks, setReminderTime } from "./tasks";
import { editTelegramMessage } from "./telegram";

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
    const reminder = moment(date + hour, "DDMMYYYYhh")
    const timestamp = reminder.valueOf()
    const tasks = await getAllTasks(chatId)
    const message = `Reminder set for /T${taskId} ${tasks[taskId]['title']}`
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
  const data = `R_${taskId}_${date}`
  const keyboard = {
    inline_keyboard: [
        [
          { text: "6am", callback_data: data + "_06" },
          { text: "7am", callback_data: data + "_07" },
          { text: "8am", callback_data: data + "_08" },
        ],
        [
          { text: "9am", callback_data: data + "_09" },
          { text: "10am", callback_data: data + "_10" },
          { text: "11am", callback_data: data + "_11" },
        ],
        [
          { text: "12pm", callback_data: data + "_12" },
          { text: "1pm", callback_data: data + "_13" },
          { text: "2pm", callback_data: data + "_14" },
        ],
        [
          { text: "3pm", callback_data: data + "_15" },
          { text: "4pm", callback_data: data + "_16" },
          { text: "5pm", callback_data: data + "_17" },
        ],
        [
          { text: "6pm", callback_data: data + "_18" },
          { text: "7pm", callback_data: data + "_19" },
          { text: "8pm", callback_data: data + "_20" },
        ],
        [
          { text: "9pm", callback_data: data + "_21" },
          { text: "10pm", callback_data: data + "_22" },
          { text: "11pm", callback_data: data + "_23" },
        ],
    ],
  };
  await editTelegramMessage(chatId, messageId, message, keyboard);

};

export const genAskReminderDateMessage = async (
  chatId: string,
  messageId: string,
  taskId: string
) => {
  const message = "When would you like me to remind you?";
  const keyboard = {
    inline_keyboard: [
      [
        {
          text: "Today" + moment().format(", D MMM"),
          callback_data: `R_${taskId}_${moment().format("DDMMYYYY")}`,
        },
      ],
      [
        {
          text: moment().add(1, "d").format("ddd, D MMM"),
          callback_data: `R_${taskId}_${moment()
            .add(1, "d")
            .format("DDMMYYYY")}`,
        },
      ],
      [
        {
          text: moment().add(2, "d").format("ddd, D MMM"),
          callback_data: `R_${taskId}_${moment()
            .add(2, "d")
            .format("DDMMYYYY")}`,
        },
      ],
      [
        {
          text: moment().add(3, "d").format("ddd, D MMM"),
          callback_data: `R_${taskId}_${moment()
            .add(3, "d")
            .format("DDMMYYYY")}`,
        },
      ],
      [
        {
          text: moment().add(4, "d").format("ddd, D MMM"),
          callback_data: `R_${taskId}_${moment()
            .add(4, "d")
            .format("DDMMYYYY")}`,
        },
      ],
      [
        {
          text: moment().add(5, "d").format("ddd, D MMM"),
          callback_data: `R_${taskId}_${moment()
            .add(5, "d")
            .format("DDMMYYYY")}`,
        },
      ],
      [
        {
          text: moment().add(6, "d").format("ddd, D MMM"),
          callback_data: `R_${taskId}_${moment()
            .add(6, "d")
            .format("DDMMYYYY")}`,
        },
      ],
    ],
  };
  await editTelegramMessage(chatId, messageId, message, keyboard);
};
