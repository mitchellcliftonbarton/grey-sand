///// CONTENT SCRIPT

var body = document.body;
var amount = 1;

function mix(el, scroll, move) {
  function change(num) {
    document.querySelector(el).style.WebkitFilter = 'blur(' + amount + 'px)'
    amount = amount + num;
  }

  window.addEventListener('scroll', function() {
    change(scroll);
  })

  window.addEventListener('mousemove', function() {
    change(move);
  })
}

function addImg() {
  var newImage = document.createElement('img');
  var am = Math.floor(amount);
  var cls = 'shape img' + am;
  var mxcls = ".img" + am;
  body.appendChild(newImage).className = cls;

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://pseudorandom-landscape.com/shapes', true)
  xhr.send('give me images')

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      newImage.src = xhr.response;
      newImage.style.opacity = '.7';
    }
  }
}

var timer;
var bl = 0;
var nblur;

// function ch() {
//   nblur = $('.blur').css('-webkit-filter');
//   var fslice = nblur.indexOf('(') + 1;
//   var sslice = nblur.indexOf('px');
//   nblur = nblur.substring(fslice, sslice) * 1;
//
//   if (nblur > bl + 8) {
//     bl = nblur;
//     console.log('it worked ' + bl + ' ' + nblur);
//     addImg();
//     mix('.shape:nth-last-child(2)', 1.5, 1.5);
//   } else {
//     console.log('not blurry' + bl + ' ' + nblur);
//   }
// }

function shot() {
  chrome.runtime.sendMessage({message: 'screenshot'}, function() {
    console.log('the close button was clicked, screenshot happening');
  });
}

// function check() {
//   timer = setInterval(ch, 22000);
// }

function createClose() {
  document.addEventListener('keypress', function(e) {
    var shape = document.querySelector('.shape');
    var container = document.querySelector('.blurry-container')
    var containerParent = container.parentNode

    if (e.keyCode === 83 || e.keyCode === 115) {
      shot();
      console.log('pressed delete! ' + e.keyCode);
      shape.parentNode.removeChild(shape);
      while (container.firstChild) containerParent.insertBefore(container.firstChild, container);
      containerParent.removeChild(container);

    } else if (e.keyCode === 99 || e.keycode === 67) {
      console.log('pressed delete without save!' + e.keyCode);
      shape.parentNode.removeChild(shape);
      while (container.firstChild) containerParent.insertBefore(container.firstChild, container);
      containerParent.removeChild(container);
    } else {
      console.log('pressed ' + e.keyCode);
    }
  })

  window.addEventListener('beforeunload', function() {
    shot();
  })
}

function blur() {
  var wrapper = document.createElement('div')
  body.parentNode.insertBefore(wrapper, body);
  wrapper.appendChild(body);
  wrapper.className = 'blurry-container'

  setTimeout(function() {
    document.querySelector('.blurry-container').classList.add('blur');
    console.log('blurred');
    mix('.blur', 1.55, 1.55);
    addImg();
    // check();
  }, 1000);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === 'sandy' ) {
      console.log('starting sandy')
      blur();
      createClose();
    } else if (request.message === "dataUrl") {
      console.log('received data ' + dataUrl);
    }
  }
);
