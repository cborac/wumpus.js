const req = 

/**
 * @param {Object} rawData - An object
 * @param {Range} type - Can be User, Guild, Channel, Member
 */

module.exports = function(rawData, type){
    const data = JSON.parse(rawData)
    
    switch (type) {
        case "User":
            Object.assign(data, {__type: "User", send: function(content){
                
            }})
    }
   
    return data;
}