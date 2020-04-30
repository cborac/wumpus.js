import { pack } from '../Utils/Utils';

class Message {
  constructor() {}

  /**
     *
     * @param {String} content
     */
  setContent(content) {
    this.content = content;
    return this;
  }

  setEmbed(embed) {
    this.embed = embed
    return this;
  }

  JSON() {
    return pack({
      content: this.content,
      tts: !!this.tts,
      embed: this.embed,
    });
  }
}

export default Message;
