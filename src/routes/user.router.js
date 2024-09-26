const { getAll, create, getOne, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
const routerUser = express.Router();

routerUser.route('/')
  .get(limiter, verifyJWT, getAll)
  .post(create);

routerUser.route('/login')
  .post(login)

routerUser.route('/:id')
  .delete(limiter, verifyJWT, remove)
  .put(limiter, verifyJWT, update);

module.exports = routerUser;