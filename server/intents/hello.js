'use strict'

module.exports.process = function(intentData,cb) {


// Install request by running "npm install --save request"
var request = require("request");

var options = { method: 'GET',
  url: 'https://api.us.apiconnect.ibmcloud.com/hendryrenaldbluemix-dev/sb/api/inventories',
  //qs: { filter: 'REPLACE_THIS_VALUE' },
  headers: 
   { accept: 'application/json',
     'x-ibm-client-secret': 'Q0vS2wE3vE5nY1yA0hC8pG8oR4lI7sB1yC3nW4kI6eL0gX2kQ5',
     'x-ibm-client-id': '3576a85c-f6a6-41f8-a3ce-fab83b43d124' } };

request(options, function (error, response, body) {
  if (error) return console.error('Failed: %s', error.message);

  console.log('Success: ', body);
     return cb(false,body)

});


    return cb(true,'Error from calling API Connect')

}