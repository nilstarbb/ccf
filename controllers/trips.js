const csvtojson = require("csvtojson");

const tripsRouter = require("express").Router();
const Trip = require("../models/trip");

tripsRouter.get("/", async (request, response) => {
  const trips = await Trip.find({});
  response.json(trips);
});

tripsRouter.post("/reset", async (request, response) => {
  await Trip.deleteMany({});
  response.status(204).end();
});

tripsRouter.post("/init", async (request, response) => {
  const fileName = "data/trips.csv";
  var arrayToInsert = [];
  csvtojson()
    .fromFile(fileName)
    .then((source) => {
      for (var i = 0; i < source.length; i++) {
        var oneRow = {
          trip_id: source[i]["trip_id"],
          driver: source[i]["driver"],
          vehicle: source[i]["vehicle"],
          vehicle2: source[i]["vehicle2"],
          qty: source[i]["qty"],
          start_timestamp: source[i]["start_timestamp"],
          end_timestamp: source[i]["end_timestamp"],
        };
        arrayToInsert.push(oneRow);
      }
      Trip.insertMany(arrayToInsert);
      response.status(201).end();
    });
});

tripsRouter.get("/:id", async (request, response) => {
  const trip = await Trip.findOne({ trip_id: request.params.id });
  if (trip) {
    response.json(trip.toJSON());
  } else {
    response.status(404).json({ error: "trip not found" });
  }
});

module.exports = tripsRouter;
