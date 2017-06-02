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



// This function is used to handle the messages that are coming from Slack

function handleOnMessage(message){

console.log('Execuring  in handle Message :'+ JSON.stringify(message));
// The messages is then sent to Ask Method

console.log(message);
    nlp.ask(message.text, (err,res)=> {
        if (err){
            console.log(err);
            return;

        }

// The response is retrived from the bluemix 

    console.log(res);
console.log((!res.intents));

// Based on the Intent the messages are processed and return back to Slack Client

    if (!res.intents) {
        rtm.sendMessage('Sorry!! I dont know what you are talking about',message.channel);
        return;
    }

    
    const intent = require('./intents/'+ res.intents[0].intent);

    intent.process(res,function(error,response){
     //    rtm.sendMessage(response + res.output.text[0],message.channel);
        rtm.sendMessage(response,message.channel);

    });

/*
     if (!res.intents) {
           rtm.sendMessage('Sorry!! I dont know what you are talking about',message.channel);
  } else if(res.intents[0].intent=='hello') {
           rtm.sendMessage('Hi '+ res.output.text[0],message.channel); 
     } else if (res.output.text.length <= 0) {
           rtm.sendMessage("Sorry I don't know what you say",message.channel);
     }  else  {
           rtm.sendMessage('Response from Watson: '+ res.output.text[0],message.channel);
     }*/
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