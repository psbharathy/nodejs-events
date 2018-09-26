var express = require("express");
var router = express.Router();

const {
  getAllEvents,
  createEvent,
  getActorsEvent
} = require("../controllers/events");

// Routes related to event
router.get("/", async (req, res) => {
  await getAllEvents(req, res);
});

// Routes related to Creating a Events
router.post("/", async (req, res) => {
  return await createEvent(req, res);
});

// Fetching Events by Actor
router.get("/actors/:actor", async (req, res) => {
  await getActorsEvent(req, res);
});

module.exports = router;
