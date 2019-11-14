const express = require('express');
const cors = require('cors');
const user = require('../controllers/user.controller');

const router = express.Router();

router.use(cors({ origin: '*' }));

// Create a new user if the email doesn't already exist
router.post('/register', user.create);

// Retrieve user with userId
router.get('/info/:userId', user.getInfoById);

// Update an existing user with userId
router.put('/:userId', user.updateById);

// Delete an existing user with userId
router.delete('/:userId', user.deleteById);

// Returns an authorization JWT
router.post('/login', user.login);

// Protected route, checks Authorization header
router.get('/private', user.getSensibleInformation);

module.exports = router;
