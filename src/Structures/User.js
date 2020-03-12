import Channel from './Channel';

    /**
     * Creates a new User object
     * @constructor
     * @param {Object} userData - The user object that is providen by discord
     */
    export default class User extends Channel{
    constructor(userData){
        /**
         * Adds all of the data of the userData imports in to the User
         */
        Object.entries(userData).forEach(u => {
            this[u[0]] = u[1]
        })

        this.avatar = `https://cdn.discordapp.com/${userData.id}/${userData.avatar.startsWith("a_") ? userData.avatar + ".gif" : userData.avatar + ".png"}`
        this.tag = `${this.username}#${this.discriminator}`
        this.mention = `<@!${this.id}>`

    }

    
}