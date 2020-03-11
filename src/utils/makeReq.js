const fetch = require("node-fetch")

/**
 * @param {String} endpoint - Discord endpoint
 * @param {String} method - HTTP method
 * @param {String} token - Discord Bot token
 * @param {JSON} body - Push body
 */

module.exports = async function (endpoint, method, token, body) {
    const options = {
        method: method,
        headers: {
            Authorization: `Bot ${token}`
        }
    }
    if(method.toLowerCase() == "put" && body){
        Object.assign(options, {body: body})
    }
    return fetch(`https://discordapp.com/api/v6${endpoint}`, options)
        .then(async res => {
            return await res.json()
        })
}