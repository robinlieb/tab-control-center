var browser = require("webextension-polyfill");

const action = browser.action || browser.browserAction;

function updateCount(tab, isOnRemoved, queryObj) {
    browser.tabs.query(queryObj)
        .then((tabs) => {
            let length = tabs.length;

            if (isOnRemoved && tab && tabs.map((t) => { return t.id; }).includes(tab)) {
                length--;
            }

            action.setBadgeText({ text: length.toString() });
        });
}


function checkSettings(tab, isOnRemoved) {
    browser.storage.local.get("applySettings").then(function (value) {
        var queryObj = {};
        if (value.applySettings === "window") {
            queryObj = { currentWindow: true };
        }

        browser.storage.local.get("enableBadge").then(function (value) {
            if (value.enableBadge == true) {
                updateCount(tab, isOnRemoved, queryObj);
            } else {
                action.setBadgeText({ text: "" });
            }
        });

        browser.storage.local.get("maximalTabs").then(function (value) {
            browser.tabs.query(queryObj)
                .then((tabs) => {
                    let length = tabs.length;

                    if (isOnRemoved && tab && tabs.map((t) => { return t.id; }).includes(tab)) {
                        length--;
                    }

                    if (length > parseInt(value.maximalTabs)) {
                        browser.tabs.remove(tab.id);
                    }
                });
        });
    });
}

browser.tabs.onRemoved.addListener(
    (tab) => {
        checkSettings(tab, true);
    });

browser.tabs.onCreated.addListener(
    (tab) => {
        checkSettings(tab, false);
    });

browser.windows.onRemoved.addListener(
    (tab) => {
        checkSettings(tab, true);
    });

browser.windows.onCreated.addListener(
    (tab) => {
        checkSettings(tab, false);
    });

browser.windows.onFocusChanged.addListener(
    (tab) => {
        checkSettings(tab, false);
    });

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type == "Settings changed") {
        checkSettings();
    }
});

checkSettings();
