const express = require('express');
const sh = require('shelljs');
const {spawn} = require('child_process');
const fs = require('fs'); 

module.exports = function(app, express) {

	let router = express.Router();

	app.get('/api/test', function(req, res) {
		console.log("running"); 
		const pythonProcess = spawn('python', ['./PythonScripts/gettraffic2.py']); 

		pythonProcess.stdout.on('data', (data) => {
			// Do something with the data returned from python script
			/*let sentPackets = fs.readFileSync('./internthing1.json', 'utf8'); 
			let receivedPackets = fs.readFileSync('./externthing1.json', 'utf8'); 
			console.log(sentPackets); 
			console.log(receivedPackets); */
			res.status(200).send({
				data: "hello World"
			})
		});

		pythonProcess.stderr.on('data', (data) => {
        	console.log(data.toString()); 
   	 	});
	});


}