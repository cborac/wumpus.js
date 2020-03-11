const req = require("../utils/makeReq.js")
const makeObject = require("../utils/objectinator.js")
const fetchUser = require("../actions/fetchUser.js")
const EventEmitter = require('events').EventEmitter;
/**
 * @constructor
 * @extends EventEmitter
 * @emits ready - Events will be added soon
 */

class Bot extends EventEmitter{
    constructor() {
        super()
        this.token = undefined;
        this.user = undefined;
        this.fetchUser = async function (userID) {
            return await fetchUser(userID, this.token);
        }
        this.login = function (token) {

            this.token = token

            this.user = (async () => { return makeObject(await req("/users/@me", "GET", this.token), "User"); })();

            const WebSocket = require('ws');

            const ws = new WebSocket("wss://gateway.discord.gg/?v=6&encoding=json")

            ws.on("message", message => {
                this.emit("debug", JSON.parse(message))
            })

            ws.on("open", () => {
                ws.send(JSON.stringify({
                    "op": 2,
                    "d": {
                        "token": this.token,
                    },
                    "s": null,
                    "t": null
                }))
                this.emit("ready")
            })


            ws.on("close", () => {
                this.emit("debug", "Connection has been closed!")
            })
            return this.user;
        }
    }


}

module.exports = Bot