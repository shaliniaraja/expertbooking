require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");               
const { Server } = require("socket.io"); 

const expertRoutes = require("./routes/expertRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
const server = http.createServer(app); 
const io = new Server(server, { cors: { origin: "*" } });
app.set("io", io);

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/experts", expertRoutes);
app.use("/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});


io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));