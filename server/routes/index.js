"use strict";

var userAPIRouter = require("./user");
    // roleAPIRouter = require("./role"),
    // assetsAPIRouter = require('./assets.js');

function register(app) {
    // app.use(["/api" + "/roles", "/roles"], roleAPIRouter);
    app.use(["/api" + "/users", "/users"], userAPIRouter);
    // app.use(["/api" + "/assets", "/assets"], assetsAPIRouter);
}

exports.register = register;
