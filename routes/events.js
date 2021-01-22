const express = require("express");
const ExpressError = require("../helpers/ExpressError");
const router = express.Router();
const Event = require("../models/event");

router.get("/", async (req, res, next) => {
  try {
    let { date } = req.query;
    let result = await Event.getEvents(date);
    return res.json({ result });
  } catch (err) {
    console.error(err.message);
    return next(err);
  }
});

module.exports = router;
