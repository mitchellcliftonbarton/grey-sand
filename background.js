var image;

// var xhr = new XMLHttpRequest();
// // xhr.onreadystatechange = handleStateChange;
// xhr.open('POST', 'http://pseudorandom-landscape.com/sand', true);
// xhr.send();

function screenshot() {
  chrome.tabs.captureVisibleTab(
    null, {format: 'jpeg', quality: 100}, function(dataUrl) {
      // console.log('took ' + dataUrl);
      image = dataUrl;
      var xhr = new XMLHttpRequest();
      // xhr.onreadystatechange = handleStateChange;
      xhr.open('POST', 'http://pseudorandom-landscape.com/sand', true);
      xhr.send('hi there');
      // $.post("http://pseudorandom-landscape.com/sand", image);
      // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      //   var activeTab = tabs[0];
      //   chrome.tabs.sendMessage(activeTab.id, {"message": "dataUrl"}, function(response) {
      //     console.log('sent data');
      //   });
      // });
    });
}

///////////////////

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

chrome.runtime.onMessage.addListener(
  function(request, sender, sendresponse) {
    if( request.message === "screenshot" ) {
      console.log('i got the screenshot message');
      screenshot();
    }
});

