const { Listener } = require("discord-akairo");
const dateFormat = require("../functions/dateFormat");

class ReadyListener extends Listener {
  constructor() {
    super("ready", {
      emitter: "client",
      event: "ready",
    });
  }

  exec() {
    let plural = "";
    if (this.client.guilds.cache.size > 1) plural = "s";
    console.log(
      `[${dateFormat.getDate(Date.now())}] Le bot ${
        this.client.user.tag
      } est en ligne sur ${this.client.guilds.cache.size} serveur` +
        plural +
        `!`
    );
  }
}

module.exports = ReadyListener;
