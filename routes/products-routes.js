const express = require("express");
//importing check as object desctructuring
const { check } = require("express-validator");
//notice that router below is will be completed with specified in app.js
const router = express.Router();
const HttpError = require("../models/http-error");

const ProductControllers = require("../controllers/products-controllers");

// post and patch routes ========>
router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("type").not().isEmpty(),
    check("description").isLength({ min: 10 }),
    check("price").not().isEmpty().isNumeric(),
    check("category").not().isEmpty(),
    check("stock").not().isEmpty().isNumeric(),
    check("colors").not().isEmpty(),
    check("design").not().isEmpty(),
    check("fabric").not().isEmpty(),
    check("images").not().isEmpty(),
  ],
  ProductControllers.createProduct
);

router.patch(
  "/:pId",
  [
    check("name").not().isEmpty(),
    // check("type").not().isEmpty(),
    check("description").isLength({ min: 10 }),
    // check("price").not().isEmpty().isNumeric(),
    // check("category").not().isEmpty(),
    // check("stock").not().isEmpty().isNumeric(),
    // check("colors").not().isEmpty(),
    // check("design").not().isEmpty(),
    // check("fabric").not().isEmpty(),
    // check("images").not().isEmpty(),
  ],
  ProductControllers.updateProduct
);

// get routes =======>
//route to get product by category

router.get("/categorias/:category", ProductControllers.getProductByCategory);

//route to get product by Id

router.get("/:pId", ProductControllers.getProductById);

module.exports = router;
