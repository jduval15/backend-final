const catchError = require('../utils/catchError');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")


const getAll = catchError(async (req, res) => {
  /*const results = await User.findAll();
  return res.json(results);*/

  //VERSION ALTERNA

  User.findAll()
    .then(results => {
      return res.json(results);
    })
    .catch(error => {
      return res.status(500).json({ message: 'Error searching for users', error: error.message });
    });


});

const create = catchError(async (req, res) => {
  /*const result = await User.create(req.body);
  return res.status(201).json(result);*/

  //VERSION ALTERNA

  User.create(req.body)
    .then(result => {
      return res.status(201).json(result);
    })
    .catch(error => {
      return res.status(500).json({ message: 'Error creating user', error: error.message });
    });

});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  /*await User.destroy({ where: { id } });
  return res.sendStatus(204);*/

  //VERSION ALTERNA

  User.destroy({ where: { id } })
    .then(() => {
      return res.sendStatus(204);
    })
    .catch(error => {
      return res.status(500).json({ message: 'Error deleting user', error: error.message });
    });


});

const update = catchError(async (req, res) => {
  const { id } = req.params;

  delete req.body.password
  delete req.body.email

  /*const result = await User.update(
    req.body,
    { where: { id }, returning: true }
  );
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);*/

    //VERSION ALTERNA

    User.update(req.body, { where: { id }, returning: true })
    .then(result => {
      if (result[0] === 0) {
        return res.sendStatus(404);
      }
      return res.json(result[1][0]);
    })
    .catch(error => {
      return res.status(500).json({ message: 'Error updating user', error: error.message });
    });

});

const login = catchError(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ where: { email } })
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) return res.status(401).json({ error: 'Invalid credentials' })
  //validar el password

  const token = jwt.sign(
    { user },
    process.env.TOKEN_SECRET,
    { expiresIn: "1d" }
  )
  return res.json({ user: user, token: token })

})

module.exports = {
  getAll,
  create,
  remove,
  update,
  login
}