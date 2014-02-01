"use strict";
var models = require('./models'),
    _ = require('underscore');

function route(app) {
    ////////////////////////////////// Pages //////////////////////////////////
    app.get('/', function(req, res, next) {
        console.log(req.session.oauthUser);
        res.render('index');    
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
        if (!req.body.id || 
            !req.body.screen_name ||
            !req.body.profile_url) {
            return res.end('invalid request');
        }
         
        models.ObserveUser.count(_.pick(req.body, 'id'), function(err, count) {
            if (count > 0) {
                return res.end('duplicated');
            }
            
            var newObserveUser = new models.ObserveUser(_.pick(req.body, 'id', 
                                                               'screen_name', 
                                                               'profile_url'));
            newObserveUser.save(function(err, newObserveUser) {
                if (err) {
                    throw err;
                } 
                res.json(newObserveUser);
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