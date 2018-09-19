const { createActor } = require("./actors");
const { createRepo } = require("./repos");

const events = async (req, res) => {
  try {
    let query =
      "SELECT events.id, events.created_at,events.event_type as type,repo.name as repo_name,repo.repo_url as repo_url,repo.id as repo_id,actors.avatar_url as avatar_url,actors.login as login, actors.id as actor_id FROM events LEFT JOIN actors on actors.id = events.actor_id LEFT JOIN repository as repo on repo.id=events.repo_id";
    db.query(query, function(err, rows) {
      // res.status(200).render("events", { title: "All Events", events: rows });
      const events = eventTransformers(rows);

      res.send(events);

      if (!err) console.log("The solution is: ");
      else console.log("Error while performing Query.");
    });
  } catch (ex) {
    return ex;
  }
};
const createEvent = async (req, res) => {
  // console.log(req.body);
  actor = createActor(req.body.actor);
  console.log(actor);
  // repo = createRepo(req.body.repo);
  var sql =
    "INSERT INTO events (event_type, actor_id, repo_id, created_at) VALUES (?,?,?,?) ";
  let records = [
    req.body.type,
    req.body.actor.id,
    req.body.repo.id,
    req.body.created_at
  ];
  console.log(records);
  // await db.execute(sql, records, function(err, result) {
  //   if (err) throw err;
  //   console.log("1 record inserted, ID: " + result.insertId);
  // });
  res.send(req.body);
};

const getActorsEvent = async (actorId, req, res) => {
  console.log("Actors Event");

  try {
    let query =
      "SELECT events.id, events.created_at,events.event_type as type,repo.name as repo_name,repo.repo_url as repo_url,repo.id as repo_id,actors.avatar_url as avatar_url,actors.login as login, actors.id as actor_id FROM events LEFT JOIN actors on actors.id = events.actor_id LEFT JOIN repository as repo on repo.id=events.repo_id where events.actor_id = ? Order By events.id ASC";
    await db.query(query, [actorId], function(err, rows) {
      // res.status(200).render("events", { title: "All Events", events: rows });
      const events = eventTransformers(rows);

      res.send(events);

      if (!err) console.log("The solution is: ");
      else console.log("Error while performing Query.");
    });
  } catch (ex) {
    return ex;
  }
};

const deleteEvents = async (req, res) => {
  try {
    let query = " TRUNCATE TABLE events";
    let actQuery = " TRUNCATE TABLE actors";
    let repoQuery = " TRUNCATE TABLE repository";
    await db.execute(query, function(err, result) {
      if (err) throw err;
      console.log(" Events Records Deleted !");
    });
    await db.execute(actQuery, function(err, result) {
      console.log(" Actors Records Deleted !");
    });
    await db.execute(repoQuery, function(err, result) {
      console.log(" Repository Records Deleted !");
    });
    res.send(true);
  } catch (ex) {
    return ex;
  }
};

function eventTransformers(eventData) {
  const events = [];
  for (let e in eventData) {
    let eArray = {
      id: eventData[e].repo_id,
      type: eventData[e].type,
      actor: {
        id: eventData[e].actor_id,
        name: eventData[e].login,
        avatar_url: eventData[e].avatar_url
      },
      repo: {
        id: eventData[e].repo_id,
        name: eventData[e].repo_name,
        repo_url: eventData[e].repo_url
      },
      created_at: eventData[e].created_at
    };
    events.push(eArray);
  }
  return events;
}
exports.getAllEvents = events;
exports.createEvent = createEvent;
exports.getActorsEvent = getActorsEvent;
exports.deleteEvents = deleteEvents;
