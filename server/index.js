const auth = require('./routers/auth');
const users = require("./routers/users");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

mongoose
  .connect("mongodb://localhost/WorkoutDb")

  .then(() => console.log("Connected to Workout Db..."))
  .catch((err) => console.error("Could not connect to Workout DB..."));

app.use(express.json());
const corsOptions = {
  exposedHeaders: ["x-auth-token"],
  credentials: true,
  preflightContinue: true,
};
app.use(cors(corsOptions));

app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
