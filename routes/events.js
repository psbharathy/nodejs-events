var express = require("express");
const {
  getAllEvents,
  createEvent,
  getActorsEvent,
  deleteEvents
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
  getActorsEvent(req.params.actor, req, res);
});

// Fetching Events by Actor
router.delete("/erase", async (req, res) => {
  deleteEvents(req, res);
});

module.exports = router;
