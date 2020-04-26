const fetch = require("node-fetch")

class REST {
    constructor(client) {
        this.client = client

        this.get("/users/@me").then(res => {
            if(res.status === 401) throw new Error("Invalid token provided.")
        })
    }
    /**
     * @param {String} endpoint
     * @returns {Promise<Response>} endpoint
     */
    get(endpoint) {
        return fetch("https://discordapp.com/api/v6" + endpoint, {
            headers: {
                Authorization: "Bot " + this.client.private.token
            },
            agent: false
        })
    }

    fetch(instance, id) {
        //...
    }

}

module.exports = REST