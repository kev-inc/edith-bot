let API_KEY: string

export const setApiKey = (key: string) => API_KEY = key

export const sendTelegramMessage = async (chatId: string, message: string, keyboard: any = null) => {
  const searchParams = new URLSearchParams({
    chat_id: chatId, 
    text: message,
    parse_mode: "MarkdownV2"
  })
  if (keyboard !== null) {
    searchParams.append("reply_markup", decodeURIComponent(JSON.stringify(keyboard)))
  }
  const url = `https://api.telegram.org/bot${API_KEY}/sendMessage?` + searchParams;
  console.log(url);
  const data = await fetch(url).then((resp) => resp.json());
  return data;
};

export const editTelegramMessage = async (chatId: string, messageId: string, message: string, keyboard: any = null) => {
  const searchParams = new URLSearchParams({
    chat_id: chatId, 
    message_id: messageId, 
    text: message,
    parse_mode: "MarkdownV2"
  })
  if (keyboard !== null) {
    searchParams.append("reply_markup", decodeURIComponent(JSON.stringify(keyboard)))
  }
  const url = `https://api.telegram.org/bot${API_KEY}/editMessageText?` + searchParams;
  console.log(url);
  const data = await fetch(url).then((resp) => resp.json());
  return data;
}
