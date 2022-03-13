
// Save the selected settings
function storeSettings() {
    if (document.getElementById("show_badge").checked) {
        browser.storage.local.set({ "enableBadge": true });
    } else {
        browser.storage.local.set({ "enableBadge": false });
    }
    var maximalTabs = document.getElementById("maximal_tabs").value;
    browser.storage.local.set({ "maximalTabs": maximalTabs });
    browser.runtime.sendMessage({ type: "Settings changed" });
}

// Restores defaults
function restoreDefaults() {
    browser.storage.local.get("enableBadge").then(function (value) {
        document.getElementById("show_badge").checked = value.enableBadge;
    });
    browser.storage.local.get("maximalTabs").then(function (value) {
        document.getElementById("maximal_tabs").value = parseInt(value.maximalTabs);
    });
}

// Add event listener for UI settings selements
document.getElementById('show_badge').addEventListener('change', storeSettings);
document.getElementById('maximal_tabs').addEventListener('change', storeSettings);

restoreDefaults()