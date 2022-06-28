const tripsRouter = require("express").Router();
const Trip = require("../models/trip");

tripsRouter.get("/", async (request, response) => {
  const trips = await Trip.find({});
  response.json(trips);
});

tripsRouter.get("/:id", async (request, response) => {
  const trip = await Trip.find({ trip_id: request.params.id });
  if (trip) {
    response.json(trip.toJSON());
  } else {
    response.status(404).json({ error: "trip not found" });
  }
});

module.exports = tripsRouter;
