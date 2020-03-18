const SnowFlakeBase = require("../Bot/SnowFlakeBase")

/**
 * @class
 * @constructor
 * @param {Object} channelData - Channel Object that has been retrieven by discord
 */

class Channel extends SnowFlakeBase{
    constructor(){

        super()

        channelData = this.raw

        this.id = channelData.id

        this.type = (() => {
        switch (channelData.type){
            case 0:
                return "text"
            case 1:
                return "dm"
            case 2:
                return "voice"
            case 4:
                return "category"
            case 5:
                return "news"
            case 6:
                return "store"
        }})()
    }
}

module.exports = Channel