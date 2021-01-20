// this controller will have all middleware functions required by the users

const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/user");

const signup = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Hubo un error, por favor intenta despues",
      500
    );
    return next(error);
  }
  
  if (existingUser) {
    const error = new HttpError("El usuario ya existe, acceder", 422);
    return next(error);
  }

  createdUser = new User({
    name,
    email,
    password,
    role,
    image: "only for testing purposes",
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Error al crear usuario, intenta despues", 500);
    return next(error);
  }
  res.status(201).json({
    user: createdUser.toObject({ getters: true }),
    message: " Usuario creado.",
  });
};

exports.signup = signup;
