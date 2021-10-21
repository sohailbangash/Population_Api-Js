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
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);

    // opacity

    countriesContainer.style.opacity = 1;
};
const renderError = function(msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function(country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v2/name/${country}`);
//     request.send();
//     // console.log(this.responseText);

//     request.addEventListener('load', function() {
//         const [data] = JSON.parse(this.responseText);
//         // console.log(data.languages);
//         console.log(data);

//         //  Get languages and currency
//         const lang = data.languages;
//         console.log(lang);
//         const curr = data.currencies;
//         console.log(curr);

//         // render country  (1)
//         renderCountry(data);
//         //  Get neighbour country (2)
//         const [neighbour] = data.borders;
//         console.log(neighbour);

//         if (!neighbour) return;

//         // Ajax call country 2
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//         request2.send();

//         request2.addEventListener('load', function() {
//             const data2 = JSON.parse(this.responseText);
//             console.log(data2);

//             renderCountry(data2, 'neighbour');
//         });
//     });
// };

// getCountryAndNeighbour('pakistan');

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
// 
// 
// !!!: new Fetch and promise instead  of  xml ajax request

// const getCountryData = function(country) {
//     fetch(`https://restcountries.com/v2/name/${country}`).then(function(Response) {
//         console.log(Response);
//         return Response.json();
//     }).then(function(data) {
//         console.log(data);
//         renderCountry(data[0]);

//     })
// };

// getCountryData('pakistan');

// simplify code



// const getCountryData = function(country) {
//     // country 1
//     fetch(`https://restcountries.com/v2/name/${country}`)
//         .then(response => {
//             console.log(response);
//             if (!response.ok)
//                 throw new Error(`Country not found ${response.status}`);

//             return response.json()
//         })
//         .then(data => {
//             renderCountry(data[0]);

//             const neighbour = data[0].borders[0];
//             if (!neighbour) return;

//             // country 2

//             return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//         })
//         .then(response => response.json())
//         .then(data => renderCountry(data, 'neighbour'))
//         .catch((err) => {
//             console.error(`${err} ✴✴✴`);
//             renderError(`Something went wrong ✴✴✴ ${err.message}.Try again!`);
//             btn.disabled = true;

//         })
//         .finally(() => {
//             countriesContainer.style.opacity = 1;
//             btn.style.opacity = 0;
//             btn.disabled = true;
//             btn.classList.add('btn-country-disble');

//         })
// };


const getJSON = function(url, errorMsg = 'something went wrong. Try again!') {
    fetch(url).then(response => {
        if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

        return response.json();
    })
};

const getCountryData = function(country) {
    // country 1
    getJSON(`https://restcountries.com/v2/name/${country}`,
            `Country not found!`)
        .then(data => {
            renderCountry(data[0]);

            const neighbour = data[0].borders[0];
            if (!neighbour) throw new Error(`neighbour not found!`);

            // country 2

            return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`);
        })
        .then(data => renderCountry(data, 'neighbour'))
        .catch((err) => {
            console.error(`${err} ✴✴✴`);
            renderError(`Something went wrong ✴✴✴ ${err.message}.Try again!`);
            btn.disabled = true;

        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
            btn.style.opacity = 0;
            btn.disabled = true;
            btn.classList.add('btn-country-disble');

        })
};
btn.addEventListener('click', function() {
    getCountryData('pakistan');
});

getCountryData('australia');