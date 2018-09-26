const express = require("express");
const router = express.Router();

const { getActors, updateActor } = require("../controllers/actors");
// Routes related to actor.
// Routes related to event
router.get("/", async (req, res) => {
  await getActors(req, res);
});

router.put("/", async (req, res) => {
  await updateActor(req, res);
});

module.exports = router;
