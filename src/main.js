//Video BroadCasting
var connection = new RTCMultiConnection();
connection.socketURL = '/';
connection.session = {
    audio: true,
    video: true,    
    oneway: true
};
connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: false,
    OfferToReceiveVideo: false
};
//............................................


//ScreenSharing
var connection_2 = new RTCMultiConnection();
connection_2.socketURL = '/';
connection_2.session = {
    screen:true,
    oneway: true
};
connection_2.sdpConstraints.mandatory = {
    OfferToReceiveAudio: false,
    OfferToReceiveVideo: false
};
//.............................................


//VideoConferencing
var connection_3 = new RTCMultiConnection();
connection_3.socketURL = '/';
connection_3.session = {
    audio:true,
    video:true
};
connection_3.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true
};
