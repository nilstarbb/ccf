const deliverysRouter = require("express").Router();
const Delivery = require("../models/delivery");

deliverysRouter.get("/", async (request, response) => {
  const deliverys = await Delivery.find({});
  response.json(deliverys);
});

deliverysRouter.get("/:id", async (request, response) => {
  const delivery = await Delivery.findById(request.params.id);
  if (delivery) {
    response.json(delivery.toJSON());
  } else {
    response.status(404).json({ error: "delivery not found" });
  }
});

deliverysRouter.post("/", async (request, response) => {
  if (!request.body.trip_id || !request.body.delivery_id) {
    response.status(400).end();
    return;
  }

  const delivery = new Delivery({
    trip_id: request.body.trip_id,
    delivery_id: request.body.delivery_id,
    location: request.body.location,
    city: request.body.city,
    qty_delivered: request.body.qty_delivered,
  });

  const deliverySaved = await delivery.save();

  response.status(201).json(deliverySaved);
});

deliverysRouter.delete("/:id", async (request, response) => {
  const delivery = await Delivery.findById(request.params.id);

  if (!delivery) {
    return response.status(404).json({ error: "delivery not found" });
  }

  await delivery.deleteOne();
  response.status(204).end();
});

module.exports = deliverysRouter;