var tab_id;
var processes = chrome.processes;

chrome.browserAction.onClicked.addListener(function (tab) {
    tab_id = tab.id;
    processes.getProcessIdForTab(tab.id, function (processId) {
        if (!isNaN(parseFloat(processId)) && isFinite(processId)) {
            processes.terminate(processId);
        }
    });
});

processes.onExited.addListener(function (id, exitType, exitCode) {
    if (exitType == 2 && exitCode == 15) {
        chrome.tabs.reload(tab_id);
    }
});
