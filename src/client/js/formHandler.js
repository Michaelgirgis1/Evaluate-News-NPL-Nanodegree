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
        .then(res => res)
        .then(function(res) {
            document.getElementById('results').innerHTML= res.polarity
            console.log(res)
            console.log(res.polarity)

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
export { handleSubmit }
export { checkUrl }