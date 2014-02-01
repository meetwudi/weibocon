"use strict";

var weibo = require('weibo'),
    g = require('../global'),
    config = require('../../config.json'),
    _ = require('underscore'),
    async = require('async'),
    models = require('../models');

var regNext = function() {
    setTimeout(exec, config.ROBOT_INTERVAL_FOLLOW_USER);
};

var exec = function() {
    console.info('[关注任务] 关注用户开始');
    if (!g.get('oauthUser')) {
        console.info('[关注任务] 尚未授权');
        return regNext();
    }
    
    var oauthUser = g.get('oauthUser');
    models.PendingFollowUser.findOne({followed:false}, function(err, pendingFollowUser) {
        if (!pendingFollowUser) {
            console.info('[关注任务] 任务列表空，结束');
            return regNext();
        } 
        console.info('[关注任务] 预备关注用户(' + pendingFollowUser.screen_name + ')');
        weibo.friendship_create(oauthUser, pendingFollowUser.id, null, function(err, result) {
            if (err) {
                console.info('[关注任务] 关注失败');
                return regNext();
            } 
            console.info('[关注任务] 关注成功');
            
            models.PendingFollowUser.update({id:pendingFollowUser.id}, {followed: true}, function(err) {
                console.info('[关注任务] 数据库标记成功，任务完成');
                return regNext();
            });
            
        });
    });
};


setTimeout(exec, config.ROBOT_INTERVAL_FOLLOW_USER);