let API_KEY: string

export const setApiKey = (key: string) => API_KEY = key

const genTelegramSendUrl = (params: any) => {
  return `https://api.telegram.org/bot${API_KEY}/sendMessage?` + params;
}

const genTelegramEditUrl = (params: any) => {
  return `https://api.telegram.org/bot${API_KEY}/editMessageText?` + params;
}

export const sendTelegramMessageWithMenu = async (chatId: string, message: string, menu: any) => {
  const formattedMessage = formatMessage(message)
  const params = genTelegramPayload(chatId, formattedMessage, null, { keyboard: menu })
  const url = genTelegramSendUrl(params)
  return await sendMessage(url);
}

export const editTelegramMessageWithMenu = async (chatId: string, messageId: string, message: string, menu: any) => {
  const formattedMessage = formatMessage(message)
  const params = genTelegramPayload(chatId, formattedMessage, messageId, { keyboard: menu })
  const url = genTelegramEditUrl(params)
  return await sendMessage(url);
}

export const sendTelegramMessage = async (chatId: string, message: string, markup?: any) => {
  const formattedMessage = formatMessage(message)
  const params = genTelegramPayload(chatId, formattedMessage, null, markup)
  const url = genTelegramSendUrl(params);
  return await sendMessage(url);
};

export const editTelegramMessage = async (chatId: string, messageId: string, message: string, markup?: any) => {
  const formattedMessage = formatMessage(message)
  const params = genTelegramPayload(chatId, formattedMessage, messageId, markup)
  const url = genTelegramEditUrl(params);
  return await sendMessage(url)
}

const genTelegramPayload = (
  chatId: string,
  text: string,
  messageId: string | null,
  replyMarkup: any
) => {
  const params = new URLSearchParams({
    chat_id: chatId,
    text: text,
    parse_mode: "MarkdownV2"
  })
  if (messageId) {
    params.append("message_id", messageId)
  }
  if (replyMarkup) {
    params.append("reply_markup", decodeURIComponent(JSON.stringify(replyMarkup)))
  }
  return params
}

export const sendMessage = async (url: string) => {
  const data = await fetch(url).then((resp) => resp.json());
  console.log({ url: url, resp: data })
  return data;
}

const formatMessage = (message: string) => {
  return message
    .replaceAll("_", "\\_")
    .replaceAll("[", "\\[")
    .replaceAll("]", "\\]")
    .replaceAll("~", "\\~")
    .replaceAll(">", "\\>")
    .replaceAll("#", "\\#")
    .replaceAll("+", "\\+")
    .replaceAll("-", "\\-")
    .replaceAll("=", "\\=")
    .replaceAll("|", "\\|")
    .replaceAll("{", "\\}")
    .replaceAll("{", "\\}")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)")
    .replaceAll(".", "\\.")
    .replaceAll("!", "\\!")
}
