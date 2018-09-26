const express = require("express");
const router = express.Router();
const { deleteEvents } = require("../controllers/events");
// Route related to delete events

// Fetching Events by Actor
router.delete("/", async (req, res) => {
  await deleteEvents(req, res);
});

module.exports = router;
