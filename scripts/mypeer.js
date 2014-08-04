(function(window, document,navigator, peer){


var peerID = location.search.split('?')[1];


navigator.getCamera = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);


var peer = new Peer({ key: 'ev2maiejx9u23xr',
						debug: 3,
						config: {'iceServers': [
						{ url: 'stun:stun.l.google.com:19302' },
						{ url: 'stun:stun1.l.google.com:19302' },
						{ url: 'turn:numb.viagenie.ca', username:"lisa@learnfromlisa.com", credential:"22paris22"},
						{ url: 'turn:192.158.29.39:3478?transport=udp',
							credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
							username: '28224511:1379330808'}
						]}});



peer.on('open', function(id) {
  $('#my-id').text(peer.id);
  console.log('http://schonstal.com/webrtc/index.html?' + id);
});

peer.on('call', function(call) {
	// Answer automatically for demo
	call.answer(window.localStream);
});

peer.on('error', function(err) {
	console.log('Peer Error' + err);
});


navigator.getCamera(//{audio: true, video: true}
{audio: false, video:  { mandatory: { chromeMediaSource: 'screen'}, optional: []}}


	, function(stream){
		// Display the video stream in the video object
		$('#my-video').prop('src', URL.createObjectURL(stream));

		window.localStream = stream;

		if(peerID) {
			var call = peer.call(peerID, window.localStream);

			call.on('stream', function(stream) {
				$('#their-video').prop('src', URL.createObjectURL(stream));
			});
		}

	}, function(err){ console.log(err)});


$(function() {
	$('#share-screen').click(function() {
		navigator.getCamera({audio: false, video:  {
										       mandatory: {
										           chromeMediaSource: 'screen'
										       },
										       optional: []}}
										 , function(stream){

				var call = peer.call(peerID, stream);

			}

		, function(err){ console.log(err)});

		var call = peer.call(peerID, window.localStream);
		
	});

});




})(window, document,navigator, Peer);