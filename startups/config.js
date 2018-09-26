const config = require("config");

module.exports = function() {
  if (!config.get("db.host")) {
    throw new Error("FATAL ERROR: Database connection is not defined");
  }
};
