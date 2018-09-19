var express = require("express");
const { deleteEvents } = require("../controllers/events");
var router = express.Router();

// Route related to delete events

// Fetching Events by Actor
router.delete("/", async (req, res) => {
  deleteEvents(req, res);
});

module.exports = router;
