
chrome.devtools.panels.create("console2",
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

// 刷新
chrome.devtools.network.onNavigated.addListener(function () {

});


// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
  name: "console2"
});

backgroundPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId
});

backgroundPageConnection.onMessage.addListener(function (message) {
  console.log('收到了！')
  console.log(message)
  extPanelWindow.document.write(JSON.stringify(message))
});