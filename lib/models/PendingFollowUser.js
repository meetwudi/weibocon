"use strict";

var mongoose = require('mongoose'),
    pendingFollowUserSchema = mongoose.Schema({
        id: Number,
        screen_name: String,
        profile_url: String,
        followed: {type: Boolean, default: false}
    });
module.exports = mongoose.model('PendingFollowUser', pendingFollowUserSchema);