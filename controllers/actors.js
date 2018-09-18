const createActor = async function createActor(actor) {
  // console.log(actor);
  var sql = "INSERT INTO actors (login, avatar_url,created_at) VALUES (?,?,?)";

  let records = [actor.login, actor.avatar_url, Date.now()];
  // console.log(records);
  let actorId = null;
  return await db.execute(sql, records, function(err, result) {
    if (err) throw err;
    actor = result.insertId;
    console.log(" Actor inserted, ID: " + result.insertId);
  });
};

exports.createActor = createActor;
