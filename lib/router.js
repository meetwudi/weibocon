"use strict";
var models = require('./models'),
    _ = require('underscore'),
    weibo = require('weibo'),
    async = require('async');

function route(app) {
    ////////////////////////////////// Pages //////////////////////////////////
    app.get('/', function(req, res, next) {
        res.render('index', {
            oauthUser: req.session.oauthUser
        });    
    });
    
    ////////////////////////////////// APIs //////////////////////////////////
    /**
     * list_observe_users
     * 获取目前所有待监控用户
     * 
     * 参数：无
     * 
     * 返回：
     */
    app.get('/api/list_observe_users', function(req, res, next) {
    });
    
    /**
     * list_pending_follow_users
     * 获取目前所有待关注用户
     * 
     * 参数：无
     * 
     * 返回：
     */
    app.get('/api/list_pending_follow_users', function(req, res, next) {
        
    });
    
    /**
     * list_pending_unfollow_users
     * 获取目前所有待取消关注用户
     * 
     * 参数：无
     * 
     * 返回：
     */
    app.get('/api/list_pending_unfollow_users', function(req, res, next) {
        
    });
    
    /**
     * add_observe_user
     * 添加待监控用户
     *  
     * 参数：
     * [qs] id: 用户的微博id
     * [qs] screen_name: 用户的微博名
     * [qs] profile_url: 用户的微博地址
     * 
     * 返回：json对象
     * status，为true或false代表操作是否成功
     */
    app.post('/api/add_observe_user', function(req, res, next) {
        if (!req.body.screen_name) {
            return res.end('invalid request');
        }
        console.log(req.session.oauthUser);
        weibo.user_show(req.session.oauthUser,
                       null,
                        req.body.screen_name,
                        function(err, user) {
                            // user : 获取的用户信息
                            // 将该用户加入监控列表 (此处不检查是否重复用户)
                            var newObserverUser = new models.ObserveUser(_.pick(user, 'id',
                                                                               'screen_name',
                                                                               'profile_url'));
                            newObserverUser.save(function(err, newObserveUser) {
                               console.log('Saved ' + newObserveUser.screen_name); 
                            });
                        });
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