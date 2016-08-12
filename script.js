///// CONTENT SCRIPT

var body = document.getElementsByTagName('body')[0];
var amount = 1;

function mix(el, scroll, move) {
  function change(num) {
    $(el).css('-webkit-filter', 'blur(' + amount + 'px)');
    amount = amount + num;
  }

  $(window).on('scroll', function() {
    change(scroll);
  });

  $(window).on('mousemove', function() {
    change(move);
  });
}

function addImg() {
  var newImage = document.createElement('img');
  var am = Math.floor(amount);
  var cls = 'shape img' + am;
  var mxcls = ".img" + am;
  body.appendChild(newImage).className = cls;
  $.post('https://pseudorandom-landscape.com/shapes', 'give me images', function(data) {
      newImage.src = data;
      newImage.style.opacity = '1';
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

  if (nblur > bl + 10) {
    bl = nblur;
    console.log('it worked ' + bl + ' ' + nblur);
    addImg();
    mix('.shape:nth-last-child(2)', .9, .9);
  } else {
    console.log('not blurry' + bl + ' ' + nblur);
  }
}

function shot() {
  chrome.runtime.sendMessage({message: 'screenshot'}, function() {
    console.log('the close button was clicked, screenshot happening');
  });
}

function check() {
  timer = setInterval(ch, 22000);
}

function createClose() {
  $(document).keypress(function(e) {
    if (e.keyCode === 83 || e.keyCode === 115) {
      shot();
      console.log('pressed delete ' + e.keyCode);
      $('.blurry-container').contents().unwrap();
      $('.shape').remove();
    } else if (e.keyCode === 67 || e.keycode === 99) {
      console.log('pressed delete without save' + e.keyCode);
      $('.blurry-container').contents().unwrap();
      $('.shape').remove();
    } else {
      console.log('pressed ' + e.keyCode);
    }
  });

  $(window).unload(function() {
    shot();
  });
}

function blur() {
  $('body').wrapInner('<div class="blurry-container" />');
  setTimeout(function() {
    $('.blurry-container').addClass('blur');
    console.log('blurred');
    mix('.blur', .95, .95);
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
