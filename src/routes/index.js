const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.router');
const routerProduct = require('./product.router');
const routerCart = require('./cart.router');
const verifyJWT = require('../utils/verifyJWT');
const routerPurchase = require('./purchase.router');
const routerProductImg = require('./productImg.router');
const RateLimit = require('express-rate-limit');
const router = express.Router();
// set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// colocar las rutas aquí
router.use('/users', routerUser)
router.use('/categories', routerCategory)
router.use('/products', routerProduct)
router.use('/cart', limiter, verifyJWT, routerCart)
router.use('/purchase', limiter, verifyJWT, routerPurchase)
router.use('/product_images', routerProductImg)

module.exports = router;