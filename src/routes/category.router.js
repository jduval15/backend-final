const { getAll, create, remove } = require('../controllers/category.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const rateLimit = require('express-rate-limit');

const routerCategory = express.Router();

routerCategory.route('/')
  .get(getAll)
  .post(verifyJWT, create);

const deleteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
});

routerCategory.route('/:id')
  .delete(verifyJWT, deleteLimiter, remove)

module.exports = routerCategory;