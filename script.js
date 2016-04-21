function mix() {
  // var w = $(window);
  // var lastPos = w.scrollTop();
  // function poop() {
  //   console.log('fire');
  // };

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
    }
  }
);