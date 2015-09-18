/*eslint no-process-exit: 0*/
'use strict';

require('norman-server-tp');
var path = require('path');
var AppServer = require('node-sap-app-server');
var commonServer = require('norman-common-server');
var registry = commonServer.registry;
var INIT_TIMEOUT = 120;

var configFile = path.join(__dirname, 'config.json');

var argv = process.argv.slice(2);

// Dummy context
var systemContext = {
    ip: '::1',
    user: {
        _id: '0',
        name: 'SYSTEM'
    }
};

// Return the rule object for the given domain
function getAccessObject(domain) {
    // Default rule for "Guest with Study or Project Invitation"
	var res = {
		_id: domain,
		scope: [
			{name: 'access', permissions: ['guest']},
			{name: 'project', permissions: ['collaborator']},
			{name: 'study', permissions: ['participant']}
		]
	};
    return res;
}

function processDomains(operation) {
    var accessService = registry.getModule('AccessService'),
        promises = [],
        i = 0;

    argv.shift();

    for (; i < argv.length; i++) {
		var accessRule = getAccessObject(argv[i]);
		if (operation === 'add') {
			promises.push(accessService.set(accessRule, systemContext));
		} else {
			promises.push(accessService.delete(accessRule, systemContext));
		}
    }

    Promise.waitAll(promises)
        .catch(function (err) {
            var j = 0;
            for (; j < err.detail.errors.length; j++) {
                if (err.detail.errors[j] !== undefined) {
                    console.err(err.detail.errors[j]);
                }
            }
        })
        .finally(function () {
            server.appServer.shutdown();
        });
}


function printUsage() {
    console.log('usage: node access-script.js add|remove domain1 domain2 ...');
}

if (argv.length < 2 || (argv[0] !== 'add' && argv[0] !== 'remove')) {
    printUsage();
    process.exit(1);
}

var config = commonServer.config.initialize(configFile);
if (config.server && config.server.workers) {
    // Ensure that we are not running in cluster mode
    delete config.server.workers;
}
if (config.http) {
    delete config.http;
}

var server = new AppServer.Server(config);
server.start().then(function () {
    var logger = commonServer.logging.createLogger('server');
    // Enforce server shutdown after timeout expiration
    setTimeout(function () {
        logger.error('Timeout.');
        server.appServer.shutdown();
    }, INIT_TIMEOUT * 1000);

    // argv[0] is either add or remove
    processDomains(argv[0]);
});
