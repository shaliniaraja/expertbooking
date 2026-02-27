const Booking = require("../models/Booking");
const Expert = require("../models/Expert"); // make sure Expert model is imported

/* POST /bookings */
exports.createBooking = async (req, res) => {
  try {
    const { expertId, date, timeSlot } = req.body;

    // 1️ Find Expert
    const expert = await Expert.findById(expertId);
    if (!expert) {
      return res.status(404).json({ message: "Expert not found" });
    }

    // 2️ Check if Date exists
    const selectedDate = expert.availableSlots.find(
      (slot) => slot.date === date
    );

    if (!selectedDate) {
      return res.status(400).json({ message: "Invalid date selected" });
    }

    // 3️ Check if Time exists inside that date
    if (!selectedDate.timeSlots.includes(timeSlot)) {
      return res.status(400).json({ message: "Invalid time slot selected" });
    }

    // 4️ Check if already booked
    const existingBooking = await Booking.findOne({
      expertId,
      date,
      timeSlot,
    });

    if (existingBooking) {
      return res.status(409).json({ message: "Slot already booked" });
    }

    // 5️ Create Booking
    const booking = await Booking.create(req.body);

    // 6️ Emit Socket.io event
    const io = req.app.get("io"); // get io instance from server
    io.emit("slotBooked", { expertId, date, timeSlot }); // send event to all clients

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getBookingsByEmail = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* PATCH /bookings/:id/status */
exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (req.body.role !== "expert") {
      return res.status(403).json({ message: "Only expert can accept booking" });
    }

    booking.status = req.body.status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};