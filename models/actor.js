const mysql = require("mysql2");
const Joi = require("joi");

exports.findActor = async actorId => {
  return new Promise((resolve, reject) => {
    let query = "SELECT id, login, avatar_url FROM `actors` where id =?";
    db.query(query, [actorId], function(err, rows) {
      if (err) reject(new Error(" Actor Not Found"));
      resolve(rows);
    });
  });
};

exports.getActors = async actorId => {
  return new Promise((resolve, reject) => {
    let query = "SELECT id, login, avatar_url FROM `actors`";
    db.query(query, function(err, rows) {
      if (err) reject(new Error(" Actors Not Found"));
      resolve(rows);
    });
  });
};

exports.createActor = async actor => {
  return new Promise((resolve, reject) => {
    let sql = "INSERT INTO actors (id, login, avatar_url) VALUES (?,?,?)";
    let records = [actor.id, actor.login, actor.avatar_url];
    console.log(records);
    db.execute(sql, records, function(err, result) {
      if (err) reject(new Error(" Unable to create an actor!"));
      console.log(" Actor inserted, ID: " + result.insertId);
      resolve(result);
    });
  });
};

exports.getActorStreak = async () => {
  return new Promise((resolve, reject) => {
    let query =
      "select a.id, a.login,a.avatar_url, count(ev.actor_id) as actorCount,ev.created_at FROM `events` AS `ev`";
    query +=
      "LEFT JOIN actors as a on a.id = ev.actor_id group by ev.actor_id ORDER BY  actorCount DESC, ev.created_at DESC";
    db.query(query, function(err, rows) {
      if (err) reject(new Error(err));
      resolve(rows);
    });
  });
};

exports.updateActor = async actor => {
  return new Promise((resolve, reject) => {
    let query = "UPDATE  actors SET login = ?, avatar_url= ? WHERE id = ?";
    let Values = [actor.login, actor.avatar_url, actor.id];
    db.execute(query, Values, function(err, result) {
      if (err) throw err;
      // console.log(" Actor Updated Sucessfully " + result);
      resolve(result);
    });
  });
};

exports.actorTransformers = actorsData => {
  const actors = [];
  for (let e in actorsData) {
    let eArray = {
      id: actorsData[e].id,
      name: actorsData[e].login,
      avatar_url: actorsData[e].avatar_url
    };
    if (e.eventCount) e.push({ count: e.eventCount });
    actors.push(eArray);
  }
  return actors;
};
