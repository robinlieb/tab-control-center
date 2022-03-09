
// Save the selected settings
function storeSettings() {
    if (document.getElementById("show_badge_checkbox_btn").checked) {
        browser.storage.local.set({ "enableBadge": true });
    } else {
        browser.storage.local.set({ "enableBadge": false });
    }
    var maxTabs = document.getElementById("max_tabs").value;
    browser.storage.local.set({ "maxTabs": maxTabs });
    browser.runtime.sendMessage({ type: "Settings changed" });
}

// Restores defaults
function restoreDefaults() {
    browser.storage.local.get("enableBadge").then(function (value) {
        document.getElementById("show_badge_checkbox_btn").checked = value.enableBadge;
    });
    browser.storage.local.get("maxTabs").then(function (value) {
        document.getElementById("max_tabs").value = parseInt(value.maxTabs);
    });
}

// Add event listener for UI settings selements
document.getElementById('show_badge_checkbox_btn').addEventListener('change', storeSettings);
document.getElementById('max_tabs').addEventListener('change', storeSettings);

restoreDefaults()