const express = require("express");
const ExpressError = require("../helpers/ExpressError");
const router = express.Router();
const EventsApi = require("../data/EventsApi");

router.get("/", async (req, res, next) => {
  try {
    let { t } = req.params;
    console.log(t);
    let result = await EventsApi.searchEvents();
    return res.json({ result });
  } catch (err) {
    console.error(err.message);
    return next(err);
  }
});

module.exports = router;
