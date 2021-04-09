const { Command } = require("discord-akairo");
const serverQueryFactory = require("../../factories/guildQueryFactory");

class PrefixCommand extends Command {
  constructor() {
    super("prefix", {
      aliases: ["prefix"],
      category: "owner",
      cooldown: 5000,
      ratelimit: 2,
      args: [
        {
          id: "prefix",
          type: "string",
        },
      ],
    });
  }

  async exec(message, args) {
    if (message.deletable) message.delete();

    if (!args.prefix) {
      const checkServerData = await serverQueryFactory
        .checkDataQuery()
        .get(message.guild.id);

      return message
        .reply(
          `le préfixe actuel est \`${checkServerData.prefix}\`.\n\nPour changer le préfixe, merci d'en spécifier un nouveau en tant qu'argument. (Usage: ${checkServerData.prefix}prefix <Nouveau préfixe>)`
        )
        .then((m) => m.delete({ timeout: 10000 }));
    }

    message.channel
      .send(
        `Le nouveau préfixe pour les commandes est désormais \`${args.prefix}\`.`
      )
      .then((msg) => msg.delete({ timeout: 4000 }));

    serverQueryFactory.updatePrefixQuery().run(args.prefix, message.guild.id);
  }
}

module.exports = PrefixCommand;
