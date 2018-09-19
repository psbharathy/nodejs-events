var express = require("express");
var router = express.Router();
const { getAllActors, updateActor } = require("../controllers/actors");
// Routes related to actor.
// Routes related to event
router.get("/", async (req, res) => {
  getAllActors(req, res);
});

router.put("/", async (req, res) => {
  updateActor(req, res);
});

module.exports = router;
