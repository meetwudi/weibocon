#!/usr/bin/env node
"use strict";

var express = require('express'),
    router = require('../lib/router.js'),
    config = require('../config.json'),
    weibo = require('weibo');

var app = express();

// Set up weibo
weibo.init('weibo', config.APP_KEY, config.APP_SECRET);


// Set up server
app.use(express.logger());
app.use(express.bodyParser());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/../static'));
app.use(express.cookieParser('asdasdu12h93812j3oiadas'));
app.use(express.cookieSession({secret:"dasdqwe1231"}));
app.use(weibo.oauth({
    loginPath: '/login',
    logoutPath: '/logout',
    blogtypeField: 'type'
}));
router.route(app);
app.listen(config.SERVER_PORT);