const Discord = require("../src/index.js")
if (!process.env.CI) require("dotenv").config()
const token = process.env.TESTOKEN
const Bot = new Discord.Bot({ token })

Bot.on("debug", d => console.log(d))

Bot.on("ready", d => {
    console.log("Ready!")
})

Bot.on("MESSAGE_CREATE", m => {
    console.log(m)
})