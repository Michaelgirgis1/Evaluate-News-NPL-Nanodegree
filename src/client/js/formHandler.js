function handleSubmit(event) {
    event.preventDefault()
    var url = document.getElementById('url').value;


    //check input is a valid url
    if (checkUrl(url)) {
      console.log("::: FORM URL VALID :::")
      console.log("BUILDING REQUEST");
      fetch('http://localhost:8080/sent', {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify({ text: url })
      })
      .then(res => res.json())
      .then(function(res) {
          document.getElementById('results').innerHTML= res.polarity
      })
  }
}
function checkUrl(str) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if(!regex .test(str)) {
      alert("Please enter valid URL.");
      return false;
    } else {
      return true;
    }
  }


// Personal API Key for OpenWeatherMap API
//london&maxRows=10&username=makary
let baseURL = 'http://api.geonames.org/searchJSON?q='
let userName = 'michael1'

let weatherKey ='fbfa4596c5f9433d8a63bed50f061c6a'
let weatherApi = 'http://api.weatherbit.io/v2.0/current?'

//https://pixabay.com/api/?key=17657024-de71bcfb4648e9a612f88a9cd&q=usa&image_type=photo&pretty=true
let imageApi = 'https://pixabay.com/api/?key='
let pixKey = '17657024-de71bcfb4648e9a612f88a9cd&q='

//http://api.weatherbit.io/v2.0/current?&lat=38.123&lon=-78.543&key=fbfa4596c5f9433d8a63bed50f061c6a
// Event listener to add function to existing HTML DOM element
document.getElementById('getInfo').addEventListener('click', performAction);


/* Function called by event listener */
function performAction(e){
  e.preventDefault()
  let long,
  lat,
  weatherData;
  // const city = document.getElementById("city").value;
  const country = document.getElementById("country").value;
  getDataCordinates(baseURL,country, userName)
    // console.log(data)
     .then(function(data){
        long = data.geonames[0].lng
        lat = data.geonames[0].lat
      // postData("/addData", {data} )
     }).then(function(){
      console.log(long, lat)
      weatherCondition(weatherApi, weatherKey, long , lat).then(function(data){
        weatherData = data.data[0]
      }).then(function(){
        let cityName = weatherData.city_name,
         dateTime = weatherData.datetime,
         weatherDescription = weatherData.weather.description
         postData('/addData', { cityN:cityName, dateT: dateTime, weatherD: weatherDescription})
        // console.log(cityName, dateTime,weatherDescription )
        updateUi()
        getImage(imageApi, pixKey, country)
       })
     })
}

/* Function to GET Web API Data*/
const getDataCordinates = async (baseURL, country, userName)=>{
  const res = await fetch(baseURL + country+ '&maxRows=10&username=' + userName)
    try {
      const data = res.json()
      return data
    } catch(error){
       console.log("error", error)
    }
  }
  // to get image 
  const getImage = async (imageApi, pixKey, country)=>{
    const res = await fetch(imageApi + pixKey+ country)
      try {
        const data = res.json()
        return data
      } catch(error){
         console.log("error", error)
      }
    }
  /* Function to GET Web API Data*/
const weatherCondition = async (weatherApi, weatherKey, long , lat)=>{
  const res = await fetch(weatherApi +'&lat='+ lat +'&lon='+ long + '&key=' + weatherKey)
    try {
      const data = res.json()
      return data
    } catch(error){
       console.log("error", error)
    }
  }
// /* Function to POST data */
const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header
      body: JSON.stringify(data),
    });
      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }
// /* Function to GET Project Data */
let updateUi = async () =>{
  const request = await fetch('/allData');
    try {
      const allData = await request.json()
       console.log(allData)
       document.getElementsByClassName("location").innerHTML= `location: ${cityName}`;
       document.getElementsByClassName("date-reservation").innerHTML = `date-reservation: ${weatherDescription}`;
       document.getElementsByClassName("weather-status").innerHTML = `weather-status: ${weatherDescription}`
    }
    catch(error) {
      console.log("error", error);
    }
}


export { handleSubmit }
export { checkUrl }
export{performAction}
export{ weatherCondition}
export {postData}