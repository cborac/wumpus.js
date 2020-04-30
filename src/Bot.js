import REST from './Utils/REST.js';
import { EventEmitter } from 'events'; // eslint-disable-line no-console
import GateWay from './WebSocket/WebSocket.js';
import Cocktail from './Utils/Cocktail.js';
import Events from './Events/Gatherer.js';

/**
 * The Bot Itself
 * @extends EvenEmitter
 * @class
 * @typedef {Bot} Bot
 */
class Bot extends EventEmitter {
  /**
     * @param {BotOptions} ClientOptions
     */
  constructor({token, guildSub, wss}) {
    super();

    this.wss = (wss) ? wss : 'wss://gateway.discord.gg/';

    this.private = {
      token: token,
    };

    /**
         * All guilds that the bot is on
         * @type {Cocktail}
         */
    this.guilds = new Cocktail();

    /**
         * All the channels that the bot is on
         */
    this.channels = new Cocktail();

    /**
         * API service of the bot
         * @type {api}
         * @property {GateWay} WS
         * @property {REST} REST
         */
    this.api = {
      WS: new GateWay(this, this.wss, {guild_subscription: !!guildSub}),
      REST: new REST(this),
    };


    this.api.WS.onerror = (e) => {
      this.api.WS.terminate();
      throw new Error(e);
    };

    this.events = new Events(this);

    this.api.WS.on('info', (event, d) => {
      this.events.do(event, d);
    });

    this.api.WS.on('MESSAGE_CREATE', (d) => {
      this.emit('MESSAGE_CREATE', d);
    });
  }
}


export default Bot;