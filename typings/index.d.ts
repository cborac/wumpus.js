/**
 * Twitter snowflake is the id system of Discord, they determine every each user. And they are totally unique
 *
 * An example snowflake: 703285637964628022
 * Lets turn that into binary
 * ```
 * 64                                          22       17        12          0
 *  000001000001100011010111100011000010011101    00010     00000    000000000001
 *  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^    ^^^^^     ^^^^^    ^^^^^^^^^^^^
 *  The ms passed since the first second of 2015  worker     PID    The order of the
 *                                                  ID            id that was created in
 *                                                                  the same process.
 * ```
 * @typedef Snowflake
 */

type Snowflake = string

/**
 * Guild Hashs are the hashs about the guild images. Like Icon, Splash, Discovery splash. All of them are nullable
 * @typedef GuildHashs
 */
interface GuildHashs {
    icon: ?string
    splash: ?string
    discovery: ?string
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

type BotOptions = {
    token: string,
    guildSub: ?boolean,
    wss: ?string,
}