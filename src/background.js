function updateCount(tabId, isOnRemoved) {
    browser.tabs.query({ currentWindow: true })
        .then((tabs) => {
            let length = tabs.length;

            if (isOnRemoved && tabId && tabs.map((t) => { return t.id; }).includes(tabId)) {
                length--;
            }

            browser.browserAction.setBadgeText({ text: length.toString() });
            browser.browserAction.setBadgeBackgroundColor({ 'color': 'green' });
        });
}


function checkSettings(tabId, isOnRemoved) {
    browser.storage.local.get("enableBadge").then(function (value) {
        if (value.enableBadge == true) {
            updateCount(tabId, isOnRemoved);
        } else {
            browser.browserAction.setBadgeText({ text: "" });
        }
    });
}

browser.tabs.onRemoved.addListener(
    (tabId) => {
        checkSettings(tabId, true);
    });

browser.tabs.onCreated.addListener(
    (tabId) => {
        checkSettings(tabId, false);
    });

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type == "Settings changed") {
        checkSettings();
    }
});

checkSettings();
