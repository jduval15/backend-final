const { getAll, create, getOne, remove, update, setImages } = require('../controllers/product.controllers');
const express = require('express');
const rateLimit = require('express-rate-limit');
const verifyJWT = require('../utils/verifyJWT');

const routerProduct = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

routerProduct.route('/')
  .get(getAll)
  .post(verifyJWT, create);

routerProduct.route('/:id/images')
  .post(verifyJWT, setImages)

routerProduct.route('/:id')
  .get(getOne)
  .delete(verifyJWT, limiter, remove)
  .put(verifyJWT, update);

module.exports = routerProduct;