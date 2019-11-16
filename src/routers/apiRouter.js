const express = require("express");
let router = express.Router();
let dataHandler = require('../data-parse/dataHandler');

let workingData;

dataHandler.then((dd) => {
    workingData = dd;
});

router.get("/", function(req, res, next) {
    res.send("API is working properly");
});

router.get("/workers/names", function(req, res, next) {
    res.send(workingData.people.names);
});

router.get("/workers/uuids", function(req, res, next) {
    res.send(workingData.people.uids);
});

router.get("/workers", function(req, res, next) {
    res.send(workingData.workers);
});

router.get("/startdate", function(req, res, next) {
    res.send(workingData.startdate.format());
});

module.exports = router;
