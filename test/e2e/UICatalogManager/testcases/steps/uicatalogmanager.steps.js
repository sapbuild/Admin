'use strict';

var UiCatalogManager = require('../../pageobjects/uicatalogmanager.po.js');
var chai = require('norman-testing-tp').chai;
var chaiAsPromised = require('norman-testing-tp')['chai-as-promised'];
chai.use(chaiAsPromised);
var expect = chai.expect;

var uicatalogmanager;
uicatalogmanager = new UiCatalogManager('');

var path = require('path');
var sampleUpload1 = '../files/CustomCatalogTemplate.json';
var uploadPath1 = path.resolve(__dirname, sampleUpload1);
module.exports = function () {

    this.Given(/^UICatalog is displayed$/, function (callback) {
        browser.waitForAngular();
        expect(browser.driver.getCurrentUrl()).to.eventually.match(/UICatalogManager/).and.notify(callback);
    });

    this.Then(/^I check control named "(.*)" exists$/, function (controlName, callback) {
        browser.waitForAngular();
        expect(uicatalogmanager.existsControl(controlName)).to.eventually.equal(true).and.notify(callback);
    });

    this.Given(/^I select control named "(.*)"$/, function (controlName, callback) {
        browser.waitForAngular();
        expect(uicatalogmanager.selectControl(controlName)).to.eventually.equal(true).and.notify(callback);
    });

    this.Then(/^I select control named "(.*)"$/, function (controlName, callback) {
        browser.waitForAngular();
        expect(uicatalogmanager.selectControl(controlName)).to.eventually.equal(true).and.notify(callback);
    });

    this.Then(/^I select properties$/, function (callback) {
        browser.waitForAngular();
        expect(uicatalogmanager.selectProperties()).to.eventually.equal(true).and.notify(callback);
    });

    this.Then(/^I click on copy control button$/, function (callback) {
        browser.waitForAngular();
        uicatalogmanager.clickCopyControl();
        browser.waitForAngular();
        callback();
    });

    this.Then(/^I click on the Copy button$/, function (callback) {
        browser.waitForAngular();
        uicatalogmanager.clickCopyConfirm();
        browser.waitForAngular();
        callback();
    });
    this.Then(/^I select custom dropdown option$/, function (callback) {
        browser.waitForAngular();
        uicatalogmanager.customCatalogSelection();
        browser.waitForAngular();
        callback();
    });

    this.Given(/^I select custom dropdown option$/, function (callback) {
        browser.waitForAngular();
        uicatalogmanager.customCatalogSelection();
        browser.waitForAngular();
        callback();
    });

    this.Then(/^I click on delete control button$/, function (callback) {
        browser.waitForAngular();
        uicatalogmanager.clickDeleteControl();
        browser.waitForAngular();
        callback();
    });

    this.Then(/^I click on the Delete button$/, function (callback) {
        browser.waitForAngular();
        uicatalogmanager.clickDeleteConfirm();
        browser.waitForAngular();
        callback();
    });

    this.Then(/^I click on Download Custom Catalog Button$/, function (callback) {
        browser.waitForAngular();
        uicatalogmanager.downloadCustomCatalog();

        callback();
    });

    this.Then(/^I select Upload custom catalog option/, function (callback) {
        browser.waitForAngular();
        uicatalogmanager.uploadCustomCatalog(uploadPath1);
        browser.waitForAngular();
        callback();
    });
};
