var express = require("express");
const { getAllEvents, createEvent } = require("../controllers/events");
var router = express.Router();

// Routes related to event
router.get("/", async (req, res) => {
  getAllEvents(req, res);
});

// Routes related to event
router.post("/", async (req, res) => {
  createEvent(req, res);
});

module.exports = router;
