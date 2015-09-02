/*eslint no-process-exit: 0*/
'use strict';

var path = require('path');
var AppServer = require('node-sap-app-server');
var commonServer = require('norman-common-server');
var registry = commonServer.registry;
var INIT_TIMEOUT = 120;

var configFile = path.join(__dirname, 'config-admin.json');
var admin = {name : 'buildadmin', password : 'Buildexample1', email : 'buildadmin@example.com'};


var config = commonServer.config.initialize(configFile);
if (config.server && config.server.workers) {
    // Ensure that we are not running in cluster mode
    delete config.server.workers;
}

var logger = commonServer.logging.createLogger('server');
var server = new AppServer.Server(config);


server.start().then(function () {
    // Enforce server shutdown after timeout expiration
    var cancelId = setTimeout(function () {
        var logger = commonServer.logging.createLogger('server');
        logger.error('User Admin creation timeout, closing process.');
        cancelId = undefined;
        server.appServer.shutdown();
    }, INIT_TIMEOUT * 1000);

    var userService = registry.getModule('UserService');
    var systemContext = {
        ip: '::1',
        user: {
            _id: '0',
            name: 'SYSTEM'
        }
    };

    userService.createLocalAdmin(admin, systemContext)
        .then(function () {
            if (cancelId) {
                clearTimeout(cancelId);
                cancelId = undefined;
            }
        })
        .catch(function (err) {
            logger.error(err);
        })
        .finally(function () {
            server.appServer.shutdown();
        });
});