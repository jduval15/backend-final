const { getAll, create, getOne, remove, update, setImages } = require('../controllers/product.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const rateLimit = require('express-rate-limit');

const routerProduct = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

routerProduct.route('/')
  .get(getAll)
  .post(limiter, verifyJWT, create);

routerProduct.route('/:id/images')
  .post(verifyJWT, limiter, setImages)

routerProduct.route('/:id')
  .get(limiter, getOne)
  .delete(limiter, verifyJWT, remove)
  .put(limiter, verifyJWT, update);

module.exports = routerProduct;