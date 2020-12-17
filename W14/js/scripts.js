/**
 * @author Lehi Sanchez
 */

function toggleNavigationVisibility() {
    let nav = document.getElementById('nav')
    let menu = document.getElementById('navigationToggleButton')
    nav.classList.toggle('nav--hidden');
    menu.classList.toggle('header__hamburger--active');
}

function fetchCurrentWeather() {
    let cityId = 3530103;
    getWeatherByCityId(cityId);
}

const API_KEY = "bc2af43a6e48f00068e9169feff4ee8a";
const DAYS_OF_THE_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function getWeatherByCityId(id) {
    let url = "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=" + API_KEY + "&id=" + id;
    fetchWeather(url)
};

function getForecastByCityId(id) {
    let url = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=" + API_KEY + "&id=" + id;
    fetchForecast(url)
}

function fetchWeather(url) {
    fetch(url)
        .then((response) => response.json())
        .then((jsObject) => {

            let temperature = jsObject.main.temp;
            let description = jsObject.weather[0].main;
            let humidity = jsObject.main.humidity;

            document.getElementById('currentWeatherTemperature').innerHTML = Math.round(temperature) + '&deg; F';
            document.getElementById('currentWeatherDescription').innerHTML = description;
            document.getElementById('currentWeatherHumidity').innerHTML = humidity + '&percnt;';

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
