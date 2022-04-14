
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
        if (!isNaN(value.enableBadge)) {
            document.getElementById("show_badge").checked = value.enableBadge;
        } else {
            browser.storage.local.set({ "enableBadge": true });
            document.getElementById("show_badge").checked = true
            browser.runtime.sendMessage({ type: "Settings changed" });
        }
    });
    browser.storage.local.get("maximalTabs").then(function (value) {
        if (!isNaN(value.maximalTabs)) {
            document.getElementById("maximal_tabs").value = parseInt(value.maximalTabs);
        }
    });
    browser.storage.local.get("applySettings").then(function (value) {
        if (!isNaN(value.maximalTabs)) {
            document.getElementById("apply-settings-select").value = value.applySettings;
        } else {
            document.getElementById("apply-settings-select").value = "global"
            browser.runtime.sendMessage({ type: "Settings changed" });
        }
    });
}

// Add event listener for UI settings selements
document.getElementById('show_badge').addEventListener('change', storeSettings);
document.getElementById('maximal_tabs').addEventListener('change', storeSettings);
document.getElementById('apply-settings-select').addEventListener('change', storeSettings);

restoreDefaults()