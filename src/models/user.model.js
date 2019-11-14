/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.set('useCreateIndex', true);

const UserSchema = mongoose.Schema({
  name: String,
  surname: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
  this.password = bcrypt.hashSync(this.password, 10);
  return next();
});

UserSchema.pre('updateOne', function callback(next) {
  const newPass = this._update.password;
  if (newPass !== undefined) this._update.password = bcrypt.hashSync(newPass, 10);
  return next();
});

module.exports = mongoose.model('User', UserSchema);
