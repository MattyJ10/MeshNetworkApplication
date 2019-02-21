const cron = require('node-cron'); 
const path = require('path'); 

//each server on the nodes will intermittently send http requests out to every other node and ask for them to send their files back

//setup a function that is listening for request and send back the files that are requested
//https://stackoverflow.com/questions/25463423/res-sendfile-absolute-path