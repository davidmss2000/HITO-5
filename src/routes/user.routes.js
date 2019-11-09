const express = require('express');
const user = require('../controllers/user.controller');

const router = express.Router();

// Create a new user if the email doesn't already exist
router.post('/', user.create);

// Retrieve user with userId
router.get('/:userId', user.getInfoById);

// Update an existing user with userId
router.put('/:userId', user.updateById);

// Delete an existing user with userId
router.delete('/:userId', user.deleteById);

module.exports = router;
