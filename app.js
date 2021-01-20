require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//local modules
const productRoutes = require('./routes/products-routes');
const usersRoutes = require('./routes/users-routes');



//Import Models here ===
const HttpError = require("./models/http-error");

//========

const username = process.env.DB_USER
const password = process.env.DB_PASS
const dbname= process.env.DB_NAME 
const dbUrl= `mongodb+srv://${username}:${password}@cluster0.1wlk1.mongodb.net/${dbname}?retryWrites=true&w=majority`


const app = express();
app.use(bodyParser.json());

//application routes

app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);

//middleware to handle error responses in unsopported routes
app.use((req, res, next) =>{
    const error = new HttpError("La ruta o URL especificado no existe.", 404);
    throw error;
});

//general applicatio error
app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "Error desconocido..." });
  });

  // use the connect method. this will return a promise as this is async task
mongoose
.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
//if connection is successful, we start the backend server
.then(() => {
  console.log("Connection to DB is established")
  app.listen(5000, () => {
    console.log("App listening on port 5000");
  });
})
.catch((err)=>{
  console.log(err);
});

