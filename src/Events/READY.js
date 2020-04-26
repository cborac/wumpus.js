function READY(bot, d) {
    bot.emit("debug", d)
    d.guilds.forEach(g => {
        bot.guilds.set(g.id, null)
    })
    bot.user = d.user
    bot.emit("READY");
}

module.exports = READY