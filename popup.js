// document.addEventListener('DOMContentLoaded', function() {
//   var button = document.getElementById('button');
//   button.addEventListener('click', function() {
//     console.log('asdf;klj');
//   });

// });

// chrome.browserAction.onClicked.addListener(function() {
//   chrome.tabs.executeScript({
//     code: 'document.body.style.backgroundColor="red"'
//   });
// });
$(document).ready(function() {
  $('#on-button').click(function() {
    console.log('you clicked the on button');
  });
});



