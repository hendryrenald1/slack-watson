'use strict'
let ConversationV1 = require('watson-developer-cloud/conversation/v1');

module.exports = function bluemixClient(token) {

    var response = {};
    var context = {};

    // Process the conversation response.
    function processResponse(err, res) {
        if (err) {
            console.error(err); // something went wrong
            return;
        }
        context = res.context;
        // Display the output from dialog, if any.
        if (res.output.text.length != 0) {
            console.log('Response In Process Response') ;
            console.log(res.output.text[0]);
            console.log('Bluemix Response Object :' + JSON.stringify(response));
        }
        //return(err,res);
    }

/*
    // Set up Conversation service wrapper.
    var conversation = new ConversationV1({
        username: 'fda39863-bcc6-4cd0-8677-3c4ed06743a6', // replace with username from service key
        password: '88u1QS2EiFhm', // replace with password from service key
        path: { workspace_id: 'cf3a083d-eab3-4eaa-82fe-ece097baa69e' }, // replace with workspace ID
        version_date: '2016-07-11'
    });
*/

    // Set up Conversation service wrapper.
    var conversation = new ConversationV1({
        username: "5edd518b-5bce-45d3-995c-c47d26dad6ee", // replace with username from service key
        password: "XVp4k7FwT5FS", // replace with password from service key
        path: { workspace_id: '3cfbd131-950b-4bdb-8d71-ca9fd3f0b9c2' }, // replace with workspace ID
        version_date: '2016-07-11'
    });
    // Start conversation with empty message.
    console.log(' :: Starting Conversation with Empty Message :: ')
    conversation.message({}, processResponse);

    const ask = function ask(question, cb) {
       console.log('Inside Question Asked :' + question);
        conversation.message({
            input: { text: question },
            context: this.context,
        }, (err, res) => {
            if (err) return cb(err);
            this.context = res.context;
            cb(err,res);
          //  const watsonResponse =processResponse(err,res);
        
        });

  
    }
  return {
        ask: ask
    }
    
}
