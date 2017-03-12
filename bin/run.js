'use strict'

const service = require('../server/service');
const http = require('http');
const slackClient = require('../server/slackClient');
var port = process.env.PORT || 8080;


const slackToken = 'xoxb-153758522887-91C7Dcr9rF5qihnaTAblXi0g';
const slackLoglevel = 'verbose';

const bluemixToken = '';

const bluemixClient = require('../server/bluemixClient')(bluemixToken);


const rtm = slackClient.init(slackToken, slackLoglevel,bluemixClient);
rtm.start();


const server = http.createServer(service);


slackClient.addAuthenticatedHandler(rtm, () => server.listen(port));


server.on('listening', function () {
    console.log(` Chat bot is listening on server ${server.address().port} in  ${service.get('env')}`);

});