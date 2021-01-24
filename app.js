const express = require("express");
const morgan = require("morgan");
const ExpressError = require("./helpers/ExpressError");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

// routes imports
const eventRoute = require("./routes/events");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
// routes

app.use("/events", eventRoute);
app.use("/users", userRoute);
app.use("/login", authRoute);

app.use((req, res, next) => {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.error(err.stack);

  return res.json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
