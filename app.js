var express = require("express");
var favicon = require("serve-favicon");

var app = express();
require("./startups/db")();
require("./startups/config")();
require("./startups/routes")(app);

const server = app.listen(5000, () => console.log(`Listening on port 5000...`));

module.exports = server;
module.exports = app;
