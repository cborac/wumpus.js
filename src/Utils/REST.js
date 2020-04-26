const fetch = require("node-fetch")
const Utils = require("./Utils.js")

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

    /**
    * @param {String} endpoint
    * @returns {Promise<Response>} endpoint
    */
    delete(endpoint) {
        return fetch("https://discordapp.com/api/v6" + endpoint, {
            method: "DELETE",
            headers: {
                Authorization: "Bot " + this.client.private.token
            },
            agent: false
        })
    }

    /**
     * @param {String} endpoint 
     * @param {*} object
     * @returns {Promise<Response>}
     */
    post(endpoint, o) {
        return fetch("https://discordapp.com/api/v6" + endpoint, {
            method: "post",
            body: Utils.pack(o),
            headers: {
                "Content-Length": Utils.pack(o).length,
                "Content-Type": "application/json",
                Authorization: "Bot " + this.client.private.token
            },
            agent: false
        })
    }

    /**
     * @param {String} endpoint 
     * @param {*} object
     * @returns {Promise<Response>}
     */
    put(endpoint, o) {
        return fetch("https://discordapp.com/api/v6" + endpoint, {
            method: "PUT",
            body: Utils.pack(o),
            headers: {
                "Content-Length": Utils.pack(o).length,
                "Content-Type": "application/json",
                Authorization: "Bot " + this.client.private.token
            },
            agent: false
        })
    }

    /**
     * @param {String} endpoint 
     * @param {RequestOptions} options 
     * @param {Object} body 
     */
    custom(endpoint, options, body) {
        const fetchOptions = options
        fetchOptions.body = Utils.pack(body)
        fetchOptions.agent = false
        Object.assign(fetchOptions.headers, { Authorization: "Bot " + this.client.private.token })
        return fetch("https://discordapp.com/api/v6" + endpoint, fetchOptions)
    }


    /**
     * @param {string} instance 
     * @param {Snowflake} id 
     * @returns {Promise<any|Error>}
     */
    async fetch(instance, id) {
        switch (instance) {
            case "channel":
                const res = await this.get(`/channels/${id}`)
                return new Promise(async (resolve, reject) => {
                    const result = await res.json()
                    if (res.status !== 200)
                        reject(new Error(result.messsage))
                    else
                        resolve(result)
                })
                break;
        }
    }

}

module.exports = REST