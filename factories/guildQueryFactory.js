const Database = require("../database/databaseConnection");

module.exports = {
  checkDataQuery: function () {
    return Database.getConnector().prepare(
      "SELECT * FROM guilds WHERE guild_id = ? LIMIT 1"
    );
  },

  buildDataQuery: function () {
    return Database.getConnector().prepare(
      "INSERT INTO guilds (guild_id, guild_name) VALUES (?, ?)"
    );
  },

  updatePrefixQuery: function () {
    return Database.getConnector().prepare(
      "UPDATE guilds SET prefix = ? WHERE guild_id = ? LIMIT 1"
    );
  },
};
