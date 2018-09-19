const mysql = require("mysql2");
const Joi = require("joi");
const { getRepositories } = require("./repo");
const { createActor, findActor } = require("./actor");

function addEvent(req) {
  return new Promise((resolve, reject) => {
    let sql =
      "INSERT INTO events (event_type, actor_id, repo_id, created_at) VALUES (?,?,?,?) ";
    let eventData = [
      req.body.type,
      req.body.actor.id,
      req.body.repo.id,
      req.body.created_at
    ];
    db.execute(sql, eventData, function(err, result) {
      if (err) reject(" Unable to create an Event!");
      resolve(result);
    });
  });
}
async function getEventById(eventId) {
  return new Promise((resolve, reject) => {
    let query =
      "SELECT events.id, events.created_at,events.event_type as type,repo.name as repo_name,repo.repo_url as repo_url,repo.id as repo_id,actors.avatar_url as avatar_url,actors.login as login, actors.id as actor_id FROM events LEFT JOIN actors on actors.id = events.actor_id LEFT JOIN repository as repo on repo.id=events.repo_id where events.id=?";

    db.execute(query, [eventId], function(err, result) {
      if (err) reject(" Event Not found !");
      resolve(result);
    });
  });
}

async function getEvents() {
  return new Promise((resolve, reject) => {
    let query =
      "SELECT events.id, events.created_at,events.event_type as type,repo.name as repo_name,repo.repo_url as repo_url,repo.id as repo_id,actors.avatar_url as avatar_url,actors.login as login, actors.id as actor_id FROM events LEFT JOIN actors on actors.id = events.actor_id LEFT JOIN repository as repo on repo.id=events.repo_id";

    db.execute(query, function(err, result) {
      if (err) reject(" Event Not found !");
      resolve(result);
    });
  });
}

async function getEventsByActor(actor) {
  return new Promise((resolve, reject) => {
    let query =
      "SELECT events.id, events.created_at,events.event_type as type,repo.name as repo_name,repo.repo_url as repo_url,repo.id as repo_id,actors.avatar_url as avatar_url,actors.login as login, actors.id as actor_id FROM events LEFT JOIN actors on actors.id = events.actor_id LEFT JOIN repository as repo on repo.id=events.repo_id where events.actor_id = ? Order By events.id ASC";
    db.execute(query, [actor], function(err, result) {
      if (err) reject(" Event Not found !");
      resolve(result);
    });
  });
}
async function deleteEvent(event) {
  return new Promise((resolve, reject) => {
    let query = " TRUNCATE TABLE events";
    let actQuery = " TRUNCATE TABLE actors";
    let repoQuery = " TRUNCATE TABLE repository";
    db.execute(query, function(err, result) {
      if (err) reject("Unable to delete an Event !");
      resolve(result);
      console.log(" Events Records Deleted !");
    });
    db.execute(actQuery, function(err, result) {
      if (err) reject("Unable to delete an actor !");
      console.log(" Actors Records Deleted !");
      resolve(result);
    });
    db.execute(repoQuery, function(err, result) {
      if (err) reject("Unable to delete an Repo !");
      console.log(" Repository Records Deleted !");
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

async function eventTransformers(eventData) {
  const events = [];
  for (let e in eventData) {
    let eArray = {
      id: eventData[e].id,
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

exports.addEvent = addEvent;
exports.getEvent = getEventById;
exports.getEvents = getEvents;
exports.getEventsByActor = getEventsByActor;
exports.deleteEvent = deleteEvent;
exports.validateEvent = validateEvent;
exports.eventTransformers = eventTransformers;
