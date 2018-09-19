const {
  addEvent,
  getEvent,
  validateEvent,
  eventTransformers
} = require("../models/event");

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

async function createEvent(req, res) {
  try {
    const isValid = await validateEvent(req.body);
    if (isValid) {
      let event = await addEvent(req, res);
      console.log(event.insertId);
      event = await getEvent(event.insertId);
      res.send(await eventTransformers(event));
    } else {
      res.send(isValid);
    }
  } catch (err) {
    res.status(400).send({ err });
  }
}
//

const getActorsEvent = async (req, res) => {
  console.log("Actors Event");

  try {
    let query =
      "SELECT events.id, events.created_at,events.event_type as type,repo.name as repo_name,repo.repo_url as repo_url,repo.id as repo_id,actors.avatar_url as avatar_url,actors.login as login, actors.id as actor_id FROM events LEFT JOIN actors on actors.id = events.actor_id LEFT JOIN repository as repo on repo.id=events.repo_id where events.actor_id = ? Order By events.id ASC";
    await db.query(query, [req.params.actor], function(err, rows) {
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

exports.getAllEvents = events;
exports.createEvent = createEvent;
exports.getActorsEvent = getActorsEvent;
exports.deleteEvents = deleteEvents;
