const TextChannel = require('./TextChannel').default;

class GuildChannel extends TextChannel {
  constructor(bot, d) {
    super(bot, d);
  }
}

module.exports = GuildChannel;
