/** Required packages **/
var fs = require('fs');
var path = require('path');
var restify = require('restify');
var _ = require('underscore-node');

var mongo = require('./server/db');

var certDir = path.join(path.dirname(__filename), 'cert');
// var settings = require('./server/settings');

var appInit = function() {
    var server = restify.createServer({
        // just a name, doesn't matter
        name: 'api',
        // certificate: fs.readFileSync(path.join(certDir, 'server.crt')),
        // key: fs.readFileSync(path.join(certDir, 'server.pem')),
        version: '0.0.1'
    });
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.queryParser());
    server.use(restify.bodyParser());

    require('./server/routes')(server);

    var listenPort = 443;
    if(process.argv.length > 2) {
        listenPort = parseInt(process.argv[2]);
    }

    server.listen(listenPort, function() {
        console.log('Started API Server', listenPort);
    });
};

mongo().then(function() {
    // TODO: can we move this settings? if so, do it.
    var jsonCookiesStr;
    try {
        // NOTE: that the current working directory must be set for this relative path to work (see
        // the web_hooks.conf )
        jsonCookiesStr = fs.readFileSync('./cookies.json', {encoding: 'utf8'});
        var jsonCookies = JSON.parse(jsonCookiesStr);
        _.extend(settings.linkedIn.cookies, jsonCookies);
    } catch (e) {
        console.error("Problem reading the cookies.json. Is the current working directory set?", e);
    }
}).then(function() {
    appInit();
});

