const { AkairoClient } = require("discord-akairo");
require("dotenv").config();

class DiscordClient extends AkairoClient {
  constructor() {
    super(
      {
        // Options for Akairo go here.
      },
      {
        disableEveryone: true,
        partials: ["MESSAGE", "CHANNEL", "REACTION"],
        presence: {
          activity: { name: "botActivityStatus", type: "WATCHING" },
          status: "online",
        },
      }
    );
  }
}

const client = new DiscordClient();
client.login(process.env.BOT_TOKEN);
