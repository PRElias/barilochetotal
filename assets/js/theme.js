jQuery(document).ready(function($){

    // Smooth on external page
    $(function() {
      setTimeout(function() {
        if (location.hash) {
          /* we need to scroll to the top of the window first, because the browser will always jump to the anchor first before JavaScript is ready, thanks Stack Overflow: http://stackoverflow.com/a/3659116 */
          window.scrollTo(0, 0);
          target = location.hash.split('#');
          smoothScrollTo($('#'+target[1]));
        }
      }, 1);

      // taken from: https://css-tricks.com/snippets/jquery/smooth-scrolling/
      $('a[href*=\\#]:not([href=\\#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          smoothScrollTo($(this.hash));
          return false;
        }
      });

      function smoothScrollTo(target) {
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
        }
      }
    });
	
	
	// toggle comments
    $('.show-comments').on('click', function() {  
		$('#comments').toggleClass('comments--show');		
	});

	//toggle search
	$('.show-search').on('click', function() {  
		$('.bd-search').toggleClass('search--show');		
	});
    
    // spoilers
     $(document).on('click', '.spoiler', function() {
        $(this).removeClass('spoiler');
     });
    
 });   

// deferred style loading
var loadDeferredStyles = function () {
	var addStylesNode = document.getElementById("deferred-styles");
	var replacement = document.createElement("div");
	replacement.innerHTML = addStylesNode.textContent;
	document.body.appendChild(replacement);
	addStylesNode.parentElement.removeChild(addStylesNode);
};
var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
if (raf) raf(function () {
	window.setTimeout(loadDeferredStyles, 0);
});
else window.addEventListener('load', loadDeferredStyles);


// Reset animations on page: body.preload
setTimeout(function(){
	document.body.className="";
},500);

// Open/close navigation when clicked .nav-icon
$(document).ready(function(){
	$('.nav-icon').click(function(){
		$('.nav-icon').toggleClass('active');
	});
	$(".nav-icon").click(function(){
		$("#menu").toggleClass('active');
	});
	$(".nav-icon").click(function(){
		$("#blackover-nav").toggleClass('active');
	});
	$(".nav-icon").click(function(){
		$("body").toggleClass('active-side');
	});
});

// Close navigation when clicked .blackover (Black background)
$(document).ready(function(){
	$("#blackover-nav").click(function(){
		$(".nav-icon").removeClass('active');
	});
	$("#blackover-nav").click(function(){
		$("#menu").removeClass('active');
	});
	$("#blackover-nav").click(function(){
		$("#blackover-nav").removeClass('active');
	});
	$("#blackover-nav").click(function(){
		$("body").removeClass('active-side');
	});
});

// Grid selector Inspiration
$(document).ready(function(){
	$(".grid-selector").click(function(){
		$(".grid-selector").toggleClass('active');
	});
	$(".grid-selector").click(function(){
		$(".post").toggleClass('active');
	});
});

$(document).keyup(function(e) {
	if (e.keyCode == 27) { 
		$(".nav-icon").removeClass('active');
		$("#menu").removeClass('active');
		$("#blackover-nav").removeClass('active');
		$("body").removeClass('active-side');
	}
});


// remove all :hover stylesheets on mobile
function hasTouch() {
return 'ontouchstart' in document.documentElement
		|| navigator.maxTouchPoints > 0
		|| navigator.msMaxTouchPoints > 0;
}

if (hasTouch()) { 
	try {
		for (var si in document.styleSheets) {
			var styleSheet = document.styleSheets[si];
			if (!styleSheet.rules) continue;

			for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
				if (!styleSheet.rules[ri].selectorText) continue;

				if (styleSheet.rules[ri].selectorText.match(':hover')) {
					styleSheet.deleteRule(ri);
				}
			}
		}
	} catch (ex) {}
}


$(document).ready(function(){

    //Check to see if the window is top if not then display button
    $(window).scroll(function(){
        if ($(this).scrollTop() > 300) {
            $('.scroll-top').addClass('active');
        } else {
            $('.scroll-top').removeClass('active');
        }
    });

    //Click event to scroll to top
    $('.scroll-top').click(function(){
        $('html, body').animate({scrollTop : 0},300);
        return false;
    });

});


// DOCS

$(document).ready(function(){
    

     //Check to see if the back-menu is in the div
    $(window).scroll(function(){
        if ($(this).scrollTop() > 130) {
            $('.back-page-button-dark').removeClass('back-page-button-w');
        } else {
            $('.back-page-button-dark').addClass('back-page-button-w');
        }
    });


});


// PWA

if ('serviceWorker' in navigator) {
	//Add this below content to your HTML page, or add the js file to your page at the very top to register service worker
	if (navigator.serviceWorker.controller) {
	  console.log('[PWA Builder] active service worker found, no need to register')
	} else {
	  //Register the ServiceWorker
	  window.addEventListener('load', function () {
		navigator.serviceWorker.register('/assets/pwa/pwabuilder-sw.js', {
		  scope: './'
		}).then(function (reg) {
		  console.log('Service worker has been registered for scope:' + reg.scope);
		});
	  });
	  var worker = new Worker('/assets/pwa/pwabuilder-sw.js');
  
	  worker.addEventListener('message', function (e) {
		console.log('Worker said: ', e.data);
	  }, false);
  
	  worker.postMessage('Worker doing work!');
	}
  } else {
	console.log("Navegador não aceita serviceWorker");
  }
