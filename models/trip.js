const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  trip_id: {
    type: String,
    required: true,
  },
  driver: String,
  vehicle: String,
  vehicle2: String,
  qty: Number,
  start_timestamp: Timestamp,
  end_timestamp: Timestamp,
});

tripSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Trip", tripSchema);
