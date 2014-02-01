var mongoose = require('mongoose'),
observeUserSchema = mongoose.Schema({
  id: Number,
  screen_name: String,
  profile_url: String
});
module.exports = mongoose.model('ObserveUser', observeUserSchema);