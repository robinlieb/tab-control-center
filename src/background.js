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


browser.tabs.onRemoved.addListener(
    (tabId) => {
        updateCount(tabId, true);
    });
browser.tabs.onCreated.addListener(
    (tabId) => {
        updateCount(tabId, false);
    });
updateCount();
