## Set webhook
```
https://api.telegram.org/bot<api_key>/setWebhook?url=https://edith-bot.kevc.workers.dev
```

## Commands

`Normal text`
> **/T123 - Buy bread** added to tasks!

`/tasks`
>**3 open tasks**<br><br>
/T121 - Print tickets<br>
/T122 - Wash car<br>
/T123 - Buy breadd

`/closedtasks`
>**3 open tasks**<br><br>
/T121 - Print tickets<br>
/T122 - Wash car<br>
/T123 - Buy bread

`/T123`
> T123<br>**Buy bread**<br>[⏰ in 3 hours (31 Oct, 3pm)]<br>[⏰Set Reminder/Cancel Reminder]<br>[✅Close]<br>[🏠Back to tasks]

`/R Hang clothes `
> **/T124 - Hang clothes** added to tasks!<br>
> When would you like me to remind you?<br>
[Today, 28 Oct]<br>
[Sat, 29 Oct]<br>
[Sun, 30 Oct]<br>
[Mon, 31 Oct]<br>
[Tue, 1 Nov]<br>
[Wed, 2 Nov]<br>
[Thu, 3 Nov]<br>
[Custom]<br>
`{state: remind-1}`

`[Today, 28 Oct]`
> Please set the time<br>
[6am][7am][8am]<br>
[9am][10am][11am]<br>
[12pm][1pm][2pm]<br>
[3pm][4pm][5pm]<br>
[6pm][7pm][8pm]<br>
[9pm][10pm][11pm]<br>
`{state: remind-2}`

`[3pm]`
> Reminder set for **/T124 - Hang clothes**!<br>
⏰ in 3 hours (28 Oct, 3pm)

Reminder notification
> ⏰ /T124 - Hang clothes! ⏰<br>
[Dismiss]<br>
[Snooze]
