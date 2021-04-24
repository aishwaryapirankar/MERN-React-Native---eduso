const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  image: {
    type: String
  },
  age: {
    type: String,
  },
  qualification: {
    type: String,
    required: true
  },
  interests: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('Profile', ProfileSchema);