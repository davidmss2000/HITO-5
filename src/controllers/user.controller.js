// const bcrypt = require('bcrypt');
const User = require('../models/user.model.js');

function create(req, res) {
  // Create the User
  const user = new User(req.body);

  // Save User in the database
  user.save().then(
    (obj) => res.status(200).send({ message: 'User registered successfully', obj }),
  ).catch(
    (err) => res.status(500).send({ message: err }),
  );
}

function getInfoById(req, res) {
  User.findOne({ _id: req.params.userId }).then(
    (obj) => {
      if (obj == null) {
        // Doesn't exist
        res.status(404).send({ message: 'That user doesn\'t exists' });
      } else {
        // Send name, email and registration date
        res.status(200).send(obj);
      }
    },
  ).catch(
    () => res.status(404).send({ message: 'That user doesn\'t exists' }),
  );
}

function updateById(req, res) {
  // Update user
  User.updateOne({ _id: req.params.userId }, req.body).then(
    (obj) => res.status(200).send({ message: 'User updated successfully', obj }),
  ).catch(
    (err) => res.status(500).send({ message: 'There was an error processing your request', err }),
  );
}

function deleteById(req, res) {
  User.findOneAndDelete({ _id: req.params.userId }).then(
    (obj) => {
      if (obj == null) {
        // Doesn't exist
        res.status(400).send({ message: 'That user doesn\'t exists' });
      } else {
        res.status(200).send({ message: 'User deleted successfully' });
      }
    },
  ).catch(
    (err) => res.status(400).send({ message: err || 'That user doesn\'t exists' }),
  );
}

/*
WIP

function login(req, res) {
  const { password } = req.body;
  const { email } = req.body;
  User.findOne({ email }).then((response) => {
    if (response == null) {
      res.status(404).send({ message: 'this user doen\'t exist' });
    }

    // email exists, check pass and return user
    if (bcrypt.compareSync(password, response.password)) {
      res.status(200).send({ response });
    } else {
      res.status(500).send({ message: 'Wrong password' });
    }
  }).catch((err) => {
    res.status(500).send({ err });
  });
}
*/

function getSensibleInformation(req, res) {
  // Protected route, only if a good token is provided token
  res.status(500).send({ req, res });
}

module.exports = {
  create,
  getInfoById,
  updateById,
  deleteById,
  // WIP login,
  getSensibleInformation,
};
