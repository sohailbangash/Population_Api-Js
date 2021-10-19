'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');


// render country

const renderCountry = function(data, className = '') {
    const html = `
       <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 100000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);

    // opacity

    countriesContainer.style.opacity = 1;
}

const getCountryAndNeighbour = function(country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v2/name/${country}`);
    request.send();
    // console.log(this.responseText);


    request.addEventListener('load', function() {
        const [data] = JSON.parse(this.responseText);
        // console.log(data.languages);
        console.log(data);

        //  Get languages and currency
        const lang = data.languages;
        console.log(lang);
        const curr = data.currencies;
        console.log(curr);


        // render country  (1)
        renderCountry(data);
        //  Get neighbour country (2)
        const [neighbour] = data.borders;
        console.log(neighbour);

        if (!neighbour) return;

        // Ajax call country 2
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
        request2.send();

        request2.addEventListener('load', function() {
            const data2 = JSON.parse(this.responseText);
            console.log(data2);

            renderCountry(data2, 'neighbour')
        });



    });

}

getCountryAndNeighbour('pakistan');


// call back hell

// setTimeout(() => {
//     console.log(`1 second pass`);
//     setTimeout(() => {
//         console.log(`2 second pass`);
//         setTimeout(() => {
//             console.log(`3 second pass`);
//             setTimeout(() => {
//                 console.log(`4 second pass`);
//             }, 1000);
//         }, 1000);
//     }, 1000);
// }, 1000);