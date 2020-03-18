const Channel = require("./Channel")

    /**
     * Creates a new User object
     * @constructor
     * @param {Object} userData - The user object that is providen by discord
     */
    class User {
    constructor(userData){
        this.raw = userData
        /**
         * Adds all of the data of the userData, in to the User
         */
        Object.entries(userData).forEach(u => {
            this[u[0]] = u[1]
        })

        this.avatar = `https://cdn.discordapp.com/${userData.id}/${userData.avatar.startsWith("a_") ? userData.avatar + ".gif" : userData.avatar + ".png"}`
        this.tag = `${this.username}#${this.discriminator}`
        this.mention = `<@!${this.id}>`

    }

    
}

module.exports = User