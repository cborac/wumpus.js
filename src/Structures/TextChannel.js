const Channel = require("./Channel.js")
const fetch = require("node-fetch")
/**
 * Represents any text based channel
 * @param {import("../Bot.js")} bot
 * @param {Object} d
 */
class TextChannel extends Channel {
    constructor(bot, d) {
        super(bot, d)
    }


    /**
     * 
     * @param {BotMessage} message 
     */
    send(message) {
        if (!!message.attachment) {
            return this.bot.api.REST.custom(`/channels/${this.id}/messages`, {})   
        } else {
            return fetch(`https://discordapp.com/api/v6/channels/${this.id}/messages`, {
                method: "POST",
                body: message.JSON(),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bot " + this.bot.private.token
                }
            })
        }
    }
}

module.exports = TextChannel