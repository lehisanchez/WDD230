const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        console.table(jsonObject);
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
