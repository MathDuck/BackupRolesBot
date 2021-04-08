const {
  AkairoClient,
  CommandHandler,
  ListenerHandler,
} = require("discord-akairo");
const { config } = require("dotenv");
const { join } = require("path");
config();

const createDefaultTableFactory = require("./factories/createDefaultTableFactory");
const serverQueryFactory = require("./factories/serverQueryFactory");

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
      directory: join(__dirname, "./commands/"),
      prefix: (message) => {
        let prefix = process.env.PREFIX;
        if (message.guild) {
          prefix = checkPrefix(message.guild.id);
        }
        return prefix;
      },
      defaultCooldown: 1000,
      ignoreCooldown: process.env.ownerID,
      allowMention: process.env.ALLOWMENTIONCOMMAND,
      handleEdits: true,
      commandUtil: true,
    }).loadAll();

    this.listenerHandler = new ListenerHandler(this, {
      directory: join(__dirname, "./listeners/"),
    });

    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.loadAll();
  }
}

const startBot = async () => {
  await new DiscordClient().login(process.env.BOT_TOKEN);
  createDefaultTableFactory.createDefaultTable();
};

startBot();

async function checkPrefix(guildId) {
  const dataExists = await serverQueryFactory.checkDataQuery().get(guildId);
  if (!dataExists) serverQueryFactory.buildDataQuery().run(guildId);
  const data = await serverQueryFactory.checkDataQuery().get(guildId);
  console.log(data.prefix);
  return data.prefix;
}
