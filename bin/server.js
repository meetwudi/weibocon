#!/usr/bin/env node
"use strict";

var express = require('express'),
    router = require('../lib/router.js'),
    config = require('../config.json');

var app = express();

router.route(app);
app.listen(config.SERVER_PORT);