const { Listener } = require("discord-akairo");
const guildRoleQueryFactory = require("../factories/guildRoleQueryFactory");

class GuildMemberAddListener extends Listener {
  constructor() {
    super("guildMemberAdd", {
      emitter: "client",
      event: "guildMemberAdd",
    });
  }

  async exec(member) {
    if (member.user.bot) return;
    const data = guildRoleQueryFactory
      .checkUserRolesQuery()
      .all(member.guild.id, member.id);

    if (data) {
      data.forEach((role) => {
        const roleExists = member.guild.roles.cache.get(role.role_id);
        if (roleExists) {
          member.roles.add(role.role_id);
          guildRoleQueryFactory
            .removeRolestoDatabaseQuery()
            .run(member.guild.id, member.id, role.role_id);
        }
      });
      console.log(`Rôles de ${member.user.tag} restaurés.`);
    }
  }
}

module.exports = GuildMemberAddListener;
