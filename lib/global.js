"use strict";

var _global = {};

function set(key, value) {
    _global[key] = value;
}

function get(key) {
    return _global[key];
}

function reset() {
    _global = {};
}

function unset(key) {
    _global[key] = null;
    delete global.key;
}

module.exports = {
    set: set,
    get: get,
    reset: reset,
    unset: unset
};