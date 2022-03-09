
// Save the selected settings
function storeSettings() {
    if (document.getElementById("show_badge_checkbox_btn").checked) {
        browser.storage.local.set({ "enableBadge": true });
    } else {
        browser.storage.local.set({ "enableBadge": false });
    }
    browser.runtime.sendMessage({ type: "Settings changed" });
}

// Restores defaults
function restoreDefaults() {
    browser.storage.local.get("enableBadge").then(function (value) {
        document.getElementById("show_badge_checkbox_btn").checked = value.enableBadge;
    });
}

// Add event listener for UI settings selements
document.getElementById('show_badge_checkbox_btn').addEventListener('change', storeSettings);

restoreDefaults()