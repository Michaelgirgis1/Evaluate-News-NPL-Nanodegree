
var path = require('path')
const express = require('express')
const app = express();
const mockAPIResponse = require('./mockAPI.js');
const bodyParser = require('body-parser')
var AYLIENTextAPI = require('aylien_textapi');
const requestPost=require('./request') ;
const cors = require('cors')

const dotenv = require('dotenv');
dotenv.config();


/* Middleware*/
// Here we are configuring express to use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var textapi = new AYLIENTextAPI({
    application_id: process.env.application_id,
    application_key: process.env.application_key
});
function PostHandler(req, res, next) {
    // Aylien API credentias load app_id and app_key from .env file
    // Please make sure to carate an account in aylian and obtain your own app_id and app_key
    // then create a .env file and set it.
  
    textapi.sentiment({
      'url': req.body.text
    }, function(error, response) {
        res.send(response)
    }); 
 
}
// console.log(`process.env.APP_ID ${application_id}`)

// Cors for cross origin allowance

app.use(cors())


// Intialize the main project folder
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
     res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})


app.post('/sent', requestPost.validateInputRequest, PostHandler);

module.exports = app;
// console.log(`Your API key is ${process.env.API_KEY}`)