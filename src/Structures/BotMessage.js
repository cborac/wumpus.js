const RichEmbed = require("./RichEmbed")
const Attachment = require("./Attachment")
/**
 * 
 * @param {Boolean} tts - Is tts
 */
class BotMessage{
    constructor(content, tts){
        for(let x in arguments){
            if(typeof x instanceof RichEmbed){
                Object.assign(this.embed, x.raw)
            }else if(typeof x instanceof Attachment){
                Object.assign(this.file)
            }
            };
            (content) ? Object.assign(this.content, content) : 0;
            
        };
    }

module.exports = BotMessage