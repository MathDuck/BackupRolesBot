const Database = require("../database/databaseConnection");

module.exports = {
  createDefaultTable: function () {
    Database.getConnector()
      .prepare(
        `CREATE TABLE IF NOT EXISTS guilds (guild_id TEXT PRIMARY KEY, guild_name TEXT DEFAULT '', prefix TEXT DEFAULT '??')`
      )
      .run();
    Database.getConnector()
      .prepare(
        `CREATE TABLE IF NOT EXISTS guild_roles (guild_id TEXT, user_id TEXT, role_id TEXT DEFAULT '')`
      )
      .run();
  },
};
