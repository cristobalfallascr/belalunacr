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

// constroller to login

const login = async (req, res, next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return next(new HttpError("Invalid credentials provided ", 401));
    }
    const { email, password } = req.body;
  
    let existingUser;
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      const error = new HttpError("Login, try again later", 500);
      return next(error);
    }
  
    if (!existingUser || existingUser.password !== password) {
      const error = new HttpError(" invalid credentials", 401);
      return next(error);
    }
  
    res.json({ message: "logged in successfully" });
  };
  

exports.signup = signup;
exports.login =login;
