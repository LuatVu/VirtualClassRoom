              
connection_2.socketMessageEvent = 'screen-sharing-demo';

connection_2.videosContainer = document.getElementById('screens-container');
connection_2.onstream = function(event) {
    connection_2.videosContainer.appendChild(event.mediaElement);
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
            
                    



            