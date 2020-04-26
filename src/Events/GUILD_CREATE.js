const Guild = require("../Structures/Guild.js")

/**
 * Handles GUILD_CREATE event which is coming from gateway
 * @param {Bot} bot 
 * @param {*} d 
 */
function GUILD_CREATE(bot, d) {
    bot.emit("debug", d)
    const g = new Guild(bot, d)
    bot.guilds.set(g.id, g)
    if (!bot.guilds.has(g.id)) bot.emit("GUILD_CREATE", g)
}

module.exports = GUILD_CREATE