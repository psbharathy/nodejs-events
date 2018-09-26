const {
  actorTransformers,
  getActors,
  findActor,
  getActorStreak,
  updateActor
} = require("../models/actor");

exports.getActors = async (req, res) => {
  try {
    const actors = await getActors();
    return res.send(actorTransformers(actors));
  } catch (ex) {
    return ex;
  }
};

exports.findActor = async actorId => {
  const actor = await findActor(actorId);
  return res.send(actorTransformers(actor));
};

exports.getActorStreak = async (req, res) => {
  const actors = await getActorStreak();
  return res.send(actorTransformers(actors));
};

exports.updateActor = async (req, res) => {
  const actor = await updateActor(req.body);
  res.status(200).send({ msg: "Updated Sucessfully" });
};
