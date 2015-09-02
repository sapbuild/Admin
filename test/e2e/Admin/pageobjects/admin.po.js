'use strict';

var Admin = function (url, cb) {
    if (url.length > 0) {
        browser.get(url);
        browser.driver.manage().window().maximize();
    }
    if (typeof cb === 'function') cb();
};

Admin.prototype = Object.create({}, {

// <editor-fold desc="Selectors">

    avatarLogo: { get: function () {
        return element(by.css('.ui-avatar-initials'));
    }},
    lnkLogout: { get: function () {
        return element(by.css('.na-logout-link'));
    }},

    btnUICatalog: { get: function () {
        return element(by.css('div[text="UI Catalog"]'));
    }},
    pageTitle: { get: function () {
        return element(by.css('.navbar-title'));
    }},
    page: { get: function () {
        return element(by.css('.page-console-users'));
    }},
    inputSearch: { get: function () {
        return element(by.css('[ng-model="search.value"]'));
    }},

    btnUserSimple: { get: function () {
        return element(by.css('div[ng-click="setSimpleDisplay(true)"]'));
    }},

    btnUserDetail: { get: function () {
        return element(by.css('div[ng-click="setSimpleDisplay(false)"]'));
    }},

    dialogSetRole: { get: function () {
        return element(by.id('idRoleDialog'));
    }},

    rbtnStandard: { get: function () {
        return element(by.css('label[for="radioStandard"]'));
    }},

    rbtnGuest: { get: function () {
        return element(by.css('label[for="radioGuest"]'));
    }},

    btnSetRoleOk: { get: function () {
        return element(by.id('idRoleDialog')).element(by.css('button[ng-bind="closeText"]'));
    }},

    btnSetRoleCancel: { get: function () {
        return element(by.id('idRoleDialog')).element(by.css('div[ng-bind="cancelText"]'));
    }},


    btnPreviousPage: { get: function () {
        return element(by.css('[ng-click="_onPrevious()"]'));
    }},

    btnNextPage: { get: function () {
        return element(by.css('[ng-click="_onNext()"]'));
    }},

    txtRole: { get: function () {
        return element(by.css('div.role'));
    }},

    txtNbUsers: { get: function () {
        return element(by.binding('nbUsers'));
    }},

// </editor-fold>

// <editor-fold desc="Actions">

    clickAvLogo: { value: function () {
        this.avatarLogo.click();
    }},

    clickLogout: { value: function () {
        this.lnkLogout.click();
    }},

    clickBtnUICatalog: { value: function () {
        this.btnUICatalog.click();
    }},

    clickBtnPreviousPage: { value: function () {
        this.btnPreviousPage.click();
    }},

    clickBtnNextPage: { value: function () {
        this.btnNextPage.click();
    }},

    UserResearch: { value: function (text) {
        this.inputSearch.clear();
        this.inputSearch.sendKeys(text);
    }},

    clearUserResearch: { value: function () {
        this.inputSearch.clear();
    }},

    clickBtnUserSimple: { value: function () {
        this.btnUserSimple.click();
    }},

    clickBtnUserDetail: { value: function () {
        this.btnUserDetail.click();
    }},

    clickRbtnStandard: { value: function () {
        this.rbtnStandard.click();
    }},

    clickRbtnGuest: { value: function () {
        this.rbtnGuest.click();
    }},

    clickBtnSetRoleOk: { value: function () {
        if (this.dialogSetRoleIsDisplayed()) {
            this.btnSetRoleOk.click();
        }
        else {
            throw new Error('Set Role dialog is not displayed');
        }
    }},

    clickBtnSetRoleCancel: { value: function () {
        if (this.dialogSetRoleIsDisplayed()) {
            this.btnSetRoleCancel.click();
        }
        else {
            throw new Error('Set Role dialog is not displayed');
        }
    }},


// </editor-fold>

// <editor-fold desc="functions">

    existsUser: { value: function (text) {
        browser.waitForAngular();
        return element.all(by.cssContainingText('.ng-binding', text))
            .then(function (users) {
                if (users.length === 0) {
                    return false;
                }
                else {
                    return true;
                }
            })
    }},

    UsersAreDisplayed: {value: function () {
        browser.waitForAngular();
        return browser.isElementPresent(by.css('div.simpleBox'));
    }},

    dialogSetRoleIsDisplayed: {value: function () {
        browser.waitForAngular();
        return browser.isElementPresent(by.id('idRoleDialog'));
    }},


    clickFoundUser: {
        value: function () {
            browser.waitForAngular();
            element(by.css('div[ng-click="_openDialog(user)"]')).click();
        }
    }
// </editor-fold>

});

module.exports = Admin;
