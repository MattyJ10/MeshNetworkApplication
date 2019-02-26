const express = require('express'); 
const port = process.env.PORT || 3030;
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express(); 

app.use(cors());
app.use(bodyParser.json()); 

//require('./api/routes/routes')(app, express); 

const fileControl = require('./api/Controllers/fileController.js'); 
fileControl.getFiles(); 

app.listen(port, () => console.log(`Listening on port ${port}`)); 