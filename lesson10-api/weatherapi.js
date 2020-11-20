// API URL
// -----------------------------------------------------------
const cityID = 5604473
const key = "bc2af43a6e48f00068e9169feff4ee8a"
const apiURL = "http://api.openweathermap.org/data/2.5/weather?id=" + cityID + "&appid=" + key

console.log(apiURL)

fetch(apiURL)
    .then((response) => response.json())
    .then((jsObject) => {
        console.log(jsObject);
        document.getElementById('current-temp').textContent = jsObject.main.temp;
        const imagesrc = 'https://openweathermap.org/img/w/' + jsObject.weather[0].icon + '.png'; // note the concatenation
        const desc = jsObject.weather[0].description; // note how we reference the weather array
        document.getElementById('imagesrc').textContent = imagesrc; // informational specification only
        document.getElementById('icon').setAttribute('src', imagesrc); // focus on the setAttribute() method
        document.getElementById('icon').setAttribute('alt', desc);
    });
