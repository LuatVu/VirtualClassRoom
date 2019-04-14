connection_3.socketMessageEvent = 'video-conference-demo';

connection_3.videosContainer = document.getElementById('videos-container');
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
        video.setAttributeNode(document.createAttribute('controls'));
    } catch (e) {
        video.setAttribute('autoplay', true);
        video.setAttribute('playsinline', true);
    }

    if(event.type === 'local') {
      video.volume = 0;
      try {
          video.setAttributeNode(document.createAttribute('muted'));
      } catch (e) {
          video.setAttribute('muted', false);
      }
    }
    video.srcObject = event.stream;

    var width = parseInt(connection_3.videosContainer.clientWidth / 3) - 20;
    // var mediaElement = getHTMLMediaElement(video, {
    //     title: event.userid,
    //     buttons: ['full-screen'],
    //     width: width,
    //     showOnMouseEnter: false
    // });

    // connection_3.videosContainer.appendChild(mediaElement);
    connection_3.videosContainer.appendChild(video);
    video.id = event.streamid;
    


    // to keep room-id in cache
    // localStorage.setItem(connection_3.socketMessageEvent, connection_3.sessionid);

    // chkRecordConference.parentNode.style.display = 'none';

    // if(chkRecordConference.checked === true) {
    //   btnStopRecording.style.display = 'inline-block';
    //   recordingStatus.style.display = 'inline-block';

    //   var recorder = connection_3.recorder;
    //   if(!recorder) {
    //     recorder = RecordRTC([event.stream], {
    //       type: 'video'
    //     });
    //     recorder.startRecording();
    //     connection_3.recorder = recorder;
    //   }
    //   else {
    //     recorder.getInternalRecorder().addStreams([event.stream]);
    //   }

    //   if(!connection_3.recorder.streams) {
    //     connection_3.recorder.streams = [];
    //   }

    //   connection_3.recorder.streams.push(event.stream);
    //   recordingStatus.innerHTML = 'Recording ' + connection_3.recorder.streams.length + ' streams';
    // }



    if(event.type === 'local') {
      connection_3.socket.on('disconnect', function() {
        if(!connection_3.getAllParticipants().length) {
          location.reload();
        }
      });
    }
};

// var recordingStatus = document.getElementById('recording-status');
// var chkRecordConference = document.getElementById('record-entire-conference');
// var btnStopRecording = document.getElementById('btn-stop-recording');
// btnStopRecording.onclick = function() {
//   var recorder = connection_3.recorder;
//   if(!recorder) return alert('No recorder found.');
//   recorder.stopRecording(function() {
//     var blob = recorder.getBlob();
//     invokeSaveAsDialog(blob);

//     connection_3.recorder = null;
//     btnStopRecording.style.display = 'none';
//     recordingStatus.style.display = 'none';
//     chkRecordConference.parentNode.style.display = 'inline-block';
//   });
// };

connection_3.onstreamended = function(event) {
    var mediaElement = document.getElementById(event.streamid);
    if (mediaElement) {
        mediaElement.parentNode.removeChild(mediaElement);
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

// ..................................
// ALL below scripts are redundant!!!
// ..................................

