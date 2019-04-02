const cron = require('node-cron'); 
const path = require('path'); 
const sh = require('shelljs');
const {spawn} = require('child_process');
const fs = require('fs');
const request = require('request'); 
var gotResponse=1;
const mainServerList = ['172.27.0.90']; 
var ipList = ['172.27.0.78','172.27.0.90','172.27.0.82']; 


//each server on the nodes will intermittently send http requests out to every other node and ask for them to send their files back

//setup a function that is listening for request and send back the files that are requested
//https://stackoverflow.com/questions/25463423/res-sendfile-absolute-path

module.exports.runScripts = function() {
	cron.schedule('* * * * *', () => {
		//call a function to run python scripts in a local directory every 3 minutes; 
		console.log("runing traffic manage");
		const pythonProcess = spawn('python3.5', ['py3autosiimp1.py']); 
		console.log("spawned process");
		pythonProcess.stdout.on('data', (data) => {
			// Do something with the data returpned from python script
			console.log("printing data");
			console.log(data.toString());
			//let sentPackets = fs.readFileSync('./newlog.json', 'utf8'); 
			//console.log(sentPackets); 
		});

		pythonProcess.stderr.on('data', (data) => {
	    		console.log(data.toString()); 
		});
	});
}
module.exports.runScriptsTraffic = function() {
	cron.schedule('* * * * *', () => {
		//call a function to run python scripts in a local directory every 3 minutes; 
		console.log("runing traffic control");
		const pythonProcess = spawn('python', ['pytc5.py']); 
		pythonProcess.stdout.on('data', (data) => {
			// Do something with the data returned from python script
			console.log(data.toString());
			//let sentPackets = fs.readFileSync('./internthing1.json', 'utf8'); 
			//console.log(sentPackets); 
		});

		pythonProcess.stderr.on('data', (data) => {
	    		console.log(data.toString()); 
		});
	});
}
module.exports.createGraph = function() {
	cron.schedule('* * * * *', () => {
		//call a function to run python scripts in a local directory every 3 minutes; 
		console.log("runing create graph");
		const pythonProcess = spawn('python', ['trafficplot.py']); 
		pythonProcess.stdout.on('data', (data) => {
			// Do something with the data returned from python script
			console.log(data.toString());
			//let sentPackets = fs.readFileSync('./internthing1.json', 'utf8'); 
			//console.log(sentPackets); 
		});

		pythonProcess.stderr.on('data', (data) => {
	    		console.log(data.toString()); 
		});
	});
}
module.exports.createProtocolGraph = function() {
	cron.schedule('* * * * *', () => {
		//call a function to run python scripts in a local directory every 3 minutes; 
		console.log("runing create graph");
		const pythonProcess = spawn('python', ['protocolplot.py']); 
		pythonProcess.stdout.on('data', (data) => {
			// Do something with the data returned from python script
			console.log(data.toString());
			//let sentPackets = fs.readFileSync('./internthing1.json', 'utf8'); 
			//console.log(sentPackets); 
		});

		pythonProcess.stderr.on('data', (data) => {
	    		console.log(data.toString()); 
		});
	});
}
module.exports.autoShape = function() {
	cron.schedule('* * * * *', () => {
		//call a function to run python scripts in a local directory every 3 minutes; 
		console.log("runing auto shape");
		const pythonProcess = spawn('python', ['autoshape.py']); 
		pythonProcess.stdout.on('data', (data) => {
			// Do something with the data returned from python script
			console.log(data.toString());
			//let sentPackets = fs.readFileSync('./internthing1.json', 'utf8'); 
			//console.log(sentPackets); 
		});

		pythonProcess.stderr.on('data', (data) => {
	    		console.log(data.toString()); 
		});
	});
}

module.exports.getFiles = function() {
	cron.schedule('* * * * *', () => {
		console.log("running get file");
		//call functsion to make http requests to the other nodes in the network
		//for each ip in ips, make a request
		for(var ip1 in ipList){
			console.log('requesting ip '+ipList[ip1]);
			request('http://'+ipList[ip1]+':3030/getFile', function (error, response, body) {
				console.log('attempting to write to file');
				console.log('error is '+error);
				console.log('response  is '+response);
				console.log('body is   '+body);
				if(error == null && response != null){
				fs.writeFile('./iplog'+ipList[ip1]+'.json', body, function(err) {
					if (err) {
						console.log("E!"); 
					} else {
						//fs.writeFile('./iplog172.27.0.90.json', body, function(err) {
						console.log("file saved"); 
					}
				})
				}else{
					console.log("nothing recieced");
				}
			});
		}
	})
	
}

module.exports.getTcDirections = function() {
	cron.schedule('* * * * *', () => {

		console.log("running get tc directions");
		//call function to make http requests to the other nodes in the network
		//for each ip in ips, make a request
		
		for(var mIp in mainServerList){
			console.log('http://'+mainServerList[mIp]+':3030/getTcDirections');
			request('http://'+mainServerList[mIp]+':3030/getTcDirections'/*).on('response'*/, function (error, response, body) {
				console.log('attempting to write to file');
				console.log('attempting to write to file');
				console.log('error is '+error);
				console.log('response  is '+response);
				console.log('body is   '+body);
				if(error==null){
					fs.writeFile('./test1.json', body, function(err) {
						if (err) {
							gotResponse=0
							console.log("E!"); 
						} else {
							//fs.writeFile('./test1.json', body, function(err) {
								
							console.log("file saved in orig list"); 
						}
					})
				}else{
					gotResponse=0
					console.log("error with request")
				}
			});
		}
		if(gotResponse==0){
			console.log("defaulting to old list")
			for(var mIp in ipList){
				console.log('http://'+ipList[mIp]+':3030/getTcDirections');
				request('http://'+ipList[mIp]+':3030/getTcDirections', function (error, response, body) {
					console.log('attempting to write to file');
					console.log('error is '+error);
					console.log('response  is '+response);
					console.log('body is   '+body);
					if(error==null){
						fs.writeFile('./test1.json', body, function(err) {
							if (err) {
								console.log("E!"); 
							} else {
								//fs.writeFile('./test1.json', body, function(err) {
									gotResponse=1
								console.log("file saved"); 
							}
						})
					}else{
						console.log("error with request")
					}
				});
			}
			

			gotResponse=1;	
		}
	})
}



