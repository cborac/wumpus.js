const req = require("../utils/makeReq.js");
const makeObject = require("../utils/objectinator.js");

/**
 * @param {String} userID - A Discord user ID
 * @param {ObjectConstructor} Bot - Bot object   
 */

module.exports = async function(userID, Bot){
    const userPromise = await req(`/users/${userID}`, "GET", Bot.token)
    return makeObject(await userPromise, "User")
}