// FORECAST
const cityId = 5604473;
const apiKey = "bc2af43a6e48f00068e9169feff4ee8a";
const cityForecastUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&id=" + cityId + "&appid=" + apiKey;
const cityFiveDayForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&id=" + cityId + "&appid=" + apiKey;
const list_of_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

fetch(cityForecastUrl)
    .then((response) => response.json())
    .then((jsObject) => {
        document.getElementById('currentDescription').innerHTML = jsObject.weather[0].main;
        document.getElementById('currentTemperature').innerHTML = Math.round(jsObject.main.temp) + '&deg; F';
        document.getElementById('currentHumidity').innerHTML = jsObject.main.humidity;
        document.getElementById('currentWindSpeed').innerHTML = Math.round(jsObject.wind.speed) + ' mph';
    });

fetch(cityFiveDayForecastUrl)
    .then((response) => response.json())
    .then((jsObject) => {

        var forecast_wrapper = document.getElementById('forecast')

        for (let index = 0; index < jsObject.list.length; index++) {
            if (jsObject.list[index].dt_txt.substring(11) == "18:00:00") {

                let imagesrc = 'https://openweathermap.org/img/wn/' + jsObject.list[index].weather[0].icon + '@2x.png';
                let date = new Date(jsObject.list[index].dt_txt);
                let day = date.getDay();

                let day_container = document.createElement('div');
                let day_name = document.createElement('span');
                let day_icon = document.createElement('img');
                let day_temp = document.createElement('span');

                day_name.innerHTML = list_of_days[day];
                day_icon.setAttribute('src', imagesrc);
                day_temp.innerHTML = Math.round(jsObject.list[index].main.temp) + '&deg; F';

                day_container.appendChild(day_name)
                day_container.appendChild(day_icon)
                day_container.appendChild(day_temp)
                forecast_wrapper.appendChild(day_container)

            }
        }



        // if (towns[i].name == "Preston" || towns[i].name == "Soda Springs" || towns[i].name == "Fish Haven") {
        //     // CREATE CARD ELEMENTS w/ CLASS ATTRIBUTES
        //     // ----------------------------------------
        //     let townCard = document.createElement('div');
        //     townCard.setAttribute('class', 'town-card');

        //     let townInformation = document.createElement('div');
        //     townInformation.setAttribute('class', 'town-card-information');

        //     let townName = document.createElement('h3');

        //     let townMotto = document.createElement('span');
        //     townMotto.setAttribute('class', 'town-motto');

        //     let townFounded = document.createElement('span');
        //     townFounded.setAttribute('class', 'town-founded');

        //     let townPopulation = document.createElement('span');
        //     townPopulation.setAttribute('class', 'town-population');

        //     let townRainFall = document.createElement('span');
        //     townRainFall.setAttribute('class', 'town-rain-fall');

        //     let townImageWrapper = document.createElement('div');
        //     townImageWrapper.setAttribute('class', 'town-card-image');

        //     let townImage = document.createElement('img');



        //     // POPULATE ELEMENTS
        //     // ----------------------------------------
        //     townName.textContent = towns[i].name;
        //     townMotto.textContent = towns[i].motto;
        //     townFounded.textContent = 'Year Founded: ' + towns[i].yearFounded;
        //     townPopulation.textContent = 'Population: ' + towns[i].currentPopulation;
        //     townRainFall.textContent = 'Annual Rain Fall: ' + towns[i].averageRainfall;
        //     townImage.setAttribute('src', 'images/' + towns[i].photo);



        //     // NEST ELEMENTS
        //     // ----------------------------------------
        //     townInformation.appendChild(townName);
        //     townInformation.appendChild(townMotto);
        //     townInformation.appendChild(townFounded);
        //     townInformation.appendChild(townPopulation);
        //     townInformation.appendChild(townRainFall);
        //     townImageWrapper.appendChild(townImage);



        //     // NEST PARENT WRAPPERS
        //     // ----------------------------------------
        //     townCard.appendChild(townInformation);
        //     townCard.appendChild(townImageWrapper);



        //     // APPEND TO HTML
        //     // ----------------------------------------
        //     document.querySelector('div.town-cards').appendChild(townCard);





        //     var list_of_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        //     var forecast_ids = [];
        //     var forecast_containers = document.getElementById("forecast").children;

        //     var forecast_wrapper = ocument.getElementById("forecast")

        //     for (let index = 0; index < jsObject.list.length; index++) {
        //         if (jsObject.list[index].dt_txt.substring(11) == "18:00:00") {



        //             forecast_ids.push(index);
        //         }
        //     }

        //     for (let index = 0; index < forecast_containers.length; index++) {
        //         let date = new Date(jsObject.list[forecast_ids[index]].dt_txt);
        //         let day_id = date.getDay();
        //         let imagesrc = 'https://openweathermap.org/img/w/' + jsObject.list[forecast_ids[index]].weather[0].icon + '.png';
        //         forecast_containers[index].childNodes[0].innerHTML = list_of_days[day_id];
        //         forecast_containers[index].childNodes[1].setAttribute('src', imagesrc);
        //         forecast_containers[index].childNodes[2].innerHTML = Math.round(jsObject.list[forecast_ids[index]].main.temp) + '&deg; F';
        //     }




        // var forecastWrapper = document.getElementById("forecast").children

        // for (let index = 0; index < jsObject.list.length; index++) {

        //     var time = jsObject.list[index].dt_txt.substring(11)

        //     if (time == "18:00:00") {

        //         let date = new Date(jsObject.list[index].dt)
        //         let day = date.getDay()

        //         console.log(day)

        //         let imagesrc = 'https://openweathermap.org/img/w/' + jsObject.list[index].weather[0].icon + '.png';

        //         forecastWrapper[current_day].childNodes[0].textContent = "Hello"
        //         forecastWrapper[current_day].childNodes[1].setAttribute('src', imagesrc)
        //         forecastWrapper[current_day].childNodes[2].textContent = jsObject.list[index].main.temp
        //     }


        // }

        // document.getElementById('imagesrc').textContent = imagesrc; // informational specification only
        // document.getElementById('icon').setAttribute('src', imagesrc); // focus on the setAttribute() method
        // document.getElementById('icon').setAttribute('alt', desc);
    });
