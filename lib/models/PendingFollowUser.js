var mongoose = require('mongoose'),
pendingFollowUserSchema = mongoose.Schema({
  id: Number,
  screen_name: String,
  profile_url: String
});
module.exports = mongoose.model('PendingFollowUser', pendingFollowUserSchema);