const express = require("express");
const { check } = require("express-validator");

const HttpError = require("../models/http-error");

const usersControllers = require("../controllers/users-controllers");
const router = require("./products-routes");

//path to /signup to the application
//using express-validator for post

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
    check("places").not().isEmpty(),
  ],
  usersControllers.signup
);

module.exports = router;
