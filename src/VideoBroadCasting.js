
connection.socketMessageEvent = 'video-broadcast-demo';

connection.videosContainer = document.getElementById('videoconference');
connection.onstream = function(event) {
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
        // video.setAttributeNode(document.createAttribute('controls'));
    } catch (e) {
        video.setAttribute('autoplay', true);
        video.setAttribute('playsinline', true);        
    }

    // if(event.type === 'local') {
    //   video.volume = 0;
    //   try {
    //       video.setAttributeNode(document.createAttribute('muted'));
    //   } catch (e) {
    //       video.setAttribute('muted', false);
    //   }
    // }
    video.srcObject = event.stream;

    var width = parseInt(connection.videosContainer.clientWidth );
<<<<<<< HEAD
    var height = parseInt(connection.videosContainer.clientHeight );
=======
    var height = parseInt(connection.videosContainer.clientHeight )-7;
>>>>>>> Temp
    
    var mediaElement = getHTMLMediaElement(video, {
        title: event.userid,
        buttons: ['full-screen'],
        width: width,
        height:height,
        showOnMouseEnter: false
    });
<<<<<<< HEAD
    
=======

>>>>>>> Temp
    connection.videosContainer.appendChild(mediaElement);
    // connection.videosContainer.appendChild(video);
    setTimeout(function() {
        mediaElement.media.play();
    }, 5000);

    mediaElement.id = event.streamid;
    // video.id = event.streamid;

    // setTimeout(function() {
    //     mediaElement.media.play();
    // }, 5000);

    // mediaElement.id = event.streamid;
};

connection.onstreamended = function(event) {
    var mediaElement = document.getElementById(event.streamid);
    if (mediaElement) {
        mediaElement.parentNode.removeChild(mediaElement);
        alert('Broadcast is ended');
        // if(event.userid === connection.sessionid && !connection.isInitiator) {
        //   alert('Broadcast is ended. We will reload this page to clear the cache.');
        //   location.reload();
        // }
    }
};

connection.onMediaError = function(e) {
    if (e.message === 'Concurrent mic process limit.') {
        if (DetectRTC.audioInputDevices.length <= 1) {
            alert('Please select external microphone. Check github issue number 483.');
            return;
        }

        var secondaryMic = DetectRTC.audioInputDevices[1].deviceId;
        connection.mediaConstraints.audio = {
            deviceId: secondaryMic
        };

        connection.join(connection.sessionid);
    }
};