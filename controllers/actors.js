const {
  actorTransformers,
  getActors,
  findActor,
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

exports.findActor = async function(actorId) {
  const actor = await findActor(actorId);
  return res.send(actorTransformers(actor));
};

exports.updateActor = async (req, res) => {
  const actor = await updateActor(req.body);
  res.status(200).send({ msg: "Updated Sucessfully" });
};
