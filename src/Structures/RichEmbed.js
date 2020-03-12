/**
 * Discord Embed
 * @class
 */

export default class RichEmbed{
    /**
     * @constructor
     */

    constructor() {
        this.raw = { type: "rich" }
    }
    
    
    
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

    addField = function (name, value, inline) {
        const fieldObject = {
            name: name,
            value: value
        }
        if (inline) {
            Object.assign(fieldObject, { inline: inline })
        }
        if (this.raw.fields) {
            Object.assign(this.raw, { fields: [fieldObject] })
            return this;
        } else {
            this.raw.fields.push(fieldObject)
            return this;
        }
    }
    
    
    
    /**
     * Sets the title of the embed
     * @param {String} title
     * @returns {RichEmbed}
     */
    title = function (title) {
        if (typeof title != "string") return console.error("Title can only be a string")
        Object.assign(this.raw, { title: title })
        return this;
    }
    
    
    
    /**
     * Sets timestamp
     * @param {Date} [date] - Date object to set a timestamp (If it lefts undefined it will get current date)
     * @return {RichEmbed}
     * 
     */
    timeStamp = function (date) {
        if (typeof date instanceof Date) {
            Object.assign(this.raw, { timestamp: date.toISOString() })
            return this;
        } else if (date) {
            console.error("Invalid date object!")
            return this;
        } else {
            Object.assign(this.raw, { timestamp: date.toISOString() })
            return this;
        }

    }
    
    
    
    /**
     * Sets the embed color
     * @param {Color} color - Color
     */
    color = function (color) {
        Object.assign(this.raw, { color: resolveColor(color) })
    }
    
    
    
    /**
     * Sets the description of the embed
     * @param {String} - Description
     */
    description = function (text) {
        Object.assign(this.raw, { description: text })
    }
    
    
    
    /**
     * Sets the URL of the embed
     * @param {String} - URL
     */
}