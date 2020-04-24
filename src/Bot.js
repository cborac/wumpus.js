const REST = require("./Utils/REST.js")
const EvenEmitter = require("events").EventEmitter
const GateWay = require("./WebSocket/index.js")
/**
 * The Bot Itself
 * @class
 * @emits ready
 * @extends EvenEmitter
 */
class Bot extends EvenEmitter {
    /**
     * 
     * @param {Object} ClientOptions 
     * @param {String} ClientOptions.token
     * @param {boolean} [ClientOptions.guildSub]
     * @param {URL} [wss]
     */
    constructor({ token, guildSub, wss }) {
        super()

        this.wss = (wss) ? wss : "wss://gateway.discord.gg/"

        this.private = {
            token: token
        }

        this.api = {
            WS: new GateWay(token, this.wss, { guild_subscription: !!guildSub }),
            REST: new REST(this)
        }


        this.api.WS.onerror = e => {
            this.gw.ws.terminate();
            throw new APIError(e);
        };


        this.api.WS.on("READY", d => {
            this.emit("debug", d)
            this.user = d.user
            this.emit("READY");
        });

        this.api.WS.on("MESSAGE_CREATE", d => {
            this.emit("MESSAGE_CREATE", d);
        });
    }
}

module.exports = Bot