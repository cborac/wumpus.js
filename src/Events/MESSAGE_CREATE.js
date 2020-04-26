function MESSAGE_CREATE(bot, d) {
    bot.emit("MESSAGE_CREATE", d)
}

module.exports = MESSAGE_CREATE