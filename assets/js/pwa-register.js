if ('serviceWorker' in navigator) {
	//Add this below content to your HTML page, or add the js file to your page at the very top to register service worker
	if (navigator.serviceWorker.controller) {
	  console.log('[PWA Builder] active service worker found, no need to register')
	} else {
	  //Register the ServiceWorker
	  window.addEventListener('load', function () {
		navigator.serviceWorker.register('/barilochetotal/pwabuilder-sw.js', {
		  scope: '/barilochetotal'
		}).then(function (reg) {
		  console.log('Service worker has been registered for scope:' + reg.scope);
		});
	  });
	  var worker = new Worker('/barilochetotal/pwabuilder-sw.js');
  
	  worker.addEventListener('message', function (e) {
		console.log('Worker said: ', e.data);
	  }, false);
  
	  worker.postMessage('Worker doing work!');
	}
  } else {
	console.log("Navegador não aceita serviceWorker");
  }
