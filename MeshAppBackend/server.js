const express = require('express'); 
const port = process.env.PORT || 3005;
const bodyParser = require('body-parser');
const cors = require('cors'); 
const path = require('path'); 

const app = express(); 

app.use(cors());
app.use(bodyParser.json()); 

/*app.get("/", (req, res) => {
	res.end("Hello World"); 
})*/

require('./api/routes/routes')(app, express); 

app.listen(port, () => console.log(`Listening on port ${port}`)); 

