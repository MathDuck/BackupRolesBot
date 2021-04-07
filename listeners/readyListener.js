const { Listener } = require("discord-akairo");

class ReadyListener extends Listener {
  constructor() {
    super("ready", {
      emitter: "client",
      event: "ready",
    });
  }

  exec() {
    const plural = "";
    if (this.client.guilds.cache.size > 1) plural = "s";
    console.log(
      `Le bot ${this.client.user.tag} est en ligne sur ${this.client.guilds.cache.size} serveur` +
        plural +
        `!`
    );
  }
}

module.exports = ReadyListener;
