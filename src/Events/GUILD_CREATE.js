const Guild = require("../Structures/Guild.js")

/**
 * Handles GUILD_CREATE event which is coming from gateway
 * @param {import("../Bot.js")} bot
 * @param {*} d 
 */
function GUILD_CREATE(bot, d) {
    const g = new Guild(bot, d)
    if (!bot.guilds.has(g.id)) {
        bot.emit("debug", `%c[EVENT] [GUILD_CREATE] [Bot] => [OUT]`)
        bot.emit("GUILD_CREATE", g)
    }
    
    bot.guilds.set(g.id, g)
    bot.emit("debug", `%c[CACHE] [Bot#guilds] <= [Bot] [Guild Object]`)
    bot.emit("debug", g)
}

module.exports = GUILD_CREATE