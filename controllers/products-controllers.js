//controller of all middleware functions required by product-routes.js

const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Product = require("../models/product");

// constroller for post route to create a new product
const createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Datos incorrectos", 422));
  }
  //use object desctructuring to get data from from req.body
  const {
    name,
    type,
    description,
    price,
    category,
    stock,
    colors,
    design,
    fabric,
    discount,
    images,
  } = req.body;

  const createdProduct = new Product({
    name,
    type,
    description,
    price,
    category,
    stock,
    colors,
    design,
    fabric,
    discount,
    images,
  });
  try {
    await createdProduct.save();
  } catch (err) {
    const error = new HttpError(
      "No fue posible agregar el producto, intenta de nuevo.",
      500
    );
    return next(error);
  }
  res.status(201).json({
    message: " Producto guardado en base de datos",
    product: createdProduct.name,
  });
};

//constrollers to get routs

//get product by ID

const getProductById = async (req, res, next) => {
  const productId = req.params.pId; //the category will be comming from URL
  let product;

  try {
    product = await Product.findById(productId); // no promise is returned
  } catch (err) {
    const error = new HttpError(
      "Algo salio mal, por favor revisa tus datos de busqueda",
      500
    );
    return next(error);
  }
  if (!product) {
    const error = new HttpError(
      " no encontramos ningun producto que coicida con el ID",
      404
    );
    return next(error);
  }

  res.json({ product: product.toObject({ getters: true }) });
};

//get product by category
const getProductByCategory = async (req, res, next) => {
  const category = req.params.category; //the category will be comming from URL
  let products = [];

  try {
    products = await Product.find({ category: category });
  } catch (err) {
    const error = new HttpError(
      "Algo salio mal, por favor revisa tus datos de busqueda",
      500
    );
    return next(error);
  }

  if (!products || products.length === 0) {
    const error = new HttpError("Lo sentimos, no se encontro productos.", 404);
    return next(error);
  }
  res.json({
    count: products.length,
    products: products.map((product) => product.toObject({ getters: true })),
  });
};

const updateProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Algo salio mal, verifica los datos ", 500);
    return next(error);
  }

  const { name, description } = req.body;

  const productId = req.params.pId;

  let product;

  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      "Algo salio mal, no se encuentra el producto",
      500
    );
    return next(error);
  }

  product.name = name;
  product.description = description;

  try {
    await product.save();
  } catch (err) {
    const error = new HttpError(
      "Algo salio mal, no fue posible guardar los cambios",
      500
    );
    return next(error);
  }

  res.status(200).json({
    message: "Producto actualizado",
    product: product.toObject({ getters: true }),
  });
};

//exports
exports.createProduct = createProduct;
exports.getProductById = getProductById;
exports.getProductByCategory = getProductByCategory;
exports.updateProduct = updateProduct;
