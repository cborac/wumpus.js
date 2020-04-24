const fetch = require("node-fetch")

class REST {
    constructor(client) {
        this.client = client
    }
    /**
     * @param {String} endpoint
     * @returns {Promise<Response>} endpoint
     */
    get(endpoint) {
        return fetch("https://discordapp.com/api/v6" + endpoint, {
            Headers: {
                Authorization: this.client.private.token
            },
            agent: false
        })
    }

    fetch(instance) {
        //
    }

}

module.exports = REST