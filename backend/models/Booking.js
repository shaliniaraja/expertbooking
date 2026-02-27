const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userEmail: String,
  expertId: String,
  date: String,
  timeSlot: String,
  status: {
    type: String,
    default: "pending"
  }
});

module.exports = mongoose.model("Booking", bookingSchema);