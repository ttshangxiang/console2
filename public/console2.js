
chrome.devtools.panels.create("Console2",
  "",
  "index.html",
  function (panel) {
    // 控制panel页面
    panel.onShown.addListener(function (w) {
      extPanelWindow = w;
    });
  }
);

let extPanelWindow = {};

// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
  name: "console2"
});

backgroundPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId
});

// Relay the tab ID to the background page
function inject () {
  backgroundPageConnection.postMessage({
    name: 'inject',
    tabId: chrome.devtools.inspectedWindow.tabId,
    contentScript: "contentScript.js"
  });
}

inject();

// 刷新
chrome.devtools.network.onNavigated.addListener(function () {
  inject();
});

// 未能发送的数据
var notSends = [];
// 发送数据到react
backgroundPageConnection.onMessage.addListener(function (message) {
  // 缓存未发送数据
  if (!extPanelWindow.sendConsole2) {
    notSends.push(message);
    return;
  }
  const list = notSends.concat(message);
  extPanelWindow.sendConsole2(list);
  notSends = [];
});

// 循环判断，发送缓存数据
setInterval(() => {
  if (notSends.length > 0 && extPanelWindow.sendConsole2) {
    extPanelWindow.sendConsole2(notSends);
    notSends = [];
  }
}, 1000);
