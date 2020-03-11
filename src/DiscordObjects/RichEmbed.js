const resolveColor = require("../utils/colorResolver.js")

class RichEmbed {

    /**
     * @constructor
     * 
     */

    constructor() {
        this.rawEmbed = {type: "rich"}

        /**
         * Adds a field to the embed
         * @param {String} name - Name of the field
         * @param {String} value - Value of the field
         * @param {Boolean} [inline = false]
         * @returns {RichEmbed}
         * @example
         * const embed = new Discord.RichEmbed()
         *  .addField("\u200b", "Welcome to the server")
         *  .addField("Rules", "There are no rules!", true);
         */

        this.addField = function(name, value, inline){
            const fieldObject = {
                name: name,
                value: value
                }
            if (inline) {
                Object.assign(fieldObject, {inline: inline})
            }
            if(this.rawEmbed.fields){
                Object.assign(this.rawEmbed, {fields: [fieldObject]})
                return this;
            }else {
                this.rawEmbed.fields.push(fieldObject)
                return this;
            }
        }
        /**
         * Sets the title of the embed
         * @param {String} title
         * @returns {RichEmbed}
         */
        this.title = function(title){
            if (typeof title != "string") return console.error("Title can only be a string")
            Object.assign(this.rawEmbed, {title: title})
            return this;
        }
        /**
         * Sets timestamp
         * @param {Date} [date] - Date object to set a timestamp (If it lefts undefined it will get current date)
         * @return {RichEmbed}
         * 
         */
        this.timeStamp() = function(date){
            if (typeof date instanceof Date){
                Object.assign(this.rawEmbed, {timestamp : date.toISOString()})
                return this;
            }else if(date){
                console.error("Invalid date object!")
                return this;
            }else{
                Object.assign(this.rawEmbed, {timestamp: date.toISOString()})
                return this;
            }
    
        }
        /**
         * Sets the embed color
         * @param {Color} color - Color
         */
        this.color() = function(color){
            Object.assign(this.rawEmbed, {color: resolveColor(color)})
        }
        /**
         * Sets the description of the embed
         * @param {String} - Description
         */
        this.description() = function (text) {
            Object.assign(this.rawEmbed, {description: text})
        }
        /**
         * Sets the URL of the embed
         * @param {String} - URL
         */
    }
}

module.exports = RichEmbed