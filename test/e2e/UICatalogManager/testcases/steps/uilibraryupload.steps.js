'use strict';

var UiLibraryUpload = require('../../pageobjects/uilibraryupload.po.js');
var chai = require('norman-testing-tp').chai;
var chaiAsPromised = require('norman-testing-tp')['chai-as-promised'];
chai.use(chaiAsPromised);

var uilibraryupload;
uilibraryupload = new UiLibraryUpload('');

var path = require('path');
var sampleUpload2 = '../files/openui5-runtime-1.26.9.zip';
var uploadPath2 = path.resolve(__dirname, sampleUpload2);

module.exports = function () {

    this.Then(/^click on upload UI library$/, function (callback) {
        browser.waitForAngular();
        uilibraryupload.uploadUILibrary(uploadPath2);
        element(by.css('[ng-show="version.error"]')).isDisplayed().then(function (isVisible) {
            if (isVisible) {
                browser.waitForAngular();
                callback();
            }
            else {
                element.all(by.css('input[type="file"]')).get(4).sendKeys(uploadPath2);
                browser.driver.wait(function () {
                    return browser.driver.isElementPresent(by.css('[ng-click="downloadMData()"]'));
                }).then(function () {
                    return browser.driver.wait(protractor.until.elementIsVisible(element(by.css('[ng-click="downloadMData()"]'))));
                }).then(function () {
                    element(by.css('[ng-click="downloadMData()"]')).click();
                    browser.waitForAngular();
                    callback();
                });
            }
        });
    });
};
