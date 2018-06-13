///Google Analytics

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-61480746-3']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

function screenshot(e) {
  chrome.tabs.captureVisibleTab(
    null, {format: 'jpeg', quality: 100}, function(dataUrl) {
      var date = Date.now();
      var image = date + '-' + dataUrl;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://pseudorandom-landscape.com/sand', true);
      xhr.send(image);
    });

  ga('send', 'event', 'sent and image = ' + image, 'screenshotted', 'BSWSGS');
}

///////////////////

function start() {
  chrome.alarms.create("yay", {
    delayInMinutes: 200,
    periodInMinutes: 240
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendresponse) {
    if( request.message === "screenshot" ) {
      console.log('i got the screenshot message');
      screenshot();
    }
});

function sandy() {

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "hello"}, function(response) {
      console.log('i think it went');
    });
  });

  chrome.alarms.getAll(function(alarms) {
    console.log(alarms);
  });
}

chrome.runtime.onInstalled.addListener(start);

chrome.alarms.onAlarm.addListener(sandy);
