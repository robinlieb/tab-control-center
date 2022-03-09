function updateCount(tab, isOnRemoved) {
    browser.tabs.query({ currentWindow: true })
        .then((tabs) => {
            let length = tabs.length;

            if (isOnRemoved && tab && tabs.map((t) => { return t.id; }).includes(tab)) {
                length--;
            }

            browser.browserAction.setBadgeText({ text: length.toString() });
            browser.browserAction.setBadgeBackgroundColor({ 'color': 'green' });
        });
}


function checkSettings(tab, isOnRemoved) {
    browser.storage.local.get("enableBadge").then(function (value) {
        if (value.enableBadge == true) {
            updateCount(tab, isOnRemoved);
        } else {
            browser.browserAction.setBadgeText({ text: "" });
        }
    });

    browser.storage.local.get("maxTabs").then(function (value) {
        browser.tabs.query({ currentWindow: true })
            .then((tabs) => {
                let length = tabs.length;

                if (isOnRemoved && tab && tabs.map((t) => { return t.id; }).includes(tab)) {
                    length--;
                }

                if (length > parseInt(value.maxTabs)) {
                    browser.tabs.remove(tab.id);
                }
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

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type == "Settings changed") {
        checkSettings();
    }
});

checkSettings();
