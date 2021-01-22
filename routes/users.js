const express = require("express");
const router = express.Router();

const { authRequired, correctUser } = require("../middleware/auth");
const User = require("../models/user");
const { validate } = require("jsonschema");

const { userNewSchema, userUpdateSchema } = require("../schemas");

const createToken = require("../helpers/createToken");

// implement find friends
// implment event invite function

router.post("/", async (req, res, next) => {
  try {
    delete req.body._token;
    const validation = validate(req.body, userNewSchema);

    if (!validation.valid) {
      return next({
        status: 400,
        message: validation.errors.map((e) => e.stack),
      });
    }

    const newUser = await User.register(req.body);
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});

router.patch("/:username", correctUser, async (req, res, next) => {
  try {
    if ("username" in req.body) {
      return next({ status: 400, message: "Not Allowed" });
    }

    await User.authenticate({
      username: req.params.username,
      password: req.body.password,
    });

    delete req.body.password;
    const validation = validate(req.body, userUpdateSchema);
    if (!validation.valid) {
      return next({
        status: 400,
        message: validation.error.map((e) => e.stack),
      });
    }

    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:username", correctUser, async (req, res, next) => {
  try {
    await User.remove(req.params.username);
    return res.json({ message: "user deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
