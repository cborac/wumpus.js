const WebSocket = require("ws")
const EventEmitter = require("events");
const pack = (p) => JSON.stringify(p);
const parse = (p) => JSON.parse(p)

/**
 * Websocket Controller
 * @class
 * @extends EventEmitter
 */

class Gateway extends EventEmitter {

    /**
     * Establishs connection between client and WSS
     * @param {String} token 
     * @param {String} wss
     * @param {Object} options WS payload Options
     */
    constructor(token, wss, options) {
        super()
        this.ws = new WebSocket(wss, { handshakeTimeout: 99999 })

        this.ws.onopen = () => {
            this.ws.send(pack(Object.assign(options, {
                op: 2,
                d: {
                    token,
                    properties: {
                        $os: "linux",
                        $browser: "wumpus.js",
                        $device: "wumpus.js"
                    }
                }
            })))
        }

        this.ws.on("message", (data) => {
            data = parse(data)
            this.emit("t", data)

            if (data.op === 10) setInterval(() => this.ws.send(JSON.stringify({ op: 1 })), data.d.heartbeat_interval);
            else if (data.op === 0) this.emit(data.t, data.d);
        })
    }

    __send(d, s, op) {
        if (!op) op = 0
        this.ws.send(pack({ op, t, d }))
    }
}

module.exports = Gateway