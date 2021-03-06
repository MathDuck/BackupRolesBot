const { Listener } = require("discord-akairo");
const serverQueryFactory = require("../factories/guildQueryFactory");
const dateFormat = require("../functions/dateFormat");

class GuildCreateListener extends Listener {
  constructor(client) {
    super("guildCreate", {
      emitter: "client",
      event: "guildCreate",
    });
    this.client = client;
  }

  async exec(guild) {
    if (!this.client.user.bot) return;

    const serverData = await serverQueryFactory.checkDataQuery().get(guild.id);
    if (!serverData) {
      serverQueryFactory.buildDataQuery().run(guild.id, guild.name);
    }
    console.log(
      `[${dateFormat.getDate(Date.now())}] Le bot a rejoint le serveur ${
        guild.name
      } (ID: ${guild.id}).`
    );
  }
}

module.exports = GuildCreateListener;
