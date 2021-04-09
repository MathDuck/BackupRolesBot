const SQLite = require("better-sqlite3");
const db = new SQLite("./data/db.sqlite", {
  verbose: console.log,
});

module.exports = {
  getConnector: function () {
    return db;
  },
};
