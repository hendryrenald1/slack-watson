'use strict'
let ConversationV1 = require('watson-developer-cloud/conversation/v1');

module.exports = function bluemixClient(token) {

    var response = {};

    // Process the conversation response.
    function processResponse(err, res) {
        if (err) {
            console.error(err); // something went wrong
            return;
        }
        response = res;
        // Display the output from dialog, if any.
        if (res.output.text.length != 0) {
            console.log('Response In Process Response') ;
            console.log(res.output.text[0]);
        }
        return(err,res);
    }


    // Set up Conversation service wrapper.
    var conversation = new ConversationV1({
        username: 'fda39863-bcc6-4cd0-8677-3c4ed06743a6', // replace with username from service key
        password: '88u1QS2EiFhm', // replace with password from service key
        path: { workspace_id: 'cf3a083d-eab3-4eaa-82fe-ece097baa69e' }, // replace with workspace ID
        version_date: '2016-07-11'
    });

    // Start conversation with empty message.
    conversation.message({}, processResponse);

    const ask = function ask(question, cb) {

        // console.log(message);
        //console.log(token);
        console.log('Inside Question Asked :' + question);
        conversation.message({
            input: { text: question },
            context: response.context,
        }, (err, res) => {
            if (err) return cb(err);
            cb(err,res);
            const watsonResponse =processResponse(err,res);
        
        });

  
    }
  return {
        ask: ask
    }
    
}
