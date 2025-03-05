document.addEventListener('DOMContentLoaded', () => {
    const movieForm = document.getElementById("movieForm");
    const movieResults = document.getElementById("movieResults");


    movieForm.addEventListener('submit', (e) => {
        const movieName = document.getElementById('movieInput').value;
        e.preventDefault();
        searchMovies(movieName)
    });

    async function searchMovies(movieName) {
        try {
            movieResults.innerHTML =
                `
                <div class="loading"> Searching Movies...</div>
                `
            const response = await fetch(
                `https://www.omdbapi.com/?apikey=fd1744a6&s=${movieName}`
            );
            const data = await response.json()
            if ((data.response === "False")) {
                throw new error("No Movies Found")
            }
            displayMovies(data.Search)
        } catch (error) {
            movieResults.innerHTML = `
                <div class="error-message">
                    "Error While Searching Movie. Please try again later."
                </div>
            `
        }
    };

    function displayMovies(movies) {
        movieResults.innerHTML = `
        <div class="movies-grid">
            ${movies.map(
            (movie) => `
            <div class="movie-card">
                <img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster" />
                <div class="movie-info">
                    <h3 class="movie-title">${movie.Title}</h3>
                    <div class="movie-year">${movie.Year}</div>
                </div>
            </div>
            `
        ).join("")}
        </div>
        `
    }


})