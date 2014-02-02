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
    else if (user.followers_count < 20) {
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
           if (count > 0 || err) { return callback(); } 
            var pendingFollowUser = new models.PendingFollowUser(_.pick(user, 'id', 'screen_name', 'profile_url'));
            pendingFollowUser.save(function(err, pendingFollowUser) {
               if (err) { return callback();/*depress error here*/};
                console.info('[抓取任务] 抓取用户('+pendingFollowUser.screen_name+')');
                return callback();
            });
        });        
    }
};

var getSinceId = function() {
    if (! g.get('since_id')) {
        g.set('since_id', 0);
    }
    return g.get('since_id');
}

var setSinceId = function(since_id) {
    if (getSinceId() < since_id) {
        console.info('[抓取任务] since_id更新为' + since_id);
        g.set('since_id', since_id);
    }
}

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
        "count": config.WEIBO_RETRIEVE_COUNT,
        "since_id": getSinceId()
    }, function(err, result) {
        var statuses = result.items;
        console.info('[抓取任务] 共' + statuses.length + '条微博');
        async.eachSeries(statuses, function(status, callback_status) {
            console.info('[抓取任务] 分析一条微博, id为' + status.id);
            setSinceId(status.id);
            
            // 获取微博下的评论
            weibo.comments(oauthUser, status.id, 
                           {
                               count: config.COMMENT_RETRIEVE_COUNT
                           }, function(err, result) {
                var comments = result.items;
                console.info('[抓取任务] 抓取成功的评论条数为'+comments.length+'条');
                // 对每条评论的用户进行处理
                async.eachSeries(comments, function(comment, callback_comment) {
                    addPendingFollowUser(comment.user, callback_comment);
                }, function(err) {
                    console.info('[抓取任务] 单条任务结束');
                    callback_status();
                });
            });              
        }, function(err) {
            console.info('[抓取任务] 所有任务结束');
            return regNext();
        });
         
    });
};


setTimeout(exec, config.ROBOT_INTERVAL_RETRIEVE_PENDING_FOLLOW_USER);