var express = require("express");
var router = express.Router();
const { getAllActors } = require("../controllers/actors");
// Routes related to actor.
// Routes related to event
router.get("/", async (req, res) => {
  getAllActors(req, res);
});

module.exports = router;
