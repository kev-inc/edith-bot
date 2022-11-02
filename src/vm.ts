import { sendTelegramMessage } from "./telegram"

let GH_KEY: string

export const setGHKey = (key: string) => {
    GH_KEY = key
}

export const genVM = async (chatId: string) => {
    console.log(GH_KEY)
    const resp = await fetch('https://api.github.com/repos/btxkev3/Windows2019RDP-US-MMDYT/actions/workflows/RDP-US.yml/dispatches', {
        method: 'POST', 
        headers: {
            'content-type': 'application/vnd.github+json',
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${GH_KEY}`
        },
        body: JSON.stringify({"ref": "main"})
    })
    await sendTelegramMessage(chatId, `Status is ${resp.status}\n\nPlease check the status here: https://github.com/btxkev3/Windows2019RDP-US-MMDYT/actions`)
}