const express = require('express');
const user = require('../controllers/user.controller');

const router = express.Router();

// Create a new user if the email doesn't already exist
router.post('/register', user.create);

// Login
router.post('/login', user.login);

// Retrieve user with userId
router.get('/info/:userId', user.getInfoById);

// Update an existing user with userId
router.put('/:userId', user.updateById);

// Delete an existing user with userId
router.delete('/:userId', user.deleteById);

// Protected route
router.get('/private', user.getSensibleInformation);

module.exports = router;
