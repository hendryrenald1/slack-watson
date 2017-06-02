'use strict'

const service = require('../server/service');
const http = require('http');
const slackClient = require('../server/slackClient');
var port = process.env.PORT || 8080;


//const slackToken = 'xoxb-153758522887-91C7Dcr9rF5qihnaTAblXi0g';

// const slackToken = 'xoxb-169017155153-DqKNc8TqjMpdKfd7dUkmY74O';
const slackToken = 'xoxb-190946398336-7eI48SSH4ICr0oonoc4dNUpV';


const slackLoglevel = 'verbose';

const bluemixToken = '';

// Connect to BlueMix client

const bluemixClient = require('../server/bluemixClient')(bluemixToken);


const rtm = slackClient.init(slackToken, slackLoglevel,bluemixClient);
rtm.start();


const server = http.createServer(service);


slackClient.addAuthenticatedHandler(rtm, () => server.listen(port));


server.on('listening', function () {
    console.log(` Chat bot is listening on server ${server.address().port} in  ${service.get('env')}`);

});