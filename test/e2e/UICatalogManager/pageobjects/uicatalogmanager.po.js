/* eslint no-loop-func:0 */

'use strict';

var Q = require('q');

var UiCatalogManager = function (url, cb) {
    if (url.length > 0) {
        browser.get(url);
        browser.driver.manage().window().maximize();
    }
    if (typeof cb === 'function') cb();
};


UiCatalogManager.prototype = Object.create({}, {

    // Selectors
    headingTitle: { get: function () { return element(by.css('label.heading')); }},
    customCatalogOption: { get: function () { return element(by.cssContainingText('option', 'Custom')); }},
    copyControlButton: { get: function () { return element(by.css('button[ui-dialog-open="copy-control"]')); }},
    deleteControlButton: { get: function () { return element(by.css('button[ui-dialog-open="delete-control"]')); }},
    clickDeleteConfirmButton: { get: function () { return element.all(by.css('.ui-button.ui-button-large')).get(3); }},
    downloadCatalogButton: { get: function () { return element(by.css('button[ng-click="downloadCustomCatalog()"]')); }},
    editCustomCatalogButton: { get: function () { return element(by.css('button[ng-show="displayEditButton"]')); }},
    clickCopyConfirmButton: { get: function () { return element.all(by.css('.ui-button.ui-button-large')).get(1); }},
    upload: { get: function () { return element.all(by.css('input[type="file"]')); }},

    // Actions
    clickCopyControl: { value: function () {
        this.copyControlButton.click();
    }},
    customCatalogSelection: { value: function () {
        this.customCatalogOption.click();
    }},
    clickDeleteControl: { value: function () {
        this.deleteControlButton.click();
    }},
    clickDeleteConfirm: { value: function () {
        this.clickDeleteConfirmButton.click();
    }},
    downloadCustomCatalog: { value: function () {
         this.downloadCatalogButton.click();
    }},
    editCustomCatalog: { value: function () {
        this.editCustomCatalogButton.click();
    }},
    clickCopyConfirm: { value: function () {
        this.clickCopyConfirmButton.click();
    }},
    uploadCustomCatalog: { value: function (custom) {
        this.upload.first().sendKeys(custom);
        browser.waitForAngular();
    }},
    // Unit functions

    existsControl: { value: function (keys) {
            browser.waitForAngular();
            var promiseArray = [];

            return element.all(by.cssContainingText('.controlLabel', keys))
                .then(function (controls) {
                    if (controls.length === 0) {
                        return [false];
                    }
                    for (var i = 0; i < controls.length; i++) {
                        var control = controls[i];
                        browser.waitForAngular();
                        promiseArray.push(control.getText()
                            .then(function (text) {
                                return (keys === text);
                            }));
                    }
                    return Q.all(promiseArray);
                })
                .then(function (booleanArray) { var result = false;
                    for (var i = 0; i < booleanArray.length; i++) {
                        if (booleanArray[i]) {
                            result = true;
                        }
                    }
                    return result;
                });
        }
    },

    selectControl: { value: function (keys) {
            browser.waitForAngular();
            var promiseArray = [];

            return element.all(by.cssContainingText('.controlLabel', keys))
                .then(function (controls) {
                    if (controls.length === 0) {
                        return [false];
                    }
                    for (var i = 0; i < controls.length; i++) {
                        var control = controls[i];
                        browser.waitForAngular();
                        promiseArray.push(control.getText()
                            .then(function (text) {
                                if (keys === text) {
                                    element(by.css('label.controlLabel[value="' + text + '"]')).click();
                                    element(by.css('input[value="' + text + '"]')).click();
                                    return true;
                                }
                            }));
                    }
                    return Q.all(promiseArray);
                })
                .then(function (booleanArray) {
                    var result = false;
                    for (var i = 0; i < booleanArray.length; i++) {
                        if (booleanArray[i]) {
                            result = true;
                        }
                    }
                    return result;
                });
        }
    },
    selectProperties: { value: function (/*selectedTab*/) {
            browser.waitForAngular();
            return element.all(by.css('.displayLabel'))
                .then(function (properties) {
                    if (properties.length === 0) {
                        return false;
                    }
                    element.all(by.css('.displayLabel')).get(1).click();
                    element.all(by.css('.displayLabel')).get(2).click();
                    return true;
                });
        }
    }
});

module.exports = UiCatalogManager;
