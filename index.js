"use strict"
const APIKEY = '/?api_key=04c35731a5ee918f014970082a0088b1';
const APIURL = 'https://api.themoviedb.org/4/list/';
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=";

const contextMovie = document.getElementsByClassName('context')[0];
const searchForm = document.getElementById('form-search');
const searchInput = document.querySelector('.search');
const logoIteam = document.querySelector('.logo');
var pageNumber = 3;

async function getMovies(type, api, index) {
    //get data from api urrl
    var fullApi = ''
    if(type == 'list') {
        fullApi = api + index + APIKEY;
    } else {
        fullApi = api;
    }
    console.log(fullApi);
    var resp = await fetch(fullApi);
    // stranlation json
    var respData = await resp.json();

    //console.log(respData);
    displayMovies(respData);
}

function displayMovies(movies) {
    //clear data show before
    contextMovie.innerHTML = '';

    //get new data    
    movies.results.forEach((movie) => {
        const {poster_path,title,vote_average} = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('context__movie');

        movieElement.innerHTML = `
            <img src="${IMGPATH + poster_path}" alt="${title}">
            <div class="movie__info">
                <h3 class="movie__info--name">${title}</h3>
                <span class="movie__info--score ${getColorScore(vote_average)}">${vote_average}</span>
            </div>
        `;
        //console.log(getColorScore(vote_average));
        contextMovie.appendChild(movieElement)
    });
}

// Set color for score vote
function getColorScore(vote_average) {
    if(vote_average >=7.5 && vote_average<=10) {
        return 'greenScore';
    } else if(vote_average>=4 && vote_average <7.5) {
        return 'yellowScore';
    } else {
        return 'redScore';
    }
}

// Submit search event
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const searchValue = searchInput.value;
    if(searchValue) {
        getMovies('search',SEARCHAPI + searchValue, pageNumber);
        searchValue.value = '';
    }

});


//click logo event
logoIteam.onclick = function(e) {
    getMovies('list',APIURL, pageNumber);
}

// init
getMovies('list',APIURL, pageNumber);