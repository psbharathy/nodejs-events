const {
  addEvent,
  getEvent,
  getEvents,
  getEventsByActor,
  deleteEvent,
  validateEvent,
  eventTransformers
} = require("../models/event");

const { findActor, createActor, deleteActor } = require("../models/actor");
const { findRepo, createRepo, deleteRepo } = require("../models/repo");

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

    event = await addEvent(req.body);
    console.log(event);
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
    if (events.length === 0) {
      return res
        .status(404)
        .send("The events with the given actor ID was not found.");
    }
    return res.send(eventTransformers(events));
  } catch (ex) {
    return ex;
  }
};

exports.deleteEvents = async (req, res) => {
  try {
    await deleteActor();
    await deleteRepo();
    const isDeleted = await deleteEvent();
    return res.send(isDeleted).status(200);
  } catch (ex) {
    return ex;
  }
};
