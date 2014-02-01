"use strict";

var weibo = require('weibo'),
    g = require('../global'),
    config = require('../../config.json'),
    _ = require('underscore'),
    async = require('async'),
    models = require('../models');

/*
 * 将用户加入数据库
 */
var addPendingFollowUser = function(user, callback) {
    if (user.following) {
        console.info('[抓取任务] 抓取用户('+user.screen_name+') 忽略，已关注');
        return callback();
    }
    else if (user.followers_count < 100) {
        console.info('[抓取任务] 抓取用户('+user.screen_name+') 忽略，粉丝过少');
        return callback();
    }
    else if (user.followers_count > 1000) {
        console.info('[抓取任务] 抓取用户('+user.screen_name+') 忽略，粉丝过多');
        return callback();
    }
    else if (user.friends_count < 100) {
        console.info('[抓取任务] 抓取用户('+user.screen_name+') 忽略，关注过少');
        return callback();
    }
    else if (user.verified) {
        console.info('[抓取任务] 抓取用户('+user.screen_name+') 忽略，认证用户');
        return callback();
    }
    else {
        models.PendingFollowUser.count({id: user.id}, function(err, count) {
           if (count > 0 || err) { return; } 
            var pendingFollowUser = new models.PendingFollowUser(_.pick(user, 'id', 'screen_name', 'profile_url'));
            pendingFollowUser.save(function(err, pendingFollowUser) {
               if (err) { return callback();/*depress error here*/};
                console.info('[抓取任务] 抓取用户('+pendingFollowUser.screen_name+')');
                return callback();
            });
        });        
    }
};

var regNext = function() {
    setTimeout(exec, config.ROBOT_INTERVAL_RETRIEVE_PENDING_FOLLOW_USER);
};

var exec = function() {
    console.info('[抓取任务] 抓取用户开始');
    if (!g.get('oauthUser')) {
        console.info('[抓取任务] 尚未授权');
        return regNext();
    }
    
    var oauthUser = g.get('oauthUser');
    // 获取微博
    weibo.home_timeline(oauthUser, {
        count: config.WEIBO_RETRIEVE_COUNT
    }, function(err, result) {
        var status = result.items[0];
        console.info('[抓取任务] 抓取一条微博, id为' + status.id);
        
        // 获取微博下的评论
        weibo.comments(oauthUser, status.id, 
                       {
                           count: config.COMMENT_RETRIEVE_COUNT
                       }, function(err, result) {
            var comments = result.items;
            console.info('[抓取任务] 抓取成功的评论条数为'+comments.length+'条');
            // 对每条评论的用户进行处理
            async.each(comments, function(comment, callback) {
                addPendingFollowUser(comment.user, callback);
            }, function(err) {
                console.info('[抓取任务] 抓取任务结束');
                return regNext();
            });
        });           
    });
};


setTimeout(exec, config.ROBOT_INTERVAL_RETRIEVE_PENDING_FOLLOW_USER);