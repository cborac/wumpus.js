const Utils = require("../Utils/Utils")

class Message {
    constructor(){}

    /**
     * 
     * @param {String} content 
     */
    setContent(content) {
        this.content = content
        return this
    }

    JSON() {
        return Utils.pack({
            content: this.content,
            tts: !!this.tts,
            embed: this.embed   
        })
    }
}

module.exports = Message