const { Command } = require("discord-akairo");

class PingCommand extends Command {
  constructor() {
    super("ping", {
      aliases: ["ping"],
    });
  }

  exec(message) {
    return message.reply("Pong!").then((m) => m.delete({ timeout: 10000 }));
  }
}

module.exports = PingCommand;
