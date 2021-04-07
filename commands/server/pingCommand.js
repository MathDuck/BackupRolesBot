const { Command } = require("discord-akairo");

class PingCommand extends Command {
  constructor() {
    super("ping", {
      aliases: ["ping"],
      category: "server",
      cooldown: 5000,
      ratelimit: 2,
    });
  }

  exec(message) {
    if (message.deletable) message.delete();
    message.channel.send("Loading data").then(async (msg) => {
      if (msg.deletable) msg.delete();
      message
        .reply(
          `🏓 Latency is ${
            msg.createdTimestamp - message.createdTimestamp
          }ms. API Latency is ${Math.round(this.client.ws.ping)}ms`
        )
        .then((m) => m.delete({ timeout: 15000 }));
    });
  }
}

module.exports = PingCommand;
