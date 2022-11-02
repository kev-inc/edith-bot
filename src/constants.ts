export const COMMANDS = {
    START: "/start",
    HELP: "/help",
    CLOSED_TASKS: "/closedtasks",
    START_VM: "/start_vm"
}

export const VIEW_TASKS = "✅ My Tasks"
export const NEW_TASK = "🆕 Create New Task"
export const NEW_REMINDER = "🔔 Create New Reminder"

export const ASK_FOR_TASK = "Please enter the task"
export const ASK_FOR_REMINDER = "Please enter the reminder"

export const SNOOZE_REMINDER = "Snooze"
export const DISMISS_REMINDER = "Dismiss"

export const REMINDER_KEYBOARD = [
    [{text: SNOOZE_REMINDER, callback_data: 0}],
    [{text: DISMISS_REMINDER, callback_data: 0}]
]

export const MENU_KEYBOARD = [
    [VIEW_TASKS],
    [NEW_TASK],
    [NEW_REMINDER]
]