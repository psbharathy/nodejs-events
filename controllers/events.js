const {
  addEvent,
  getEvent,
  getEvents,
  getEventsByActor,
  validateEvent,
  eventTransformers
} = require("../models/event");

const { findActor, createActor } = require("../models/actor");
const { findRepo, createRepo } = require("../models/repo");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await getEvents();
    res.send(eventTransformers(events));
  } catch (ex) {
    return ex;
  }
};

exports.createEvent = async (req, res) => {
  try {
    let actor, repo, event;
    const { error } = validateEvent(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    // fetch Actor or create
    actor = await findActor(req.body.actor.id);
    if (actor.length === 0) {
      await createActor(req.body.actor);
    }

    // fetch Repo or create
    repo = await findRepo(req.body.repo.id);
    if (repo.length === 0) {
      await createRepo(req.body.repo);
    }

    event = await addEvent(req, res);
    // event = await getEvent(event.insertId);
    return res.status(201).send({ msg: "success", event });
    // res.send(await eventTransformers(event));
  } catch (err) {
    return res.status(400).send({ err });
  }
};
//

exports.getActorsEvent = async (req, res) => {
  try {
    console.log("Actors Event");

    const events = await getEventsByActor(req.params.actor);
    return res.send(eventTransformers(events));
  } catch (ex) {
    return ex;
  }
};

exports.deleteEvents = async (req, res) => {
  try {
    res.send(await deleteEvent());
  } catch (ex) {
    return ex;
  }
};
