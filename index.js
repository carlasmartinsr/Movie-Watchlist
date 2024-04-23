import { applyDarkTheme,applyDarkThemeSearch,applyDarkThemeIcons,applyDarkThemeWatchlist,
        removeDarkTheme, removeDarkThemeSearch, removeDarkThemeIcons, removeDarkThemeWatchlist } from "./utilities.js";


const searchButton = document.getElementById("search-button")
const movieCardList = document.getElementById("movie-card-list")
const dataNoFound =  document.getElementById("view-data-no-found")
const dataInitial =document.getElementById("view-data-initial")
const movieTitle = document.getElementById("search-bar")
const themeSwitchCheckbox = document.getElementById("theme-switch-checkbox")
const movieContainer = document.getElementById("movie-container")
let btnWatchlist, movieDescription, iconPlus
let isDarkTheme="" 
let movieCardHTML=""


//Dark Theme

function applyTheme(isDarkTheme){
  if (isDarkTheme){
    console.log(isDarkTheme)
      applyDarkTheme()
      applyDarkThemeSearch()
      applyDarkThemeIcons(iconPlus)
      applyDarkThemeWatchlist(btnWatchlist, movieDescription)
   }else{
      removeDarkTheme()
      removeDarkThemeSearch() 
      removeDarkThemeIcons(iconPlus)
      removeDarkThemeWatchlist(btnWatchlist, movieDescription)
}
}

function initializeTheme(){
  isDarkTheme = localStorage.getItem("darkTheme") === "true";
  themeSwitchCheckbox.checked = isDarkTheme;
  applyTheme(isDarkTheme)
}

function themeSwitch(){
  isDarkTheme = !isDarkTheme
  applyTheme(isDarkTheme)
  localStorage.setItem("darkTheme",isDarkTheme)
}

document.addEventListener("DOMContentLoaded", initializeTheme) 

themeSwitchCheckbox.addEventListener("change", themeSwitch)



//Search movie by title

function showSearchMovies(imdbID,title,poster,imdbRating,runtime, genre,plot){
  return movieCardHTML+=`<li class="movie-card">
  <img src="${poster}" alt="Poster of the movie" class="movie-image"/>
  <div class="movie-details">
    <div class="movie-info">
      <p class="movie-title">${title}</p>
      <p class="movie-raiting"><i class="fa-solid fa-star"></i>${imdbRating}</p>
    </div>
  <div class="movie-meta">
    <div class="movie-metadata-details">
      <p class="movie-duration">${runtime}</p>
      <p class="movie-category">${genre}</p>
    </div>
    <button class="btn-watchlist" type="button" data-imdb="${imdbID}"  id="btn-watchlist"><i class="fa-solid fa-circle-plus"></i>Watchlist</button>
  </div>
  <p class="movie-description" >${plot}</p>
</div>
</li> `
}




function updateDOMElements(isDataFound) {
  if (isDataFound) {
    dataInitial.style.display = "none";
    dataNoFound.style.display = "none";
    movieCardList.style.display = "flex";
    movieCardList.innerHTML = movieCardHTML;
  } else {
    movieCardList.style.display = "none";
    dataInitial.style.display = "none";
    dataNoFound.style.display = "block";
  }
  movieTitle.value = "";
}


async function fetchMovieTitle(title){
  try{
    const res = await fetch( `https://www.omdbapi.com/?s=${title}&apikey=25510fb5`)
    const data = await res.json()
    return data.Search  
    }
  catch(error){
    console.error('Error getting data from the movie:', error);
    throw error;
  }  
}


async function showMoviesListSearch(){
  try{
    const movieTitleSearch = movieTitle.value
    const movieData = await fetchMovieTitle(movieTitleSearch)
    await Promise.all(movieData.map(async info => {
    const title = info.Title;
    try {
      const res = await fetch( `https://www.omdbapi.com/?t=${title}&apikey=25510fb5`)
      const data = await res.json()
      showSearchMovies(data.imdbID, data.Title,data.Poster,data.imdbRating,data.Runtime, data.Genre, data.Plot)
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
  }));
  updateDOMElements(true);
  isDarkTheme =localStorage.getItem("darkTheme")
  btnWatchlist =  document.querySelectorAll(".btn-watchlist")
  movieDescription= document.querySelectorAll(".movie-description")
  iconPlus =document.querySelectorAll(".fa-circle-plus")
  console.log(isDarkTheme)
  if (isDarkTheme==="true"){
      applyDarkThemeIcons(iconPlus)
      applyDarkThemeWatchlist(btnWatchlist , movieDescription)
  }else{
      removeDarkThemeIcons(iconPlus)
      removeDarkThemeWatchlist(btnWatchlist , movieDescription)
  }   
  }catch(error){
    updateDOMElements(false)
  }
}
    


searchButton.addEventListener("click",showMoviesListSearch)


//Add Movie to the localstorage

function addMovieStorage(imdbID,title,poster,imdbRating, runtime,genre,plot){
  const newMovieID = imdbID
  
  const movieWatchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
  console.log(movieWatchlist)
  const movie={
    ID:imdbID,
    title,
    poster,
    imdbRating,
    runtime,
    genre,
    plot
  }

 
  const isNewMovie = movieWatchlist.some((movie) =>{ 
    return movie.ID ===newMovieID})
  console.log(isNewMovie)
    if (!isNewMovie) {
        movieWatchlist.push(movie)
        console.log(movieWatchlist)
        const watchlistStringi= JSON.stringify(movieWatchlist)
        localStorage.setItem("watchlist",watchlistStringi)
        //localStorage.clear()
    }
}


async function handleAddToWatchlistClick(e) {
  if (e.target.id="add-watchlist"){
    try{
      const res = await fetch( `https://www.omdbapi.com/?i=${e.target.dataset.imdb}&apikey=25510fb5`)
      const data = await res.json()
      addMovieStorage(data.imdbID,data.Title, data.Poster,data.imdbRating, data.Runtime,data.Genre,data.Plot)
    } catch( e){
        console.error('Error getting data', error);
    }
  }  
}


movieContainer.addEventListener("click",handleAddToWatchlistClick )












