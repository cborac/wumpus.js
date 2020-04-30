function READY(bot, d) {
  d.guilds.forEach((g) => {
    bot.emit('debug', `%c[CACHE] [Bot#guilds] <=<NULL>= [Bot] [Guild ${g.id}]`);
    bot.guilds.set(g.id, null);
  });
  bot.user = d.user;
  bot.emit('READY');
  bot.emit('debug', `%c[EVENT] [READY] [Bot] => [OUT]`);
}

module.exports = READY;
