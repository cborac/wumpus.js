/* eslint-disable no-unused-vars */


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
 * @typedef Snowflake
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
 * @typedef api
 */
interface api {
    WS: Gateway,
    REST: REST
}

/**
 * Guild verification level
 * @typedef GuildVerificationLevels
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
 * @typedef BotOptions
 */
interface BotOptions {
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

/**
 * The pure GuildData that comes from the WS
 * @typedef GuildData
 */
interface GuildData {
    roles:                         RoleData[];
    system_channel_id:             string;
    mfa_level:                     number;
    emojis:                        any[];
    verification_level:            number;
    region:                        string;
    unavailable:                   boolean;
    preferred_locale:              string;
    features:                      any[];
    channels:                      ChannelData[];
    premium_tier:                  number;
    owner_id:                      string;
    afk_timeout:                   number;
    public_updates_channel_id:     null;
    vanity_url_code:               null;
    name:                          string;
    afk_channel_id:                null;
    joined_at:                     string;
    presences:                     PresenceData[];
    member_count:                  number;
    application_id:                null;
    splash:                        null;
    icon:                          string;
    rules_channel_id:              null;
    max_video_channel_users:       number;
    banner:                        null;
    explicit_content_filter:       number;
    voice_states:                  any[];
    discovery_splash:              null;
    lazy:                          boolean;
    premium_subscription_count:    number;
    description:                   null;
    members:                       MemberData[];
    system_channel_flags:          number;
    default_message_notifications: number;
    large:                         boolean;
    id:                            string;
}

 interface ChannelData {
    user_limit?:           number;
    type:                  number;
    position:              number;
    permission_overwrites: any[];
    name:                  string;
    id:                    string;
    bitrate?:              number;
    topic?:                string;
    rate_limit_per_user?:  number;
    parent_id?:            string;
    nsfw?:                 boolean;
    last_message_id?:      string;
}

 interface MemberData {
    user:           UserData;
    roles:          string[];
    mute:           boolean;
    joined_at:      string;
    hoisted_role:   null;
    deaf:           boolean;
    premium_since?: null;
    nick?:          null;
}

 interface UserData {
    username:      string;
    public_flags?: number;
    id:            string;
    discriminator: string;
    avatar:        string;
    bot?:          boolean;
}

 interface PresenceData {
    user:          PresenceUser;
    status:        string;
    game:          Activity | null;
    client_status: ClientStatus;
    activities:    Activity[];
}

 interface Activity {
    type:           number;
    timestamps:     Timestamps;
    state:          string;
    name:           string;
    id:             string;
    details:        string;
    created_at:     number;
    assets:         ActivityAssets;
    application_id: string;
}

 interface ActivityAssets {
    small_text:  string;
    small_image: string;
    large_text:  string;
    large_image: string;
}

 interface Timestamps {
    start: number;
}

 interface ClientStatusData {
    desktop?: string;
    web?:     string;
}

 interface PartialUserData  {
    id: string;
}

 interface RoleData {
    position:    number;
    permissions: number;
    name:        string;
    mentionable: boolean;
    managed:     boolean;
    id:          string;
    hoist:       boolean;
    color:       number;
}
