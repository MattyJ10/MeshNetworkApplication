const express = require('express');
const path = require('path');
const fileController = require('../Controllers/fileController.js'); 

const ip = '172.27.0.82'; //dynamic 

module.exports = function(app, express) {
	console.log("running router script");
	let router = express.Router();

	//setup a function that is listening for request and send back the files that are requested
	//https://stackoverflow.com/questions/25463423/res-sendfile-absolute-path
	app.get("/getFile", (req, res) => {
		console.log("recieved request for files");
		res.sendFile(path.join(__dirname, '../../', 'iplog' + ip + '.json')); 
	})

	app.get("/", (req, res) => {
		console.log("running router script");
		res.status(200).send({
			data: "hello world"
		}); 
	})
	app.get("/getTcDirections", (req, res) => {
		res.sendFile(path.join(__dirname, '../../', 'test1'+'.json')); 
	})
	app.get("/getImage1", (req, res) => {
		res.sendFile(path.join(__dirname, '../../', 'output.png')); 
	})
	app.get("/getGraph", (req, res) => {
		res.sendFile(path.join(__dirname, '../../', 'griplog172.27.0.82.png')); 
	})
	app.get("/getProtocolGraph", (req, res) => {
		res.sendFile(path.join(__dirname, '../../', 'protgriplog172.27.0.82.png')); 
	})
}



