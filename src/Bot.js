const REST = require("./Utils/REST.js")
const EvenEmitter = require("events").EventEmitter
const GateWay = require("./WebSocket/WebSocket.js")
const Cache = require("./Utils/Cache.js")
const Guild = require("./Structures/Guild.js")
const Events = require("./Events/Events.js")

/**
 * The Bot Itself
 * @typedef {Bot} Bot
 * @class
 * @extends EvenEmitter
 */
class Bot extends EvenEmitter {
    /**
     * @param {BotOptions} ClientOptions 
     */
    constructor({ token, guildSub, wss }) {
        super()

        this.wss = (wss) ? wss : "wss://gateway.discord.gg/"

        this.private = {
            token: token,
        }

        /**
         * @type {Cache}
         */
        this.guilds = new Cache()

        /**
         * API service of the bot
         * @type {Object}
         */
        this.api = {
            WS: new GateWay(token, this.wss, { guild_subscription: !!guildSub }),
            REST: new REST(this)
        }


        this.api.WS.onerror = e => {
            this.api.WS.terminate();
            throw new APIError(e);
        };


        this.api.WS.on("info", (event, d) => Events[event](this, d))

        this.api.WS.on("MESSAGE_CREATE", d => {
            this.emit("MESSAGE_CREATE", d);
        });
    }
}

module.exports = Bot