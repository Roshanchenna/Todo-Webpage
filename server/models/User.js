// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  todos: [
    {
      title: String,
      description: String,
      completed: Boolean,
    },
  ],
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
