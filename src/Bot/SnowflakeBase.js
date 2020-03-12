/**
 * Discord uses snowflakes so hard using them?
 * @class
 */

class SnowFlakeBase{
    
      valueOf() {
        return this.id;
      }

}

module.exports = SnowFlakeBase