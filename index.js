const { AkairoClient, CommandHandler } = require("discord-akairo");
require("dotenv").config();

class DiscordClient extends AkairoClient {
  constructor() {
    super(
      {
        ownerID: process.env.OWNERID,
      },
      {
        disableMentions: "everyone",
        partials: ["MESSAGE", "CHANNEL", "REACTION"],
        presence: {
          activity: { name: "botActivityStatus", type: "WATCHING" },
          status: "online",
        },
      }
    );

    this.commandHandler = new CommandHandler(this, {
      directory: "./commands/",
      prefix: process.env.PREFIX,
    });
  }
}

const client = new DiscordClient();
client.login(process.env.BOT_TOKEN);
