const TextChannel = require("./TextChannel");

class GuildChannel extends TextChannel{
    constructor(bot, d) {
        super(bot, d)
    }
}

module.exports = GuildChannel