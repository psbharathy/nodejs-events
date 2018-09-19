const mysql = require("mysql2");
const Joi = require("joi");
const { createActor, findActor } = require("./actor");

function addEvent(req) {
  return new Promise((resolve, reject) => {
    var sql =
      "INSERT INTO events (event_type, actor_id, repo_id, created_at) VALUES (?,?,?,?) ";
    let records = [
      req.body.type,
      req.body.actor.id,
      req.body.repo.id,
      req.body.created_at
    ];
    db.execute(sql, records, function(err, result) {
      if (err) reject(" Unable to create an Event!");
      resolve(result);
    });
  });
}

async function validateEvent(event) {
  const actor = await findActor(event.actor.id);
  console.log(actor);
  if (!actor) {
    throw "Invalid Actor";
  }
  const repos = await getRepositories(event.repo.id);
  console.log(repos);
  if (repos.length == 0) {
    throw "Invalid Repository";
  }
  return true;
}
exports.addEvent = addEvent;
exports.validateEvent = validateEvent;
