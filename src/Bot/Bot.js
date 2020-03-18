const APIHandler = require("../API/APIHandler")
const User = require("../Structures/User")
const EventEmitter = require('events').EventEmitter;
const WebSocket = require('ws');

/**
 * @constructor
 * @extends EventEmitter
 * @emits ready - Events will be added soon
 */

class Bot extends EventEmitter{
    constructor() {
        super()
        
        this.token = null;
        this.user = null;
        this.id = null;
        this.fetchUser = async function (userID) {
            return await fetchUser(userID, this.token);
        }
        
        this.login = function (token) {

            this.token = token

            this.user = (async () => { return new User(await (new APIHandler(this.token)).get("/users/@me")) })();
            

            const ws = new WebSocket("wss://gateway.discord.gg/?v=6&encoding=json", { agent: APIHandler.UserAgent })

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
    
    /**
     * Gets User object of the user by id
     * @param {String} id 
     * @returns {Promise<UserObject>}
     */
    async fetchUser(userID){
        return new User(await new APIHandler(this.token).get(`/users/${userID}`)())
    }

}
module.exports = Bot