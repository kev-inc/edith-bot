import { sendTelegramMessage } from "./telegram"

let GH_KEY: string

export const setGHKey = (key: string) => {
    GH_KEY = key
}

export const genVM = async (chatId: string) => {
    const resp = await fetch('https://api.github.com/repos/btxkev3/Windows2019RDP-US-MMDYT/actions/workflows/RDP-US.yml/dispatches', {
        method: 'POST', 
        headers: {
            'content-type': 'application/vnd.github+json',
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${GH_KEY}`,
            'user-agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"

        },
        body: JSON.stringify({"ref": "main"})
    })
    await sendTelegramMessage(chatId, `VM is starting ${resp.status}\n\nPlease check the status [here](${"https://github.com/btxkev3/Windows2019RDP-US-MMDYT/actions"})`)
}