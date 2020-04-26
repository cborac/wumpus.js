/**
 * Twitter's snowflake is the id system of Discord, they determine every each user. And they are totally unique.
 *
 * An example snowflake: 703285637964628022
 * 
 * Lets turn that into binary
 * ```
 * 64                                          22       17        12             0
 *  000001000001100011010111100011000010011101    00010     00000    000000000001
 *  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^    ^^^^^     ^^^^^    ^^^^^^^^^^^^
 *       The milliseconds passed between          worker     PID    The order of the
 *          snowflake generation and                ID            id that was created in
 *          the first second of 2015                                the same process.
 * ```
 * 
 * 
 * https://discordapp.com/developers/docs/reference#snowflakes
 */
type Snowflake = string;


/**
 * Guild Hashs are the hashs about the guild images. Like Icon, Splash, Discovery splash. All of them are nullable
 * @typedef GuildHashs
 */
interface GuildHashs {
    icon: string
    splash: ?string
    discovery: ?string
}

/**
 * Represents API slave of the bot
 */
interface api {
    WS: Gateway,
    REST: REST
}

/**
 * Guild verification level
 */
enum GuildVerificationLevels {
    /** unrestricted */
    NONE,
    /** must have verified email on account */
    LOW,
    /** must be registered on Discord for longer than 5 minutes */
    MEDIUM,
    /** (╯°□°）╯︵ ┻━┻ - must be a member of the server for longer than 10 minutes */
    HIGH,
    /** ┻━┻ ミヽ(ಠ 益 ಠ)ﾉ彡 ┻━┻ - must have a verified phone number */
    VERY_HIGH
}

/**
 * Bot options
 */
type BotOptions = {
    /** Application token */
    token: string,
    /** Guild event subscription */
    guildSub: boolean,
    /** Web Socket server */
    wss: string,
}

/**
 * Any even that client can emit
 * @typedef EventType
 */
enum EventType {
    READY,
    RESUMED,
    RECONNECT,
    GUILD_CREATE,
    GUILD_DELETE,
    GUILD_UPDATE,
    INVITE_CREATE,
    INVITE_DELETE,
    GUILD_MEMBER_ADD,
    GUILD_MEMBER_REMOVE,
    GUILD_MEMBER_UPDATE,
    GUILD_MEMBERS_CHUNK,
    GUILD_INTEGRATIONS_UPDATE,
    GUILD_ROLE_CREATE,
    GUILD_ROLE_DELETE,
    GUILD_ROLE_UPDATE,
    GUILD_BAN_ADD,
    GUILD_BAN_REMOVE,
    GUILD_EMOJIS_UPDATE,
    CHANNEL_CREATE,
    CHANNEL_DELETE,
    CHANNEL_UPDATE,
    CHANNEL_PINS_UPDATE,
    MESSAGE_CREATE,
    MESSAGE_DELETE,
    MESSAGE_UPDATE,
    MESSAGE_DELETE_BULK,
    MESSAGE_REACTION_ADD,
    MESSAGE_REACTION_REMOVE,
    MESSAGE_REACTION_REMOVE_ALL,
    MESSAGE_REACTION_REMOVE_EMOJI,
    USER_UPDATE,
    PRESENCE_UPDATE,
    TYPING_START,
    VOICE_STATE_UPDATE,
    VOICE_SERVER_UPDATE,
    WEBHOOKS_UPDATE
}

/**
 * All channel types available
 */
enum ChannelTypes {
    text,
    dm,
    voice,
    parent,
    news,
    store
}