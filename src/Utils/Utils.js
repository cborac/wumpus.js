class Utils {

    static pack(a) {
        return JSON.stringify(a)
    }

    static parse(a) {
        return JSON.parse(a)
    }
}
module.exports = Utils