// SAVE SOME VARIABLES
const cityId = 5604473;
const apiKey = "bc2af43a6e48f00068e9169feff4ee8a";
const cityForecastUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&id=" + cityId + "&appid=" + apiKey;
const cityFiveDayForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&id=" + cityId + "&appid=" + apiKey;
const list_of_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// FETCH THE CURRENT WEATHER DATA
fetch(cityForecastUrl)
    .then((response) => response.json())
    .then((jsObject) => {
        document.getElementById('currentDescription').innerHTML = jsObject.weather[0].main;
        document.getElementById('currentTemperature').innerHTML = Math.round(jsObject.main.temp) + '&deg; F';
        document.getElementById('currentHumidity').innerHTML = jsObject.main.humidity;
        document.getElementById('currentWindSpeed').innerHTML = Math.round(jsObject.wind.speed) + ' mph';
    });

// FETCH THE 5-DAY FORECAST DATA
fetch(cityFiveDayForecastUrl)
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
                day_name.innerHTML = list_of_days[day];
                day_icon.setAttribute('src', imagesrc);
                day_temp.innerHTML = Math.round(jsObject.list[index].main.temp) + '&deg; F';

                // START PACKING EVERYTHING
                day_container.appendChild(day_name)
                day_container.appendChild(day_icon)
                day_container.appendChild(day_temp)
                forecast_wrapper.appendChild(day_container)

            }

        }

    });
