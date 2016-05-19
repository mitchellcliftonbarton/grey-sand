///// CONTENT SCRIPT  

var body = document.getElementsByTagName('body')[0];
var amount = 1;

function addImg() {
  var newImage = document.createElement('img');
  body.appendChild(newImage).className = 'shape img' + amount;
  $.post('https://pseudorandom-landscape.com/shapes', 'give me images', function(data) {
      newImage.src = data;
      newImage.style.opacity = '1';
  });
}

function mix(el) {
  function change(num) {
    $(el).css('-webkit-filter', 'blur(' + amount + 'px)');
    amount = amount + num;
  }

  $(window).on('scroll', function() {
    change(.18);
  });

  $(window).on('mousemove', function() {
    change(.04);
  });
}

var timer;
var bl = 0;
var nblur;

function ch() {
  nblur = $('.blur').css('-webkit-filter');
  var fslice = nblur.indexOf('(') + 1;
  var sslice = nblur.indexOf('px');
  nblur = nblur.substring(fslice, sslice) * 1;

  if (nblur > bl + 30) {
    bl = nblur;
    console.log('it worked ' + bl + ' ' + nblur);
    addImg();
    mix('.shape:first');
  } else {
    console.log('not blurry' + bl + ' ' + nblur);
  }
}

function check() {
  timer = setInterval(ch, 30000);
}

function createClose() {
  $(window).unload(function() {
    chrome.runtime.sendMessage({message: 'screenshot'}, function() {
      console.log('the close button was clicked, screenshot happening');
    });
  });
}

function blur() {
  $('body').wrapInner('<div class="blurry-container" />');
  setTimeout(function() {
    $('.blurry-container').addClass('blur');
    console.log('blurred');
    mix('.blur');
    addImg();
    check();
  }, 1000);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "hello" ) {
      blur();
      createClose();
    } else if (request.message === "dataUrl") {
      console.log('received data ' + dataUrl);
    }
  }
);