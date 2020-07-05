function handleSubmit(event) {
    event.preventDefault()
    var url = document.getElementById('url').value;
    let formText = document.getElementById('name').value
    Client.checkForName(formText)
    //check input is a valid url
    if (Client.ValidURL(url)) {
        console.log("::: FORM URL VALID :::")   
        console.log("BUILDING REQUEST");
        fetch('/sentiment', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ url: url })
        })
        .then(res => res.json())
        .then(res => { 
            document.getElementById('results').innerHTML = res.polarity 
            console.log(res.polarity)
        })

    } else {
        // Display error message if URL is not valid
        var error_section = document.querySelector('section.errors');
        var error = document.querySelector('section.errors #error');
        error.innerHTML = "The URL:[" + url + "] is not valide. Please enter a valid url"
        error_section.style.display = "block";
    }
}
export { handleSubmit }