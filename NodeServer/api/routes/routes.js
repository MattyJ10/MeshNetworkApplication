const express = require('express');
const fileController = require('../Controllers/fileController.js'); 

const ip = '172.0.27.90'; 

module.exports = function(req, res) {
	let router = express.Router();

	//setup a function that is listening for request and send back the files that are requested
	//https://stackoverflow.com/questions/25463423/res-sendfile-absolute-path
	app.get("/getFile", (req, res) => {
		res.sendFile(path.join(__dirname, './', 'iplog' + ip + '.json')); 
	})
}



