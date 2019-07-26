// Isolated worlds do not allow for content scripts, the extension, and the web page to access any variables or functions created by the others.
// 隔离世界不允许内容脚本，扩展和网页访问其他人创建的任何变量或功能。

(function () {
  var sourceKey = 'console2'
  var scriptId = '__DEV_CONSOLE2__'

  // sendMessage
  window.addEventListener('message', function(event) {
    // Only accept messages from the same frame
    if (event.source !== window) {
      return;
    }

    var message;
    try {
      var message = JSON.parse(event.data);
    } catch (error) {
    }
  
    // Only accept messages that we know are ours
    if (typeof message !== 'object' || message === null ||
        !message.sourceKey === sourceKey) {
      return;
    }
  
    chrome.runtime.sendMessage(message.data);
  });

  // inject js
  const script = document.createElement('script')
  script.id = scriptId
  script.innerHTML = `
    window.console2 = function (title, data) {
      if (title === undefined) {
        return;
      } else if (typeof title === 'string') {
        data = data || {};
        data.title = title;
      } else {
        data = title;
      }

      var obj = {
        sourceKey: '${sourceKey}',
        data: data
      }

      window.postMessage(JSON.stringify(obj));
    }
    var s = document.getElementById('${scriptId}');
    s.parentNode.removeChild(s);
  `;

  (document.head || document.documentElement).appendChild(script);

})()
