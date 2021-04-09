const SQLite = require("better-sqlite3");
const db = new SQLite("./data/db.sqlite", {
  verbose: null,
});

module.exports = {
  getConnector: function () {
    return db;
  },
};
