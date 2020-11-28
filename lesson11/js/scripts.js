/**
 * @author Lehi Sanchez
 */

const API_KEY = "bc2af43a6e48f00068e9169feff4ee8a";
const DAYS_OF_THE_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function windChill(t, s) {
    let f = 35.74 + 0.6215 * t - 35.75 * (s ** 0.16) + 0.4275 * t * (s ** 0.16)
    return f
}

function getWeatherByCityId(id) {
    let url = "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=" + API_KEY + "&id=" + id;
    fetchWeather(url)
};

function getWeatherByCoordinates(lat, lon) {
    let url = "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=" + API_KEY + "&lat=" + lat + "&lon=" + lon;
    fetchWeather(url)
}

function getForecastByCityId(id) {
    let url = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=" + API_KEY + "&id=" + id;
    fetchForecast(url)
}

function getForecastByCoordinates(lat, lon) {
    let url = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=" + API_KEY + "&lat=" + lat + "&lon=" + lon;
    fetchForecast(url)
}

function fetchWeather(url) {
    fetch(url)
        .then((response) => response.json())
        .then((jsObject) => {

            let description = jsObject.weather[0].main;
            let temperature = jsObject.main.temp;
            let humidity = jsObject.main.humidity;
            let windspeed = jsObject.wind.speed;
            let windchill = windChill(temperature, windspeed);

            document.getElementById('currentDescription').innerHTML = description;
            document.getElementById('currentTemperature').innerHTML = Math.round(temperature) + '&deg; F';
            document.getElementById('currentHumidity').innerHTML = humidity;
            document.getElementById('currentWindSpeed').innerHTML = Math.round(windspeed) + ' mph';

            if (temperature <= 50 && windspeed > 3) {
                document.getElementById("currentWindChill").innerHTML = Math.round(windchill) + "&deg; F"
            } else {
                document.getElementById("currentWindChill").innerHTML = "N/A"
            }

        });
}

function fetchForecast(url) {
    fetch(url)
        .then((response) => response.json())
        .then((jsObject) => {

            // GRAB THE 5-DAY FORECAST CONTAINER
            var forecast_wrapper = document.getElementById('forecast')

            // LOOP OVER EVERY FORECAST TIME PERIOD
            for (let index = 0; index < jsObject.list.length; index++) {

                // IF THE TIME PERIOD EQUALS 18:00
                if (jsObject.list[index].dt_txt.substring(11) == "18:00:00") {

                    // STORE IMAGE AND TIME VARIABLES
                    let imagesrc = 'https://openweathermap.org/img/wn/' + jsObject.list[index].weather[0].icon + '@2x.png';
                    let date = new Date(jsObject.list[index].dt_txt);
                    let day = date.getDay();

                    // CREATE SOME ELEMENTS
                    let day_container = document.createElement('div');
                    let day_name = document.createElement('span');
                    let day_icon = document.createElement('img');
                    let day_temp = document.createElement('span');

                    // POPULATE ELEMENTS
                    day_name.innerHTML = DAYS_OF_THE_WEEK[day];
                    day_icon.setAttribute('src', imagesrc);
                    day_icon.setAttribute('alt', 'weather icon');
                    day_temp.innerHTML = Math.round(jsObject.list[index].main.temp) + '&deg; F';

                    // START PACKING EVERYTHING
                    day_container.appendChild(day_name)
                    day_container.appendChild(day_icon)
                    day_container.appendChild(day_temp)
                    forecast_wrapper.appendChild(day_container)

                }

            }

        });
}

function changeRating(int) {
    document.getElementById("currentRating").innerHTML = int;
}

function toggleMenu() {
    let nav = document.getElementById('navigation')
    let menu = document.getElementById('hamburger')
    nav.classList.toggle('responsive');
    menu.classList.toggle('responsive');
}

function updateFooter() {
    let date = new Date();
    let modified = document.lastModified;

    document.getElementById("copyright-year").innerHTML = date.getFullYear();
    document.getElementById("modified-date").innerHTML = modified;
}

function getTownEvents(city) {
    let url = "https://byui-cit230.github.io/weather/data/towndata.json";
    fetch(url)
        .then((response) => response.json())
        .then((jsonObject) => {

            const towns = jsonObject['towns'];
            for (let i = 0; i < towns.length; i++) {

                if (towns[i].name == city) {

                    for (let e = 0; e < towns[i].events.length; e++) {


                        console.log(towns[i].events[e])

                        let eventCard = document.createElement('div');
                        eventCard.setAttribute('class', 'event-card');

                        eventCard.textContent = towns[i].events[e];
                        document.getElementById('events').appendChild(eventCard);
                    }

                }


            }
        });
}

function getTownCards() {
    let url = "https://byui-cit230.github.io/weather/data/towndata.json";
    fetch(url)
        .then((response) => response.json())
        .then((jsonObject) => {

            const towns = jsonObject['towns'];
            for (let i = 0; i < towns.length; i++) {

                if (towns[i].name == "Preston" || towns[i].name == "Soda Springs" || towns[i].name == "Fish Haven") {

                    // CREATE CARD ELEMENTS w/ CLASS ATTRIBUTES
                    // ----------------------------------------
                    let townCard = document.createElement('div');
                    townCard.setAttribute('class', 'town-card town-' + towns[i].name.replace(" ", "-").toLowerCase());

                    let townInformation = document.createElement('div');
                    townInformation.setAttribute('class', 'town-card-information');

                    let townName = document.createElement('h3');

                    let townMotto = document.createElement('span');
                    townMotto.setAttribute('class', 'town-motto');

                    let townFounded = document.createElement('span');
                    townFounded.setAttribute('class', 'town-founded');

                    let townPopulation = document.createElement('span');
                    townPopulation.setAttribute('class', 'town-population');

                    let townRainFall = document.createElement('span');
                    townRainFall.setAttribute('class', 'town-rain-fall');

                    let townImageWrapper = document.createElement('div');
                    townImageWrapper.setAttribute('class', 'town-card-image');

                    let townImage = document.createElement('img');



                    // POPULATE ELEMENTS
                    // ----------------------------------------
                    townName.textContent = towns[i].name;
                    townMotto.textContent = towns[i].motto;
                    townFounded.textContent = 'Year Founded: ' + towns[i].yearFounded;
                    townPopulation.textContent = 'Population: ' + towns[i].currentPopulation;
                    townRainFall.textContent = 'Annual Rain Fall: ' + towns[i].averageRainfall;
                    townImage.setAttribute('src', 'images/' + towns[i].photo);
                    townImage.setAttribute('alt', 'Scenic view of ' + towns[i].name);



                    // NEST ELEMENTS
                    // ----------------------------------------
                    townInformation.appendChild(townName);
                    townInformation.appendChild(townMotto);
                    townInformation.appendChild(townFounded);
                    townInformation.appendChild(townPopulation);
                    townInformation.appendChild(townRainFall);
                    townImageWrapper.appendChild(townImage);



                    // NEST PARENT WRAPPERS
                    // ----------------------------------------
                    townCard.appendChild(townInformation);
                    townCard.appendChild(townImageWrapper);



                    // APPEND TO HTML
                    // ----------------------------------------
                    document.querySelector('div.town-cards').appendChild(townCard);
                }


            }
        });
}
