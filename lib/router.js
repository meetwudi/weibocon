"use strict";

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
     * 
     * 返回：json对象
     * status，为true或false代表操作是否成功
     */
    app.get('/api/add_observe_user', function(req, res, next) {
        
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