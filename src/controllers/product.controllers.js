const catchError = require('../utils/catchError');
const Product = require('../models/Product');
const Category = require('../models/Category');

const getAll = catchError(async (req, res) => {
  const { category } = req.query
  const where = {}
  if (category) where.categoryId = category

  /*const results = await Product.findAll({
    include: [Category],
    //where: { categoryId: category }
    where

  });
  return res.json(results);*/

  //VERSION ALTERNA

  Product.findAll({
    include: [Category],
    where
  })
    .then(results => {
      return res.json(results);
    })
    .catch(error => {
      return res.status(500).json({ message: 'Error when searching for products', error: error.message });
    });

});

const create = catchError(async (req, res) => {
  /*const result = await Product.create(req.body);
  return res.status(201).json(result);*/

  //VERSION ALTERNA

  Product.create(req.body)
    .then(result => {
      return res.status(201).json(result);
    })
    .catch(error => {
      return res.status(500).json({ message: 'Error creating product', error: error.message });
    });

});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  /*const result = await Product.findByPk(id, { include: [Category] });
  if (!result) return res.sendStatus(404);
  return res.json(result);*/

// VERSION ALTERNA

  Product.findByPk(id, { include: [Category] })
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.json(result);
    })
    .catch(() => {
      return res.status(500).json({ message: 'An error occurred while processing the request' });
    });

});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  /*await Product.destroy({ where: { id } });
  return res.sendStatus(204);*/

  //VERSION ALTERNA

  Product.destroy({ where: { id } })
    .then(() => {
      return res.sendStatus(204);
    })
    .catch(error => {
      return res.status(500).json({ message: 'Error deleting product', error: error.message });
    });

});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  /*const result = await Product.update(
    req.body,
    { where: { id }, returning: true }
  );
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);*/

    //VERSION ALTERNA

    Product.update(req.body, { where: { id }, returning: true })
    .then(result => {
      if (result[0] === 0) {
        return res.sendStatus(404);
      }
      return res.json(result[1][0]);
    })
    .catch(error => {
      return res.status(500).json({ message: 'Error updating product', error: error.message });
    });


});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update
}