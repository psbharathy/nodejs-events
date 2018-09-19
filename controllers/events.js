const {
  addEvent,
  getEvent,
  getEvents,
  getEventsByActor,
  deleteEvent,
  validateEvent,
  eventTransformers
} = require("../models/event");

const events = async (req, res) => {
  try {
    const events = await getEvents();
    res.send(await eventTransformers(events));
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
    const events = await getEventsByActor(req.params.actor);
    res.send(await eventTransformers(events));
  } catch (ex) {
    return ex;
  }
};

const deleteEvents = async (req, res) => {
  try {
    res.send(await deleteEvent());
  } catch (ex) {
    return ex;
  }
};

exports.getAllEvents = events;
exports.createEvent = createEvent;
exports.getActorsEvent = getActorsEvent;
exports.deleteEvents = deleteEvents;
