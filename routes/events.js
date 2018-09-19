var express = require("express");
const {
  getAllEvents,
  createEvent,
  getActorsEvent
} = require("../controllers/events");
var router = express.Router();

// Routes related to event
router.get("/", async (req, res) => {
  getAllEvents(req, res);
});

// Routes related to Creating a Events
router.post("/", async (req, res) => {
  createEvent(req, res);
});
// Fetching Events by Actor
router.get("/actors/:actor", async (req, res) => {
  console.log(req.params.actor);
  getActorsEvent(req, res);
});

module.exports = router;
