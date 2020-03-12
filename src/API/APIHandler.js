const fetch = require("node-fetch")
const userAgent = require("https").Agent

/**
 * API Handler for Discord API v6
 * @constructor
 * @param {String} endpoint - Discord endpoint
 * @param {String} method - HTTP method
 * @param {String} token - Discord Bot token
 * @param {JSON} body - Push body
 */

class APIHandler {
    /**
     * @constructor
     * @param {String} token 
     */
    constructor(token){
        this.UserAgent = new userAgent({ keepAlive: true })
        this.options = {
            auth: `Bot ${token}`,
            agent: UserAgent
        }
    }


    /**
     * Makes a GET request to the discord api with desired endpoint
     * @param {String} endpoint 
     */
    async get(endpoint){
        return fetch(`https://discordapp.com/api/v6${endpoint}`, options)
            .then(async res => {
                return await res.json()
            })
    }

    /**
     * Creates a POST request to the discord api with desired endpoint
     * @param {String} endpoint 
     * @param {JSON|Object} body 
     */
    async post(endpoint, body){
        (typeof body instanceof JSON) ? 0: body = JSON.parse(body)

        return fetch(`https://discordapp.com/api/v6${endpoint}`, Object.assign({body: body}, this.options))
            .then(async res => {
                return await res.json()
            })
    }
    
}

module.exports = APIHandler