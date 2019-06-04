connection_3.socketMessageEvent = 'video-conference-demo';

connection_3.videosContainer = document.getElementById('ConferenceRoom');
connection_3.onstream = function(event) {
    var existing = document.getElementById(event.streamid);
    if(existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
    }

    event.mediaElement.removeAttribute('src');
    event.mediaElement.removeAttribute('srcObject');
    event.mediaElement.muted = true;
    event.mediaElement.volume = 0;

    var video = document.createElement('video');

    try {
        video.setAttributeNode(document.createAttribute('autoplay'));
        video.setAttributeNode(document.createAttribute('playsinline'));
        
    } catch (e) {
        video.setAttribute('autoplay', true);
        video.setAttribute('playsinline', true);
    }


    video.srcObject = event.stream;

    var width = parseInt(connection_3.videosContainer.clientWidth / 3) - 20;
    var mediaElement = getHTMLMediaElement(video, {
        title: event.userid,
        buttons: ['full-screen'],
        width: width,
        showOnMouseEnter: false
    });

    connection_3.videosContainer.appendChild(mediaElement);
    
    mediaElement.id = event.streamid;

    if(event.type === 'local') {
      connection_3.socket.on('disconnect', function() {
        if(!connection_3.getAllParticipants().length) {
          location.reload();
        }
      });
    }
};


connection_3.onstreamended = function(event) {
    var mediaElement = document.getElementById(event.streamid);
    if (mediaElement) {
        mediaElement.parentNode.removeChild(mediaElement);
        alert('Video conferencing is ended');
    }
};

connection_3.onMediaError = function(e) {
    if (e.message === 'Concurrent mic process limit.') {
        if (DetectRTC.audioInputDevices.length <= 1) {
            alert('Please select external microphone. Check github issue number 483.');
            return;
        }

        var secondaryMic = DetectRTC.audioInputDevices[1].deviceId;
        connection_3.mediaConstraints.audio = {
            deviceId: secondaryMic
        };

        connection_3.join(connection_3.sessionid);
    }
};



