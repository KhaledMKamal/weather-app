// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Cors for cross origin allowance
cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080;
const server = app.listen(port, () => {console.log(`running on localhost: ${port}`)});

// Call back post route
app.post('/callkback', (req,res) =>{
    res.send('POST received');
    console.log(req.body);
  });

//post all
app.post('/postAll', (req,res) =>{
    projectData = req.body;
    console.log(projectData);
  });

// GET all
app.get('/getAll', (req, res) => {
  console.log(projectData);
  res.send(projectData);
});