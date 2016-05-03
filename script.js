/////// CONTENT SCRIPT  

var body = document.getElementsByTagName('body')[0];

function mix() {

  var amount = 1;

  function change(num) {
    $('.blur').css('-webkit-filter', 'blur(' + amount + 'px)');
    amount = amount + num;
    // console.log('more blur, amount = ' + amount);
  }

  $(window).on('scroll', function() {
    change(.3);
  });

  $(window).on('mousemove', function() {
    change(.05);
  });
}

function addImg() {
  var newImage = document.createElement('img');
  body.appendChild(newImage).className = 'img-1';

  // newImage.src = 'icon-2.png';
  // $.get('http://pseudorandom-landscape.com/shapes', function() {
  //   console.log('shapez');
  // });

  $.post('http://pseudorandom-landscape.com/shapes', 'i want images', function(data) {
    alert(data);
  });
}

function createClose() {
  //create close button, and canvas elements
  // var newEl = document.createElement('div');
  // body.appendChild(newEl).className = "close-button";

  // var text = document.createElement('p');
  // var texttext = document.createTextNode('CLOSE');
  // text.appendChild(texttext);
  // newEl.appendChild(text);


  $(window).unload(function() {
    chrome.runtime.sendMessage({message: 'screenshot'}, function() {
      console.log('the close button was clicked, screenshot happening');
    });

    // chrome.runtime.onMessage.addListener(
    //   function(request, sender, sendResponse) {
    //     if( request.message === "sent image" ) {
    //       setTimeout(function() {
    //         return console.log('finished');
    //       }, 4000);
          
    //     }
    //   }
    // );
  });
  // setTimeout(function() {
  //   $('.close-button').css('opacity', '1');
  // }, 1000);

  // $()

  // $('.close-button').click(function() {
  //   // location.reload();
  //   chrome.runtime.sendMessage({message: 'screenshot'}, function() {
  //     console.log('the close button was clicked, screenshot happening');
  //   });
  //   // take();
  // });
}

function blur() {
  $('body').wrapInner('<div class="blurry-container" />');
  setTimeout(function() {
    $('.blurry-container').addClass('blur');
    console.log('blurred');
    mix();
    addImg();
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

    // else if ( request.message === "running" ) {
    //   console.log('received running');
    //   take();
    // }
  }
);