const Expert = require("../models/Expert");
const Booking = require("../models/Booking");


exports.getExperts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // current page
    const limit = parseInt(req.query.limit) || 5; // items per page
    const search = req.query.search || ""; // search by name
    const category = req.query.category || ""; // filter by category

    // Build filter object
    const filter = {};
    if (search) filter.name = { $regex: search, $options: "i" }; // case-insensitive
    if (category) filter.category = category;

    const total = await Expert.countDocuments(filter);
    const experts = await Expert.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ total, page, limit, experts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET /experts/:id with available slots */
exports.getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);

    if (!expert) {
      return res.status(404).json({ message: "Expert not found" });
    }

    const bookings = await Booking.find({
      expertId: expert._id
    });

    const bookedSlots = bookings.map(b => ({
      date: b.date,
      timeSlot: b.timeSlot
    }));

    const updatedSlots = expert.availableSlots.map(day => {
      const filteredTimeSlots = day.timeSlots.filter(time =>
        !bookedSlots.some(
          b => b.date === day.date && b.timeSlot === time
        )
      );

      return {
        date: day.date,
        timeSlots: filteredTimeSlots
      };
    });

    res.json({
      ...expert.toObject(),
      availableSlots: updatedSlots
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};