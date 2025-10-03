let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
let getMovies = () => {
  let movieName = movieNameRef.value.trim();
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg"></h3>`;
    return;
  }
  let url = `https://www.omdbapi.com/?s=${movieName}&apikey=${key}`;

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      if (data.Response == "True") {
        result.innerHTML = data.Search.map(movie => `
          <div class="movie-card" onclick="getMovieDetails('${movie.imdbID}')">
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "no-image.png"}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
          </div>
        `).join("");
      } else {
        result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
      }
    })
    .catch(() => {
      result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
    });
};

function getMovieDetails(id) {
  let url = `https://www.omdbapi.com/?i=${id}&apikey=${key}`;
  fetch(url)
    .then(resp => resp.json())
    .then(movie => {
      let modal = document.createElement("div");
      modal.id = "movie-details";
      modal.innerHTML = `
        <div class="content">
          <span style="float:right;cursor:pointer;" onclick="this.closest('#movie-details').remove()">❌</span>
          <img src="${movie.Poster !== "N/A" ? movie.Poster : "no-image.png"}">
          <div>
            <h2>${movie.Title} (${movie.Year})</h2>
            <p><b>Genre:</b> ${movie.Genre}</p>
            <p><b>Director:</b> ${movie.Director}</p>
            <p><b>Actors:</b> ${movie.Actors}</p>
            <p><b>Plot:</b> ${movie.Plot}</p>
            <p><b>IMDB Rating:</b> ⭐ ${movie.imdbRating}</p>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.style.display = "flex";
    });
}

searchBtn.addEventListener("click", getMovies);

movieNameRef.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getMovies();
  }
});

window.addEventListener("load", getMovies);

