const express = require("express");
const ExpressError = require("../helpers/ExpressError");
const router = express.Router();

router.get("/", (req, res, next) => {
  return res.json({ msg: "hello" });
});

module.exports = router;
