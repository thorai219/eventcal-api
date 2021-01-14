const express = require("express");
const ExpressError = require("../helpers/ExpressError");
const router = express.Router();
const EventsApi = require("../data/EventsApi");

router.get("/", async (req, res, next) => {
  try {
    let { date } = req.query;
    let result = await EventsApi.searchEvents(date);
    return res.json({ result });
  } catch (err) {
    console.error(err.message);
    return next(err);
  }
});

router.get("/categories", async (req, res, next) => {
  try {
    let result = await EventsApi.getCategoryList();
    return res.json({ result });
  } catch (err) {
    console.error(err.message);
    return next(err);
  }
});

module.exports = router;
