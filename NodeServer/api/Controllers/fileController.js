const cron = require('node-cron'); 
const path = require('path'); 
const sh = require('shelljs');
const {spawn} = require('child_process');
const fs = require('fs');
const request = require('request'); 

const ips = ['172.27.0.90', '172.27.0.15']; 

//each server on the nodes will intermittently send http requests out to every other node and ask for them to send their files back

//setup a function that is listening for request and send back the files that are requested
//https://stackoverflow.com/questions/25463423/res-sendfile-absolute-path

module.exports.runScripts = function() {
	cron.schedule('*/3 * * * *', () => {
		//call a function to run python scripts in a local directory every 3 minutes; 

		/*const pythonProcess = spawn('python', ['filename']); 
		pythonProcess.stdout.on('data', (data) => {
			// Do something with the data returned from python script
			let sentPackets = fs.readFileSync('./internthing1.json', 'utf8'); 
			let receivedPackets = fs.readFileSync('./externthing1.json', 'utf8'); 
			console.log(sentPackets); 
			console.log(receivedPackets);
			res.status(200).send({
				data: "hello World"
			})
		});

		pythonProcess.stderr.on('data', (data) => {
	    	console.log(data.toString()); 
		});*/
	});
}

module.exports.getFiles = function() {
	cron.schedule('*/5 * * * *', () => {
		//call function to make http requests to the other nodes in the network
		//for each ip in ips, make a request 
		for each(ip in ips) {
			request('http://' + ip + '/getfile', function (error, response, body) {
				fs.writeFile('./iplog' + ip + '.json', body, function(err) {
					if (err) {
						console.log("E!"); 
					} else {
						console.log("file saved"); 
					}
				})
			});
		}
	})
}