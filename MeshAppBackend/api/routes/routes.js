const express = require('express');
const sh = require('shelljs');

module.exports = function(app, express) {

	let router = express.Router();

	app.get('/api/test', function(req, res) {
		res.status(200).send({
			data: sh.ls()
		});
	});

}