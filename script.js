var body = document.getElementsByTagName('body')[0];

function mix() {

  var amount = 1;

  function change() {
    $('.blur').css('-webkit-filter', 'blur(' + amount + 'px)');
    amount = amount + .05;
    console.log('more blur, amount = ' + amount);
  }

  $(window).on('scroll', function() {
    change();
  });
}

function createClose() {
  ///create close button, and canvas elements
  var newEl = document.createElement('div');
  body.appendChild(newEl).className = "close-button";

  var text = document.createElement('p');
  var texttext = document.createTextNode('CLOSE');
  text.appendChild(texttext);
  newEl.appendChild(text);

  var can = document.createElement('canvas');
  can.id = "main-canvas";
  body.appendChild(can);

  var c = document.getElementById('main-canvas');

  ///figure out canvas size

  var ww;
  var wh;

  function getSize() {
    ww = $(document).width();
    wh = $(document).height();
    c.width = ww;
    c.height = wh;
    console.log(ww + ' ' + wh);
  }
  getSize();
  var ctx = c.getContext('2d');

  $(window).resize(function() {
    getSize();
  });



  setTimeout(function() {
    $('.close-button').css('opacity', '1');
  }, 1000);

  $('.close-button').click(function() {
    location.reload();
  });
}

function blur() {
  $('body').wrapInner('<div class="blurry-container" />');
  setTimeout(function() {
    $('.blurry-container').addClass('blur');
    console.log('blurred');
    mix();
  }, 1000);


}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "hello" ) {
      blur();
      createClose();
    }
  }
);