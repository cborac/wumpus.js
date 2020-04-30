import GuildChannel from './GuildChannel';
import Cocktail from '../Utils/Cocktail';
import { pack } from "../Utils/Utils";

/**
 * Represents a voice server region
 * @class
 */
class Region {
  /**
     * @param {Bot} bot
     * @param {object} data
     */
  constructor(data) {
    /**
         * The region as code as "us-central" for example.
         * @type {String}
         */
    this.region = data.id;
    /**
         * The name of the region "US Central" for example.
         * @type {String}
         */
    this.name = data.name;
    /**
         * Is it VIP only
         * @type {Boolean}
         */
    this.vip = !!data.vip;
    /**
         * Is it optimal
         * @type {Boolean}
         */
    this.optimal = !!data.optimal;
    /**
         * Is it deprecated
         * @type {Boolean}
         */
    this.deprecated = !!data.deprecated;
  }

  toString() {
    pack(this);
  }
}

/**
 * Represents a discord guild
 * @class
 */

class Guild {
  /**
     * Builds the guild object
     * @param {import("../Bot")} bot
     * @param {Object} data
     */
  constructor(bot, data) {
    this.bot = bot;


    /**
         * The snowflake of the guild
         * @type {Snowflake}
         */
    this.id = data.id;


    /**
         * The name of the guild
         * @type {String}
         */
    this.name = data.name;


    // Fetchs the all available voice servers for the guild
    this.bot.api.REST.get(`/guilds/${data.id}/regions`).then(async (res) => {
      res.json().then((servers) => {
        /**
                 * Region of the voice servers of the guild
                 * @type {Region}
                 */
        this.region = new Region(servers.find((s) => s.id === data.region));
      });
    });

    /**
         * Image hashes
         * @type {GuildHashs}
         */
    this.hashs = {
      icon: data.icon,
      splash: data.splash,
      discovery: data.discovery_splash,
    };

    /**
         * Permission level of the bot in the guild
         * @type {null|Number}
         */
    this.level = (data.permissions) ? data.permissions : null;


    /**
         * Afk timeout in milliseconds
         * @type {Number}
         */
    this.timeout = data.afk_timeout * 1000;

    this.channels = new Cocktail();

    data.channels.forEach((c) => {
      let channel = null;
      if (c.type === 0) channel = new GuildChannel(this.bot, c);
      this.channels.set(c.id, channel);
      this.bot.channels.set(c.id, channel);
    });


    /**
         * Verification level of the guild
         * @type {GuildVerificationLevels}
         */
    this.verification;

    switch (data.verification_level) {
      case 0:
        this.verification = 'NONE';
        break;


      case 1:
        this.verification = 'LOW';
        break;


      case 2:
        this.verification = 'MEDIUM';
        break;


      case 3:
        this.verification = 'HIGH';
        break;


      case 4:
        this.verification = 'VERY_HIGH';
        break;
    }

    this.channels = new Cocktail()

    //data.channels.


    /**
         * Default notification settings. Its `true` when its only mentions.
         * @type {Boolean}
         */
    this.messageNotification = !!data.default_message_notifications;

    /**
         * MFA levels values are: @link https://discordapp.com/developers/docs/resources/guild#guild-object-mfa-level
         * @type {Number}
         */
    this.mfa = data.mfa_level;

    this.widgetChannel = (data.widget_enabled) ? this.channels.get(data.widget_channel_id) : null;
    this.system = {
      // channel: (data.system_channel_id) ? this.channels.get(system_channel_id) : null,
      //
    };
  }
}

export default Guild;
