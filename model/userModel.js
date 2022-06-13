const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Siz nameni kiritishingiz shart'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Siz email kiritishingiz shart'], 
  },
  role: {
    type: String,
    required: [true, 'Siz role kiritishingiz shart'],
  },
  active: {
    type: Boolean,
    required: [true, 'Siz active kiritishingiz shart'],
  },
  photo: {
    type: String,
    required: [true, 'Siz photo kiritishingiz shart'],
  },
  password: {
    type: String,
    required: [true, 'Siz password kiritishingiz shart'],
  },
});
const User = mongoose.model('users', userScheme);

module.exports = User;
