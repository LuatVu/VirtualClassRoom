              
connection_2.socketMessageEvent = 'screen-sharing-demo';

connection_2.videosContainer = document.getElementById('screensharing');


connection_2.onstream = function(event) {    
    
    var video = document.createElement('video');

    try {
        video.setAttributeNode(document.createAttribute('autoplay'));
        video.setAttributeNode(document.createAttribute('playsinline'));
        // video.setAttributeNode(document.createAttribute('controls'));
    } catch (e) {
        video.setAttribute('autoplay', true);
        video.setAttribute('playsinline', true);        
    }
    video.srcObject = event.stream;

    var width = parseInt(connection_2.videosContainer.clientWidth);    
    var mediaElement = getHTMLMediaElement(video,{
        buttons:['full-screen'],
        width:width,        
        showOnMouseEnter: false
    })
    
    connection_2.videosContainer.appendChild(mediaElement);

    setTimeout(function() {
        mediaElement.media.play();
    }, 5000);

    mediaElement.id = event.streamid;
};





// Using getScreenId.js to capture screen from any domain
// You do NOT need to deploy Chrome Extension YOUR-Self!!
connection_2.getScreenConstraints = function(callback) {
    if (DetectRTC.browser.name === 'Edge') {
        callback('Edge requires navigator.getDisplayMedia.');
        return;
    }

    getScreenConstraints(function(error, screen_constraints) {
    if (!error) {
        screen_constraints = connection_2.modifyScreenConstraints(screen_constraints);
        callback(error, screen_constraints);
        return;
    }
    throw error;
    });
};
            
                    



            