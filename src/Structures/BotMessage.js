import RichEmbed from "./RichEmbed"
import Attachment from "./Attachment"

export default class BotMessage{
    constructor(){
        for(let x in arguments){
            if(typeof x instanceof RichEmbed){
                Object.assign(this.embed, x.raw)
            }else if(typeof x instanceof Attachment){
                Object.assign()
            }
            }
        }
    }