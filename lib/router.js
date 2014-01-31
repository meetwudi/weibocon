"use strict";

function _shouldLogin(req, res, next) {
    if (! req.session.oauthUser) {
        res.redirect('/login?type=weibo');
    }
    next();
}

function route(app) {
    ////////////////////////////////// Pages //////////////////////////////////
    app.get('/', function(req, res) {
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
    app.get('/api/list_observe_users', _shouldLogin, function(req, res) {
    });
    
    /**
     * list_pending_follow_users
     * 获取目前所有待关注用户
     * 
     * 参数：无
     * 
     * 返回：
     */
    app.get('/api/list_pending_follow_users', _shouldLogin, function(req, res) {
        
    });
    
    /**
     * list_pending_unfollow_users
     * 获取目前所有待取消关注用户
     * 
     * 参数：无
     * 
     * 返回：
     */
    app.get('/api/list_pending_unfollow_users', _shouldLogin, function(req, res) {
        
    });
    
    /**
     * add_observe_user
     * 添加待监控用户
     *  
     * 参数：
     * [qs] id: 用户的微博id
     * 
     * 返回：json对象
     * status，为true或false代表操作是否成功
     */
    app.get('/api/add_observe_user', _shouldLogin, function(req, res) {
        
    });
    
    /**
     * follow_user
     * 关注一个用户
     * 
     * 参数：无
     * 
     * 返回：
     */
    app.post('/api/follow_user', _shouldLogin, function(req, res) {
        
    });
    
    
    /**
     * unfollow
     * 取消关注一个用户
     * 
     * 参数：无
     * 
     * 返回：
     */
    app.post('/api/unfollow_user', _shouldLogin, function(req, res) {
        
    });
    
}

module.exports = {
    route: route
};