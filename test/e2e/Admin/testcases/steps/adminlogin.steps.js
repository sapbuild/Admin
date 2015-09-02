'use strict';

var AdminLogin = require('../../pageobjects/adminlogin.po.js');
var chai = require('norman-testing-tp').chai;
var chaiAsPromised = require('norman-testing-tp')['chai-as-promised'];
chai.use(chaiAsPromised);

var utility = require('../../support/utility.js');

var adminlogin = new AdminLogin(browser.baseUrl + '/login');

var adminUser = { name: 'buildadmin', password: 'Buildexample1', email: 'buildadmin@example.com' };


module.exports = function () {

    this.Before('@delay', function (scenario, callback) {
        setTimeout(
            function () {
                console.log('Delay for the server to start');
                callback();
            }, 15000);
    });

    this.Before('@importUsers', function (scenario, callback) {
        console.log('Importing users');
        utility.importusers();
        callback();
    });

    this.Before('@createAdmin', function (scenario, callback) {
        console.log('Creating admin user');
        utility.createadmin(callback());
    });

    this.Given(/^I am on the admin login page$/, function (callback) {
        browser.waitForAngular();
        callback();
    });

    this.When(/^I enter admin credentials$/, function (callback) {
        adminlogin.login(adminUser);
        browser.waitForAngular();
        callback();
    });
};
