///Google Analytics

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-61480746-3']);
_gaq.push(['_trackPageview']);

var ga

(function() {
  ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

//

function screenshot(e) {
  chrome.tabs.captureVisibleTab(null, {format: 'jpeg', quality: 100}, function(dataUrl) {
    var date = Date.now();
    var image = date + '-' + dataUrl;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://pseudorandom-landscape.com/sand', true);
    xhr.send(image);

    ga('send', 'event', 'sent and image = ' + image, 'screenshotted', 'BSWSGS');
  });
}

//

function start() {
  chrome.alarms.create("yay", {
    delayInMinutes: 200,
    periodInMinutes: 240
  });

  // chrome.alarms.create("yay", {
  //   delayInMinutes: 1,
  //   periodInMinutes: 2
  // });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendresponse) {
    if( request.message === "screenshot" ) {
      console.log('i got the screenshot message');
      screenshot();
    }
});

function sandy(id) {
  chrome.tabs.sendMessage(id, {message: "sandy"}, function(response) {
    console.log('alarm went off - running sandy')
  });
}

chrome.runtime.onInstalled.addListener(start);
chrome.alarms.onAlarm.addListener(function () {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];

    sandy(activeTab.id)
  });
});
