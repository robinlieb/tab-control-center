
// Save the selected settings
function storeSettings() {
    if (document.getElementById("show_badge").checked) {
        browser.storage.local.set({ "enableBadge": true });
    } else {
        browser.storage.local.set({ "enableBadge": false });
    }
    var maximalTabs = document.getElementById("maximal_tabs").value;
    browser.storage.local.set({ "maximalTabs": maximalTabs });
    var applySettings = document.getElementById("apply_settings_select").value;
    browser.storage.local.set({ "applySettings": applySettings });
    var removeOption = document.getElementById("remove_option_select").value;
    browser.storage.local.set({ "removeOption": removeOption });
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
        if (value.applySettings === undefined) {
            document.getElementById("apply_settings_select").value = "global"
            browser.runtime.sendMessage({ type: "Settings changed" });
        } else {
            document.getElementById("apply_settings_select").value = value.applySettings;
        }
    });
    browser.storage.local.get("removeOption").then(function (value) {
        if (value.removeOption === undefined) {
            document.getElementById("remove_option_select").value = "newest"
            browser.runtime.sendMessage({ type: "Settings changed" });
        } else {
            document.getElementById("remove_option_select").value = value.removeOption;
            document.getElementById("test").innerHTML = value.removeOption;
        }
    });
}

// Add event listener for UI settings selements
document.getElementById('show_badge').addEventListener('change', storeSettings);
document.getElementById('maximal_tabs').addEventListener('change', storeSettings);
document.getElementById('apply_settings_select').addEventListener('change', storeSettings);
document.getElementById('remove_option_select').addEventListener('change', storeSettings);

restoreDefaults()