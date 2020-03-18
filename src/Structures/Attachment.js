/**
 * Discord Attachment
 * @class
 */
class Attachment{
    /**
     * @param
     * @param {Buffer|Stream} attachment 
     * @param {String} name
     */
    constructor(attachment, name = null){
        this.attachment = attachment
        if(name) this.attachment = name
     }
}

module.exports = Attachment