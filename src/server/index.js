
var path = require('path')
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const requestPost=require('./request') ;
const cors = require('cors')
/* Middleware*/
// Here we are configuring express to use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
function PostHandler(req, res, next) {
  console.log(res.body)
}
// console.log(`process.env.APP_ID ${application_id}`)

// Cors for cross origin allowance

app.use(cors())

let projectData = [];
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



app.post("/addData", addData);

function addData(request, response){
    newEntry = {
        cityN: request.body.cityN,
        dateT: request.body.dateT,
        weatherD: request.body.weatherD
    }
    projectData.push(newEntry)
}
module.exports = app;

app.get('/allData', addWeather);

function addWeather(request,response){   
  response.send(projectData)
  console.log(projectData)
  projectData = [];
}
// console.log(`Your API key is ${process.env.API_KEY}`)