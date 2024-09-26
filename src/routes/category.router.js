const { getAll, create, remove } = require('../controllers/category.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const rateLimit = require('express-rate-limit');

const routerCategory = express.Router();

const createCategoryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

routerCategory.route('/')
  .get(getAll)
  .post(createCategoryLimiter, verifyJWT, create);

const removeCategoryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

routerCategory.route('/:id')
  .delete(removeCategoryLimiter, verifyJWT, remove)

module.exports = routerCategory;