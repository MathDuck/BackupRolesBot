const Database = require("../database/databaseConnection");

module.exports = {
  createDefaultTable: function () {
    Database.getConnector()
      .prepare(
        `CREATE TABLE IF NOT EXISTS guilds (guild_id TEXT PRIMARY KEY, prefix TEXT DEFAULT '??')`
      )
      .run();
  },
};
