let API_KEY: string

export const setApiKey = (key: string) => API_KEY = key

export const sendTelegramMessage = async (chatId: string, message: string) => {
  const url = `https://api.telegram.org/bot${API_KEY}/sendMessage?chat_id=${chatId}&text=${message}&parse_mode=HTML`;
  console.log(url);
  const data = await fetch(url).then((resp) => resp.json());
  return data;
};
