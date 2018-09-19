const mysql = require("mysql2");

function getActor(actorId) {
  return new Promise((resolve, reject) => {
    let query = "SELECT login, id , avatar_url FROM actors where id =?";
    const actor = db.query(query, [actorId], function(err, rows) {
      if (err) reject(new Error(" Actor Not Found"));
      if (rows.length > 0) resolve(rows);
    });
  });
}

exports.findActor = getActor;
