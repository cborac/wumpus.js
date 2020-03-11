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
         * @param {fieldObject} fieldObject - An embed field object
         * @returns {RichEmbed}
         * @example
         * 
         */
        this.addField = function(fieldObject){
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
         * @param title - It will be converted to a "String"
         * @returns {RichEmbed}
         */
        this.title = function(title){
            Object.assign(this.rawEmbed, {title: title.stringify()})
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