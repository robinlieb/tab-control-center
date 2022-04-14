
// Save the selected settings
function storeSettings() {
    if (document.getElementById("show_badge").checked) {
        browser.storage.local.set({ "enableBadge": true });
    } else {
        browser.storage.local.set({ "enableBadge": false });
    }
    var maximalTabs = document.getElementById("maximal_tabs").value;
    browser.storage.local.set({ "maximalTabs": maximalTabs });
    var applySettings = document.getElementById("apply-settings-select").value;
    browser.storage.local.set({ "applySettings": applySettings });
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
    browser.storage.local.get("applySettings").then(function (value) {
        document.getElementById("apply-settings-select").value = value.applySettings;
    });
}

// Add event listener for UI settings selements
document.getElementById('show_badge').addEventListener('change', storeSettings);
document.getElementById('maximal_tabs').addEventListener('change', storeSettings);
document.getElementById('apply-settings-select').addEventListener('change', storeSettings);

restoreDefaults()