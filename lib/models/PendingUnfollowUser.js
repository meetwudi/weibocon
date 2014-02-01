var mongoose = require('mongoose'),
pendingUnfollowUserSchema = mongoose.Schema({
  id: Number,
  screen_name: String,
  profile_url: String
});
module.exports = mongoose.model('PendingUnfollowUser', pendingUnfollowUserSchema);