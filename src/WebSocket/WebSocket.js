const WebSocket = require("ws")
const EventEmitter = require("events");
const Utils = require("../Utils/Utils.js")

/**
 * Establishs connection between client and WSS
 * @param {import("../Bot.js")} bot
 * @param {String} wss
 * @param {Object} options WS payload Options
 * @extends EventEmitter
 */

class Gateway extends EventEmitter {


    constructor(bot, wss, options) {
        super()
        this.ws = new WebSocket(wss, { handshakeTimeout: 99999 })

        this.ws.onopen = () => {
            bot.emit("debug", "%c[WS] <=> [Bot] Established!")
            this.ws.send(Utils.pack(Object.assign(options, {
                op: 2,
                d: {
                    token: bot.private.token,
                    properties: {
                        $os: "linux",
                        $browser: "wumpus.js",
                        $device: "wumpus.js"
                    }
                }
            })))
        }

        this.ws.on("message", (data) => {
            data = Utils.parse(data)
            this.emit("t", data)

            if (data.op === 10) setInterval(() => this.ws.send(JSON.stringify({ op: 1 })), data.d.heartbeat_interval);
            else if (data.op === 0) this.emit("info", data.t, data.d);
        })
    }

    __send(d, s, op) {
        if (!op) op = 0
        this.ws.send(Utils.pack({ op, t, d }))
    }
}

module.exports = Gateway