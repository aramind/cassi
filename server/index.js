const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");

// env
dotenv.config();
const { PORT = 3001, MONGO_CONNECT: DB } = process.env;

const app = express();

// CORS
app.use(cookieParser());
app.use(cors());
app.use([helmet(), express.json()]);
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "../client/build")));

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
