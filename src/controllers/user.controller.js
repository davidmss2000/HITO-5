const bcrypt = require('bcrypt');
const User = require('../models/user.model.js');
const auth = require('../middleware/auth.js');

function create(req, res) {
  // Create the new User
  const user = new User(req.body);

  // Save User in the database
  user.save((err, obj) => {
    if (err !== null) res.status(400).send({ err: err.message });
    else res.status(201).send({ obj });
  });
}

function getInfoById(req, res) {
  // Find by _id
  User.findOne({ _id: req.params.userId }, (err, obj) => {
    if (err !== null) res.status(500).send({ err: err.message });
    else if (obj === null) res.status(404).send({ err: 'user not found' });
    else res.status(200).send(obj);
  });
}

function updateById(req, res) {
  // Update user by _id
  User.updateOne({ _id: req.params.userId }, req.body, (err, obj) => {
    if (err !== null) res.status(500).send({ err: err.message });
    else if (obj.n === 0) res.status(404).send({ err: 'user not found' });
    else res.status(200).send(obj);
  });
}

function deleteById(req, res) {
  // Deleta by _id
  User.findOneAndDelete({ _id: req.params.userId }, (err, obj) => {
    if (err !== null) res.status(500).send({ err: err.message });
    else if (obj === null) res.status(404).send({ err: 'user not found' });
    else res.status(200).send(obj);
  });
}

function login(req, res) {
  const { password } = req.body;
  const { email } = req.body;

  if (password === undefined || email === undefined) res.status(400).send({ err: 'email and password needed' });
  else {
    User.findOne({ email }, (err, obj) => {
      if (err !== null) res.status(500).send({ err: err.message });
      else if (obj === null) res.status(404).send({ err: 'email not found' });
      else if (bcrypt.compareSync(password, obj.password)) {
        res.status(200).send({ token: auth.createToken(obj) });
      } else res.status(400).send({ err: 'wrong password' });
    });
  }
}

function getSensibleInformation(req, res) {
  // Protected route, only if a good token is provided
  const token = req.headers.authorization;
  if (token === undefined) res.status(401).send({ err: 'unauthorized' });
  else {
    const verify = auth.verifyToken(token);
    if (verify.err !== undefined) res.status(500).send(verify);
    else res.status(200).send(verify);
  }
}

module.exports = {
  create,
  getInfoById,
  updateById,
  deleteById,
  login,
  getSensibleInformation,
};
