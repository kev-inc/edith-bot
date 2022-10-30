import moment from 'moment'

const genNow = () => {
    return moment().utcOffset('+0800')
}

export const genReminderTimeUsingString = (str: string, format: string) => {
    return moment(str, format).utcOffset('+0800')
}

export const genReminderTimeUsingUnix = (unixtime: string) => {
    return moment(unixtime).utcOffset('+0800')
}

export const genDateKeyboard = (taskId: string) => {
    const days = [
        genNow(),
        genNow().add(1, "d"),
        genNow().add(2, "d"),
        genNow().add(3, "d"),
        genNow().add(4, "d"),
        genNow().add(5, "d"),
        genNow().add(6, "d"),
    ]
    const keyboard = {
        inline_keyboard: [
            [
                {
                    text: "Today" + days[0].format(", D MMM"),
                    callback_data: `R_${taskId}_${days[0].format("DDMMYYYY")}`,
                },
            ],
            [
                {
                    text: days[1].format("ddd, D MMM"),
                    callback_data: `R_${taskId}_${days[1].format("DDMMYYYY")}`,
                },
                {
                    text: days[2].format("ddd, D MMM"),
                    callback_data: `R_${taskId}_${days[2].format("DDMMYYYY")}`,
                },
            ],
            [
                {
                    text: days[3].format("ddd, D MMM"),
                    callback_data: `R_${taskId}_${days[3].format("DDMMYYYY")}`,
                },
                {
                    text: days[4].format("ddd, D MMM"),
                    callback_data: `R_${taskId}_${days[4].format("DDMMYYYY")}`,
                },
            ],
            [
                {
                    text: days[5].format("ddd, D MMM"),
                    callback_data: `R_${taskId}_${days[5].format("DDMMYYYY")}`,
                },
                {
                    text: days[6].format("ddd, D MMM"),
                    callback_data: `R_${taskId}_${days[6].format("DDMMYYYY")}`,
                },
            ],
        ],
    };
    return keyboard
}

export const genTimeKeyboard = (taskId: string, date: string) => {
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
    return keyboard
}