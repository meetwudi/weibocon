#!/usr/bin/env node
"use strict";

var connect = require('connect'),
    http = require('http');

var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static('public'))
  .use(function(req, res){
    res.end('hello world\n');
  });

http.createServer(app).listen(3000);