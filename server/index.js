const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");

// routers
const authRouter = require("./src/routes/authRouter");
const houseRouter = require("./src/routes/houseRouter");
const houseOccupantRouter = require("./src/routes/houseOccupantRouter");
const trackerRouter = require("./src/routes/trackerRouter");
const announcementRouter = require("./src/routes/announcementRouter");
const taskRouter = require("./src/routes/taskRouter");

// configs
const credentials = require("./src/middlewares/credentials");
const corsOptions = require("./src/configs/corsOptions");

// env
dotenv.config();
const { PORT = 3001, MONGO_CONNECT: DB } = process.env;

const app = express();

// CORS
app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));
app.use([helmet(), express.json()]);
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "../client/build")));

app.use("/v1/auth", authRouter);
// authenticated routes
app.use("/v1/trackers", trackerRouter);
app.use("/v1/house", houseRouter);
app.use("/v1/house-occupant", houseOccupantRouter);
app.use("/v1/announcements", announcementRouter);
app.use("/v1/tasks", taskRouter);
// for the static site
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// if not found
app.use((req, res) =>
  res.status(404).json({ success: false, message: "Not found" })
);

const startServer = async () => {
  try {
    await mongoose.connect(DB);
    app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
