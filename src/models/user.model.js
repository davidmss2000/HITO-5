const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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


UserSchema.pre('save', function callback(next) {
  if (this.password.isModified()) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  return next();
});

module.exports = mongoose.model('User', UserSchema);
