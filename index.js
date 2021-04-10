const {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler,
} = require("discord-akairo");
const { config } = require("dotenv");
const { join } = require("path");
config();

const checkPrefix = require("./functions/checkPrefix");
const createDefaultTableFactory = require("./factories/createDefaultTableFactory");

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
          activity: { name: process.env.CUSTOM_STATUS, type: "WATCHING" },
          status: "online",
        },
      }
    );

    this.commandHandler = new CommandHandler(this, {
      directory: join(__dirname, "./commands/"),
      prefix: (message) => {
        let prefix = process.env.PREFIX;
        if (message.guild) {
          prefix = checkPrefix.check(message.guild.id);
        }
        return prefix;
      },
      defaultCooldown: 1000,
      ignoreCooldown: process.env.ownerID,
      allowMention: process.env.ALLOWMENTIONCOMMAND,
      handleEdits: true,
      commandUtil: true,
    }).loadAll();

    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: join(__dirname, "./inhibitors/"),
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: join(__dirname, "./listeners/"),
    });

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler,
      listenerHandler: this.listenerHandler,
    });

    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.loadAll();

    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.inhibitorHandler.loadAll();
  }
}

const startBot = async () => {
  await new DiscordClient().login(process.env.BOT_TOKEN);
  createDefaultTableFactory.createDefaultTable();
};

startBot();
