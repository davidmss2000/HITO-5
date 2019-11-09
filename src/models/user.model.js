const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  surname: String,
  email: {
    type: String,
    required: [true, 'required'],
    unique: [true, 'already exists'],
  },
  password: {
    type: String,
    required: [true, 'required'],
  },
  phoneNumber: {
    type: String,
    minlength: 9,
    maxlength: 9,
  },
  registerDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('User', UserSchema);
