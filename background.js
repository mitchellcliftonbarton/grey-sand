function screenshot() {
  chrome.tabs.captureVisibleTab(
    null, {format: 'jpeg', quality: 100}, function(dataUrl) {
      var date = Date.now();
      var image = date + '-' + dataUrl;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '//pseudorandom-landscape.com/sand', true);
      xhr.send(image);
    });
}

///////////////////

function onInstalled() {
  chrome.alarms.create("yay", {
    delayInMinutes: .25,
    periodInMinutes: 720
  });
}

function onStartup() {
  chrome.alarms.create("yay", {
    delayInMinutes: 720,
    periodInMinutes: 720
  });
}

function onAlarm(alarm) {
  switch (alarm.name) {
    case 'yay': 
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "hello"}, function(response) {
          console.log('i think it went');
        });
      });
      break;

    default:
      console.log('nothing happened');
      break;
  }
}

chrome.runtime.onInstalled.addListener(onInstalled);
chrome.runtime.onStartup.addListener(onStartup);
chrome.alarms.onAlarm.addListener(onAlarm);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendresponse) {
    if( request.message === "screenshot" ) {
      console.log('i got the screenshot message');
      screenshot();
    }
});

