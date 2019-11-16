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
    res.send(workingData.people.uuids);
});

router.get("/workers", function(req, res, next) {
    res.send(workingData.workers);
});

router.get("/workers/:uid", function(req, res, next) {
    let uuid = req.params.uid
    let ans = workingData.workers.filter(w => w.uuid == uuid);
    if (ans.length == 0) res.send("Invalid UUID")
    else res.send(ans[0]);
});

router.get("/workers/:uid/calendar", function(req, res, next) {
    let uuid = req.params.uid
    let ans = workingData.workers.filter(w => w.uuid == uuid);
    if (ans.length == 0) res.send("Invalid UUID")
    else {
        res.type('.ics')

        res.send(ans[0].calendar.toString())
        };
    console.log(ans[0].calendar.toString())
});

router.get("/abbreviations", function(req, res, next) {
    res.send(workingData.abbreviations);
});

router.get("/abbreviations/:abb", function(req, res, next) {
    res.send(workingData.abbreviations[req.params.abb.toUpperCase()]);
});

router.get("/startdate", function(req, res, next) {
    res.send(workingData.startdate.format());
});

module.exports = router;
