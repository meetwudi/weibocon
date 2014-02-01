"use strict";
var models = require('./models'),
    _ = require('underscore'),
    weibo = require('weibo'),
    async = require('async'),
    config = require('../config.json'),
    request = require('request');

function route(app) {
    ////////////////////////////////// Pages //////////////////////////////////
    app.get('/', function(req, res, next) {
        res.render('index', {
            oauthUser: req.session.oauthUser
        });    
    });
    
    ////////////////////////////////// APIs //////////////////////////////////
    /**
     * snif_user
     * 触发一个监控周期
     * 
     * 参数：无
     */
    app.post('/api/snif_user', function(req, res, next) {

    });
    
    /**
     * follow_user
     * 关注一个用户
     * 
     * 参数：无
     * 
     * 返回：
     */
    app.post('/api/follow_user', function(req, res, next) {
        
    });
    
    
    /**
     * unfollow
     * 取消关注一个用户
     * 
     * 参数：无
     * 
     * 返回：
     */
    app.post('/api/unfollow_user', function(req, res, next) {
        
    });
    
}

module.exports = {
    route: route
};