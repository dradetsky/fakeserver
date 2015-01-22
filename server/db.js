var Q = require('q');

var db = function() {
    // pretend this is a connection promise
    return Q(1337);
};

module.exports = db;
