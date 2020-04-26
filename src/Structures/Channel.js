

/**
 * Represents **ANY** channel in discord
 * @param {import("../Bot")} bot
 * @param {Object} data
 */

class Channel {
    constructor(bot, data) {
        /**
         * The bot itself
         * @type {import("../Bot")}
         */
        this.bot = bot

        /**
         * The snowflake of the channel
         * @type {Snowflake}
         */
        this.id = data.id


        /**
         * The timestamp that when channel was created.
         * @type {Number}
         */
        this.timestamp = data.timestamp

        /**
         * 
         * @type {NewType}
         */
        this.type;

        switch (data.type) {
            case 0:
                this.type = "text"
                break;
            case 1:
                this.type = "dm"
                break;
            case 2:
                this.type = "voice"
                break;
            case 4:
                this.type = "parent"
                break;
            case 5:
                this.type = "news"
                break;
            case 6:
                this.type = "store"
                break;
        } 
    }

    /**
     * Fetch the channel it self and adds the channel to the cache
     * @returns {Promise<Channel>}
     */
    __fetch() {
        const promise = this.bot.api.REST.fetch("channel", this.id)

        promise.then(channel => this.bot.channels.set(this.id, new Channel(channel)))

        return this.bot.api.REST.fetch("channel", this.id).then(c => new Channel(c))
    }

    /**
     * Deletes the channel
     * @returns {Promise<Channel>}
     */
    delete() {
        this.bot.api.REST.get(`/channels/${this.id}`)
    }
}

module.exports = Channel