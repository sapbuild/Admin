/*eslint no-process-exit: 0*/
'use strict';
var path = require('path');

module.exports = {
    importusers: function () {
        var pathToImportUser = path.resolve(__dirname, '../testcases/steps/files/importUsers.js');
        var pathToExportedUsers = path.resolve(__dirname, '../testcases/steps/files/exportedUsers.json');
        var exec = require('child_process').exec;
        var cmd = 'node ' + pathToImportUser + ' --inputFileName ' + pathToExportedUsers;
        exec(cmd, {maxBuffer: 1024 * 500}, function (error/*, stdout, stderr*/) {
            if (error) {
                console.log('Error: ' + error);
            }
        });
    },

    createadmin: function () {
        var pathToCreateAdmin = path.resolve(__dirname, '../testcases/steps/files/createAdmin.js');
        var exec = require('child_process').exec;
        var cmd = 'node ' + pathToCreateAdmin;
        exec(cmd, {maxBuffer: 1024 * 500}, function (error/*, stdout, stderr*/) {
            if (error) {
                console.log('Error: ' + error);
            }
        });
    }
};
