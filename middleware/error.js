module.exports = function(err, req, res, next) {
  console.log("error", err.message, err);
  // Loging Level
  //  Error
  //  warn
  //  info
  //  verbose
  //  debug
  //  silly

  // Console Exception
  res.status(500).send("Something failed!");
};
