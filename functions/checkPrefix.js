const serverQueryFactory = require("../factories/serverQueryFactory");

module.exports = {
  check: async function (guildId) {
    const dataExists = await serverQueryFactory.checkDataQuery().get(guildId);
    if (!dataExists) serverQueryFactory.buildDataQuery().run(guildId);
    const data = await serverQueryFactory.checkDataQuery().get(guildId);
    return data.prefix;
  },
};
