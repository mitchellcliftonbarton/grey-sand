var image;
var oauth = ChromeExOAuth.initBackgroundPage({
  'request_url': 'https://www.tumblr.com/oauth/request_token',
  'authorize_url': 'https://www.tumblr.com/oauth/authorize',
  'access_url': 'https://www.tumblr.com/oauth/access_token',
  'consumer_key': 'z0lAIsL6mGl4Ibxf4BbUsL9yOr4r6CIHhqoTA8a78amAbB7Wh5',
  'consumer_secret': 'PuKSTNfX8RPaKfFXacAs1w1C6Bg52CvCKny0bvNIsSj7FRsLVb',
  'scope': 'http://black-sand-white-sand-grey-sand.tumblr.com/',
  'app_name': 'Black Sand White Sand Grey Sand'
});

function onAuthorized() {
  var url = 'api.tumblr.com/v2/blog/black-sand-white-sand-grey-sand.tumblr.com/post';
  var request = {
    'method': 'POST', 
    'body': {
      'type': 'photo',
      'state': 'published', 
      'date': 'null', 
      'source': image,
      'data': image,
      'data64': image
    }
  }

  oauth.sendSignedRequest(url, null, request);
}

function tummy() {
  oauth.authorize(onAuthorized);
}


function screenshot() {
  chrome.tabs.captureVisibleTab(
    null, {format: 'jpeg', quality: 100}, function(dataUrl) {
      // console.log('took ' + dataUrl);
      image = dataUrl;
      tummy();
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

