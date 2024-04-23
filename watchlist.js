import {applyDarkTheme,applyDarkThemeIcons,applyDarkThemeWatchlist,
  removeDarkTheme, removeDarkThemeIcons, removeDarkThemeWatchlist } from "./utilities.js";

const movieCardWatchlist = document.getElementById("movie-card-watchlist")
const viewDataInitial =document.getElementById("view-data-initial")
const movieContainer = document.getElementById("movie-container")

const themeSwitchCheckbox = document.getElementById("theme-switch-checkbox")
let btnWatchlist, movieDescription, iconMinus;

let isDarkTheme="" 
let movieCardHTML=""
let watchlistUser

//Dark Theme

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


function applyTheme(isDarkTheme){
  console.log(iconMinus)
  iconMinus =document.querySelectorAll(".fa-circle-minus")
  btnWatchlist =  document.querySelectorAll(".btn-watchlist")
  movieDescription= document.querySelectorAll(".movie-description")
  if (isDarkTheme){
    applyDarkTheme() 
    applyDarkThemeIcons(iconMinus)
    applyDarkThemeWatchlist(btnWatchlist,movieDescription)
   }else{
    removeDarkTheme()
    removeDarkThemeIcons(iconMinus)
    removeDarkThemeWatchlist(btnWatchlist,movieDescription)
}
}

themeSwitchCheckbox.addEventListener("change",themeSwitch)


//Load Movies Watchlist 

function showWatchlist(movieList){
  movieCardHTML=""
  movieList.forEach(movie => {
  return  movieCardHTML+=
    `<li class="movie-card">
      <img src="${movie.poster}" alt="Poster of the movie" class="movie-image"/>
      <div class="movie-details">
      <div class="movie-info">
        <p class="movie-title">${movie.title}</p>
        <p class="movie-raiting"><i class="fa-solid fa-star"></i>${movie.imdbRating}</p>
      </div>
      <div class="movie-meta">
      <div class="movie-metadata-details">
        <p class="movie-duration">${movie.runtime}</p>
        <p class="movie-category">${movie.genre}</p>
      </div>
      <button class="btn-watchlist" id="delete-watchlist" type="button" data-ID="${movie.ID}" ><i class="fa-solid fa-circle-minus"></i>Watchlist</button>
      </div>
      <p class="movie-description">${movie.plot}</p>
    </div>
  </li> `
  })
}


function loadWatchlist(e){
  if(e.key=watchlist){
    const storedWatchlist = localStorage.getItem("watchlist")
  if (storedWatchlist){
     watchlistUser =JSON.parse(storedWatchlist)
  }
  viewDataInitial.style.display="none"
  movieCardWatchlist.style.display="flex"
  showWatchlist(watchlistUser)  
  
  movieCardWatchlist.innerHTML = movieCardHTML
  }
}

const storedWatchlist = localStorage.getItem("watchlist")
  if (storedWatchlist){
     watchlistUser =JSON.parse(storedWatchlist)
  }
  isDarkTheme =localStorage.getItem("darkTheme")
  viewDataInitial.style.display="none"
  movieCardWatchlist.style.display="flex"
  showWatchlist(watchlistUser)
  movieCardWatchlist.innerHTML = movieCardHTML
 // localStorage.clear(watchlist)


window.addEventListener('storage', loadWatchlist)


//Delete Movie from Watchlist
 
 function deleteMovieWatchlist(e){
  if (e.target.id="delete-watchlist"){
    const idMovieDelete = e.target.dataset.id
    const updateWatchlist = watchlistUser.filter(movie=>{
    return movie.ID !== idMovieDelete
  })
  const watchlistStringi = JSON.stringify(updateWatchlist)
  localStorage.setItem("watchlist",watchlistStringi)

  showWatchlist(updateWatchlist)
  movieCardWatchlist.innerHTML = movieCardHTML
  applyTheme(isDarkTheme)
}

}

 movieContainer.addEventListener("click",deleteMovieWatchlist)