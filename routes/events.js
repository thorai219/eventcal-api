const express = require("express");
const ExpressError = require("../helpers/ExpressError");
const router = express.Router();
const Event = require("../models/event");
const { validate } = require("jsonschema");
const { eventNewSchema } = require("../schemas");

// get list of events on specific date
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

//create an event
router.post("/", async (req, res, next) => {
  try {
    const validation = validate(req.body, eventNewSchema);
    if (!validation.valid) {
      return next({
        status: 400,
        message: validation.errors.map((e) => e.stack),
      });
    }

    const newEvent = await Event.createEvent(req.body);
    return res.status(201).json({ newEvent });
  } catch (err) {
    return next(err);
  }
});

// get list of attendees of an event with event id
router.get("/:id/attendees", async (req, res, next) => {
  try {
    let event_id = req.params.id;
    let result = await Event.getAttendees(event_id);
    return res.json({ result });
  } catch (err) {
    return next(err);
  }
});

// get list of invitees of an event with username
router.get("/:id/:username/invitees", async (req, res, next) => {
  try {
    let { id, username } = req.params;
    let result = await Event.getInvites(id, username);
    console.log(id, username);
  } catch (err) {
    return next(err);
  }
});

// get vacation details

module.exports = router;
