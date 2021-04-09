const Database = require("../database/databaseConnection");

module.exports = {
  checkUserRolesQuery: function () {
    return Database.getConnector().prepare(
      "SELECT * FROM guild_roles WHERE guild_id = ? AND user_id = ?"
    );
  },
  addRolestoDatabaseQuery: function () {
    return Database.getConnector().prepare(
      "INSERT INTO guild_roles (guild_id, user_id, role_id) VALUES (?, ?, ?)"
    );
  },
  removeRolestoDatabaseQuery: function () {
    return Database.getConnector().prepare(
      "DELETE FROM guild_roles WHERE guild_id = ? AND user_id = ? AND role_id = ? LIMIT 1"
    );
  },
  purgeRolestoDatabaseQuery: function () {
    return Database.getConnector().prepare(
      "DELETE FROM guild_roles WHERE guild_id = ? AND user_id = ?"
    );
  },
};
