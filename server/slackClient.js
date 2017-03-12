var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var rtm =null;
var bot_token = process.env.SLACK_BOT_TOKEN || '';
var nlp =null;

module.exports.init = function slackClient(token, logLevel,nlpClient) {

    nlp = nlpClient;
    rtm = new RtmClient(token, { logLevel: logLevel });
    addAuthenticatedHandler(rtm, handleOnAuthenticated);
       rtm.on(RTM_EVENTS.MESSAGE,handleOnMessage);
    return rtm;
}

function handleOnAuthenticated(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

function handleOnMessage(message){

//console.log('Execuring in handle Message :');
console.log(message);
    nlp.ask(message.text, (err,res)=> {
        if (err){
            console.log(err);
            return;

        }

//    console.log(res);

     if (!res.intents) {
           rtm.sendMessage('Sorry!! I dont know what you are talking about',message.channel);
     } else if(res.intents[0].intent=='hello') {
           rtm.sendMessage('Hi '+ res.output.text[0],message.channel);
     }   
    
    });

 console.log('After calling ask method');
    
}


function addAuthenticatedHandler(rtm, handler) {

    // The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload if you want to cache it
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
 
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;
/*

// you need to wait for the client to fully connect before you can send messages
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
    rtm.sendMessage("Hello!", channel);
});

rtm.start();
*/