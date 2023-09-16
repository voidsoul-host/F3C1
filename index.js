const form = document.getElementById("form");
const container = document.getElementById("main");
const loader = document.getElementById("loader");

//Event for form
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const api = form["api"].value;
    const movie = form["movie"].value;
    form.reset();
    movieList(api, movie);
});

//Function to fetch API
async function movieList(api, movie) {
    container.innerHTML = "";
    loader.classList.remove("hide");
    const url = ` http://www.omdbapi.com/?i=tt3896198&apikey=${api}&s=${movie}`;
    try {
        const response = await fetch(url);
        const movieDetail = await response.json();
        console.log(movieDetail);
        if (movieDetail.Response === 'True') {
            loader.classList.add("hide");
            for (let i = 0; i < movieDetail.Search.length; i++) {
                makeCard(movieDetail.Search[i], i);
            }
        } else {
            alert(movieDetail.Error);
            loader.classList.add("hide");
            movieList('2269d4b6', 'avengers');
        };
    } catch (error) {
        alert(error);
        loader.classList.add("hide");
    }
}
movieList('2269d4b6', 'Fast and Furious');

// For Making Card
function makeCard(movieDetail, index) {
    const card = document.createElement("div");
    card.className = "card";
    card.addEventListener('click', function () {
        location.href = `https://www.imdb.com/title/${movieDetail.imdbID}`;
    });
    card.innerHTML = `
        <img src="${movieDetail.Poster}" alt="${movieDetail.Title}">
        <h1>${movieDetail.Title},${movieDetail.Year}</h1>
        <p>${index + 1}</p>
    `;
    container.append(card);
}