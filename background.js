function onInstalled() {
  chrome.alarms.create("yay", {
    delayInMinutes: .25,
    periodInMinutes: 5
  });
}

function onStartup() {
  chrome.alarms.create("yay1", {
    when: 15000,
    periodInMinutes: 1
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

    case 'yay1': 
      alert('yay1 went off'); 
      break;

    default:
      alert('nothing happened');
      break;
  }
}

chrome.runtime.onInstalled.addListener(onInstalled);
chrome.runtime.onStartup.addListener(onStartup);
chrome.alarms.onAlarm.addListener(onAlarm);

