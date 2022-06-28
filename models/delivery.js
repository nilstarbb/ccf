const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  trip_id: {
    type: String,
    required: true,
  },
  delivery_id: {
    type: String,
    required: true,
  },
  location: String,
  city: String,
  qty_delivered: Number,
});

deliverySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Delivery", deliverySchema);
