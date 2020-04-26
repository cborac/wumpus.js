const Discord = require("../src/index.js")
if (!process.env.CI) require("dotenv").config()
const token = process.env.TESTOKEN
const Bot = new Discord.Bot({ token })


Bot.on("debug", d => {
    if (typeof d === "string") console.log(d, `color: yellow`)
    else console.log(d)
})

Bot.on("READY", () => {
    Bot.user
    console.log("Ready!")
    if (!!process.env.CI) process.exit(0)
})

Bot.on("MESSAGE_CREATE", m => {
    console.log(m)
    Bot.channels.get(m.channel_id).send(new Discord.BotMessage().setContent("This is the first message that has been sent by Wumpus.js")).then(e => {
        e.text().then(a => console.log(a))
    })
})