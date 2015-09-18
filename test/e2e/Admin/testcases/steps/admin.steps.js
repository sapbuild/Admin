'use strict';

var Admin = require('../../pageobjects/admin.po.js');
var chai = require('norman-testing-tp').chai;
var chaiAsPromised = require('norman-testing-tp')['chai-as-promised'];
chai.use(chaiAsPromised);
var expect = chai.expect;
var admin;
var sleepBeforeCheck = 3000;

admin = new Admin('');

module.exports = function () {

// <editor-fold desc="Givens">

    this.Given(/^I am in the Admin$/, function (callback) {
        browser.waitForAngular();
        var comparisonStr = 'Admin Console';
        expect(admin.pageTitle.getText().then(function (value) {
            return protractor.promise.fulfilled(value.substr(0, comparisonStr.length));
        })).to.eventually.equal(comparisonStr).and.notify(callback);
    });

// </editor-fold>

// <editor-fold desc="Whens">
    this.When(/^I navigate to next page$/, function (callback) {
        browser.waitForAngular();
        browser.sleep(2000);
        admin.clickBtnNextPage();
        browser.waitForAngular();
        callback();
    });

    this.When(/^I enter '(.*)' in user research$/, function (text, callback) {
        browser.waitForAngular();
        browser.sleep(2000);
        admin.UserResearch(text);
        browser.waitForAngular();
        browser.sleep(sleepBeforeCheck);
        callback();
    });

    this.When(/^I clear user research$/, function (callback) {
        browser.waitForAngular();
        browser.sleep(2000);
        admin.clearUserResearch();
        browser.waitForAngular();
        browser.sleep(sleepBeforeCheck);
        callback();
    });

    this.When(/^I switch to user details$/, function (callback) {
        browser.waitForAngular();
        browser.sleep(sleepBeforeCheck);
        admin.clickBtnUserDetail();
        browser.waitForAngular();
        browser.sleep(sleepBeforeCheck);
        callback();
    });

    this.When(/^I switch to user icons/, function (callback) {
        browser.waitForAngular();
        browser.sleep(sleepBeforeCheck);
        admin.clickBtnUserSimple();
        browser.waitForAngular();
        browser.sleep(sleepBeforeCheck);
        callback();
    });

    this.When(/^I click on user named '(.*)'$/, function (userName, callback) {
        browser.waitForAngular();
        admin.UserResearch(userName);
        browser.waitForAngular();
        browser.sleep(sleepBeforeCheck);
        admin.clickFoundUser();
        browser.waitForAngular();
        browser.sleep(sleepBeforeCheck);
        callback();
    });

    this.When(/^I change his role to standard$/, function (callback) {
        browser.waitForAngular();
        admin.clickRbtnStandard();
        browser.sleep(sleepBeforeCheck);
        browser.waitForAngular();
        admin.clickBtnSetRoleOk();
        browser.waitForAngular();
        browser.sleep(sleepBeforeCheck);
        callback();
    });

    this.When(/^I change his role to guest/, function (callback) {
        browser.waitForAngular();
        admin.clickRbtnGuest();
        browser.sleep(sleepBeforeCheck);
        browser.waitForAngular();
        admin.clickBtnSetRoleOk();
        browser.waitForAngular();
        browser.sleep(sleepBeforeCheck);
        callback();
    });

// </editor-fold>

// <editor-fold desc="Thens">

    this.Then(/^I am logged in in the Admin$/, function (callback) {
        browser.waitForAngular();
        browser.sleep(10000);
        expect(admin.page.isPresent()).to.eventually.be.true.and.notify(callback);
    });

    this.Then(/^I Logout$/, function (callback) {
        browser.sleep(1000); //for PopOver to Disappear
        browser.waitForAngular();
        admin.clickAvLogo();
        admin.clickLogout();
        callback();
    });

    this.Then(/^I open UI Catalog$/, function (callback) {
        browser.waitForAngular();
        browser.sleep(2000);
        admin.clickBtnUICatalog();
        browser.waitForAngular();
        callback();
    });

    this.Then(/^'(.*)' user is displayed$/, function (text, callback) {
        browser.waitForAngular();
        browser.sleep(sleepBeforeCheck);
        expect(admin.existsUser(text)).to.eventually.equal(true).and.notify(callback);
    });

    this.Then(/^'(.*)' user is not displayed$/, function (text, callback) {
        browser.waitForAngular();
        browser.sleep(sleepBeforeCheck);
        expect(admin.existsUser(text)).to.eventually.equal(false).and.notify(callback);
    });

    this.Then(/^'(.*)' users are displayed$/, function (text, callback) {
        browser.waitForAngular();
        browser.sleep(sleepBeforeCheck);
        expect(admin.txtNbUsers.getText()).to.eventually.include(text).and.notify(callback);
    });

    this.Then(/^Users are displayed$/, function (callback) {
        browser.waitForAngular();
        browser.sleep(sleepBeforeCheck);
        expect(admin.UsersAreDisplayed()).to.eventually.equal(true).and.notify(callback);
    });

    this.Then(/^No user is displayed$/, function (callback) {
        browser.waitForAngular();
        browser.sleep(sleepBeforeCheck);
        expect(admin.UsersAreDisplayed()).to.eventually.equal(false).and.notify(callback);
    });

    this.Then(/^Set Role Dialog is displayed$/, function (callback) {
        browser.waitForAngular();
        browser.sleep(sleepBeforeCheck);
        expect(admin.dialogSetRoleIsDisplayed()).to.eventually.equal(true).and.notify(callback);
    });

    this.Then(/^User '(.*)' has role '(.*)'$/, function (user, role, callback) {
        browser.waitForAngular();
        admin.clickBtnUserDetail();
        browser.waitForAngular();
        browser.sleep(sleepBeforeCheck);
        admin.UserResearch(user);
        browser.waitForAngular();
        browser.sleep(sleepBeforeCheck);
        expect(admin.txtRole.getText()).to.eventually.equal(role).and.notify(callback);
    });

// </editor-fold>

};
