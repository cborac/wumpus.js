/**
 * @function
 * @param {String|Number} color - A color
 */


module.exports = function colorResolve(color) {
        if (typeof color == "string") {
            switch (color) {
                case "RANDOM":
                    return Math.floor(Math.random() * 16777216)
                default:
                    return 0;
            }
        }else if (typeof color == "array"){
            return Number.parseInt("0x" + Number(rgb).toString(16)) // turns in to hex integer
        }else if (typeof color == "number") return color;
    }
