const createActor = async actor => {
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
const actors = async (req, res) => {
  try {
    let query = "SELECT login, id , avatar_url FROM actors";
    db.query(query, function(err, rows) {
      const actors = actorTransformers(rows);
      res.send(actors);
      if (!err) console.log("The solution is: ");
      else console.log("Error while performing Query.");
    });
  } catch (ex) {
    return ex;
  }
};

function actorTransformers(actorsData) {
  const actors = [];
  for (let e in actorsData) {
    let eArray = {
      id: actorsData[e].id,
      name: actorsData[e].login,
      avatar_url: actorsData[e].avatar_url
    };
    actors.push(eArray);
  }
  return actors;
}
exports.createActor = createActor;
exports.getAllActors = actors;
