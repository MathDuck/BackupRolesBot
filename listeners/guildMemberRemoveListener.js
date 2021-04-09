const { Listener } = require("discord-akairo");
const guildRoleQueryFactory = require("../factories/guildRoleQueryFactory");

class GuildMemberRemoveListener extends Listener {
  constructor() {
    super("guildMemberRemove", {
      emitter: "client",
      event: "guildMemberRemove",
    });
  }

  async exec(member) {
    if (member.user.bot) return;
    const data = await guildRoleQueryFactory
      .checkUserRolesQuery()
      .get(member.guild.id, member.id);
    if (!data) {
      member.roles.cache.forEach((role) => {
        if (role.name === "@everyone") return;
        guildRoleQueryFactory
          .addRolestoDatabaseQuery()
          .run(member.guild.id, member.id, role.id);
      });
      console.log(
        `Rôles de ${member.user.tag} sauvegardés en base de données.`
      );
    } else {
      console.log(`Déjà en BDD.`);
    }
  }
}

module.exports = GuildMemberRemoveListener;
