const mysql = require("mysql2");
module.exports = function() {
  try {
    const db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "secret",
      database: "my_events"
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
