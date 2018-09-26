const mysql = require("mysql2");
const config = require("config");
module.exports = function() {
  try {
    const db = mysql.createConnection({
      host: config.get("db.host"),
      user: config.get("db.user"),
      password: config.get("db.pass"),
      database: config.get("db.database")
    });

    // connect to database
    db.connect(err => {
      if (err) {
        throw err;
      }
      console.log("Connected to database");
    });
    global.db = db;
  } catch (ex) {
    console.log(ex);
  }
};
