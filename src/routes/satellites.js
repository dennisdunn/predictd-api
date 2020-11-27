const express = require("express");
const router = express.Router();

const { endpoint } = require("../settings");
const udp = require("../udp");
const as = require("../as");

router.get("/satellites", (req, res) => {
  udp(endpoint.host, endpoint.port, "GET_LIST").then((data) =>
    res.json(as.array(data))
  );
});

router.get("/satellites/:name", (req, res) => {
  udp(endpoint.host, endpoint.port, `GET_SAT ${req.params.name}`).then((data) =>
    res.json(
      as.obj(data, [
        "name",
        "longitude",
        "latitude",
        "azimuth",
        "elevation",
        "nextEvent",
        "footprint",
        "range",
        "altitude",
        "velocity",
        "orbitNum",
        "visibility",
        "orbitalPhase",
        "eclipse",
        "squint",
      ])
    )
  );
});

router.get("/satellites/:name/doppler", (req, res) => {
  udp(
    endpoint.host,
    endpoint.port,
    `GET_DOPPLER ${req.params.name}`
  ).then((data) => res.json(as.scalar(data)));
});

router.get("/satellites/:name/tle", (req, res) => {
  udp(endpoint.host, endpoint.port, `GET_TLE ${req.params.name}`).then((data) =>
    res.json(data.trim().split("\n"))
  );
});

router.get("/satellites/:name/position", (req, res) => {
  udp(
    endpoint.host,
    endpoint.port,
    `GET_SAT_POS ${req.params.name}`
  ).then((data) => res.json(data.trim().split("\n")));
});

router.get("/satellites/:name/predict/:start", (req, res) => {
  udp(
    endpoint.host,
    endpoint.port,
    `PREDICT ${req.params.name} ${req.params.start}`
  ).then((data) => res.json(data.trim().split("\n")));
});

router.get("/satellites/:name/predict", (req, res) => {
  udp(endpoint.host, endpoint.port, `PREDICT ${req.params.name}`).then((data) =>
    res.json(data.trim().split("\n"))
  );
});

module.exports = router;
