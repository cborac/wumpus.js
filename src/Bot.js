const REST = require("./Utils/REST.js")
const EvenEmitter = require("events").EventEmitter
const GateWay = require("./WebSocket/WebSocket.js")
const Cocktail = require("./Utils/Cocktail.js")
const Guild = require("./Structures/Guild.js")
const Events = require("./Events/Gatherer.js")

/**
 * The Bot Itself
 * @extends EvenEmitter
 * @public
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
         * All guilds that the bot is on
         * @type {Cocktail}
         */
        this.guilds = new Cocktail()

        /**
         * All the channels that the bot is on
         */
        this.channels = new Cocktail()
        
        /**
         * API service of the bot
         * @type {api}
         * @property {GateWay} WS
         * @property {REST} REST
         */
        this.api = {
            WS: new GateWay(this, this.wss, { guild_subscription: !!guildSub }),
            REST: new REST(this)
        }


        this.api.WS.onerror = e => {
            this.api.WS.terminate();
            throw new APIError(e);
        };

        this.events = new Events(this)

        this.api.WS.on("info", (event, d) => {
            this.events.do(event, d)
        })

        this.api.WS.on("MESSAGE_CREATE", d => {
            this.emit("MESSAGE_CREATE", d);
        });
    }
}

module.exports = Bot