const { createActor } = require("./actors");
const { createRepo } = require("./repos");

const events = async function getEvents(req, res) {
  try {
    let query =
      "SELECT events.id, events.created_at,events.event_type as type,repo.name as repo_name,repo.repo_url as repo_url,repo.id as repo_id,actors.avatar_url as avatar_url,actors.login as login, actors.id as actor_id FROM events LEFT JOIN actors on actors.id = events.actor_id LEFT JOIN repository as repo on repo.id=events.repo_id";
    db.query(query, function(err, rows) {
      // res.status(200).render("events", { title: "All Events", events: rows });
      const events = [];
      for (let e in rows) {
        let eArray = {
          id: rows[e].repo_id,
          type: rows[e].type,
          actor: {
            id: rows[e].actor_id,
            name: rows[e].login,
            avatar_url: rows[e].avatar_url
          },
          repo: {
            id: rows[e].repo_id,
            name: rows[e].repo_name,
            repo_url: rows[e].repo_url
          },
          created_at: rows[e].created_at
        };
        events.push(eArray);
      }
      res.send(events);

      if (!err) console.log("The solution is: ");
      else console.log("Error while performing Query.");
    });
  } catch (ex) {
    return ex;
  }
};
const createEvent = async function createevent(req, res) {
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
exports.getAllEvents = events;
exports.createEvent = createEvent;
