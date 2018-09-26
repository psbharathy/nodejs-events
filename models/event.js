const Joi = require("joi");
const mysql = require("mysql2");

async function addEvent(event) {
  return new Promise((resolve, reject) => {
    let sql =
      "INSERT INTO `events` (`id`,`event_type`, `actor_id`, `repo_id`, `created_at`) VALUES (?,?,?,?,?) ";
    let eventData = [
      event.id,
      event.type,
      event.actor.id,
      event.repo.id,
      event.created_at
    ];
    db.execute(sql, eventData, function(err, result) {
      if (err) reject(new Error(err));
      resolve(result);
    });
  });
}

async function getEventById(eventId) {
  return new Promise((resolve, reject) => {
    let query =
      "SELECT events.id, events.created_at,events.event_type as type,repo.name as repo_name,repo.repo_url as repo_url,repo.id as repo_id,actors.avatar_url as avatar_url,actors.login as login, actors.id as actor_id FROM events LEFT JOIN actors on actors.id = events.actor_id LEFT JOIN repository as repo on repo.id=events.repo_id where events.id=?";

    db.execute(query, [eventId], function(err, result) {
      if (err) reject(new Error(err));
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

async function deleteEvent() {
  return new Promise((resolve, reject) => {
    let query = "DELETE FROM events";
    db.execute(query, function(err, result) {
      if (err) reject(new Error(err));
      resolve(result);
      // console.log(" Events Deleted !");
    });
  });
}

function validateEvent(event) {
  const schema = {
    id: Joi.number().required(),

    type: Joi.string()
      .min(5)
      .max(255),
    actor: Joi.object().keys({
      id: Joi.number(),
      login: Joi.string()
        .min(5)
        .max(255)
        .required(),
      avatar_url: Joi.string()
        .uri()
        .trim()
        .required()
    }),
    repo: Joi.object().keys({
      id: Joi.number(),
      name: Joi.string()
        .min(5)
        .max(255)
        .required(),
      url: Joi.string()
        .uri()
        .trim()
        .required()
    }),
    created_at: Joi.date().required()
  };
  return Joi.validate(event, schema);
}

function eventTransformers(eventData) {
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
exports.getEventById = getEventById;
exports.getEvents = getEvents;
exports.getEventsByActor = getEventsByActor;
exports.deleteEvent = deleteEvent;
exports.validateEvent = validateEvent;
exports.eventTransformers = eventTransformers;
