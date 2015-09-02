'use strict';

var UiLibraryUpload = function (url, cb) {
    if (url.length > 0) {
        browser.get(url);
        browser.driver.manage().window().maximize();
    }
    if (typeof cb === 'function') cb();
};


UiLibraryUpload.prototype = Object.create({}, {

    // Selectors
    uploadUILibraryButton: { get: function () { return element(by.css('.action-icon.ui-button-icon')); }},
    libraryOption: { get: function () { return element(by.cssContainingText('option', 'open UI5')); }},
    ui5Version: { get: function () { return element(by.model('libraryToUpload.version')); }},

    // Actions
    uploadUILibrary: {
        value: function () {
            this.uploadUILibraryButton.click();
            this.libraryOption.click();
            this.ui5Version.sendKeys('1.26.9');
        }
    }
});

module.exports = UiLibraryUpload;
