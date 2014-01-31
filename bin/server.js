#!/usr/bin/env node
"use strict";

var express = require('express'),
    router = require('../lib/router.js'),
    config = require('../config.json');

var app = express();

app.use(express.logger());
app.use(express.static(__dirname + '/../static'));
router.route(app);
app.listen(config.SERVER_PORT);