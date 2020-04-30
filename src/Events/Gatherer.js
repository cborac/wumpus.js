const eventList = ['GUILD_CREATE', 'READY', 'MESSAGE_CREATE'];

class EventGatherer {
  constructor(bot) {
    this.bot = bot;
  }

  do(event, d) {
    this.bot.emit('debug', `%c[EVENT] [${event}] [WS] => [Bot]`);
    this.bot.emit('debug', d);
    if (!eventList.includes(event)) return;
    else require(`./${event}.js`)(this.bot, d);
  }
}

module.exports = EventGatherer;
