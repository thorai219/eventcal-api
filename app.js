const express = require("express");
const morgan = require("morgan");
const ExpressError = require("./helpers/ExpressError");

const app = express();

// routes imports
const userRoutes = require("./routes/users");

app.use(express.json());
app.use(morgan("tiny"));

// routes

app.use("/users", userRoutes);

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
