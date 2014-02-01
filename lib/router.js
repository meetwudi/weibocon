"use strict";

function route(app) {
    app.get('/', function(req, res, next) {
        res.render('index', {
            oauthUser: req.session.oauthUser
        });    
    }); 
}

module.exports = {
    route: route
};