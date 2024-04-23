const main = document.querySelector("main")
const body = document.querySelector("body")
const search = document.getElementById("search")
const searchButton = document.getElementById("search-button")
const searchBar = document.getElementById("search-bar")


function applyDarkTheme(){
    body.classList.add("bg-dark-theme")
    main.classList.add("main-dark-theme")
  }

function applyDarkThemeSearch(){
    search.classList.add("search-dark-theme")
    searchButton.classList.add("search-btn-dark-theme")
    searchBar.classList.add("bar-dark-theme")
 }

function applyDarkThemeIcons(icons){
  if(typeof icons !=="undefined"){
    icons.forEach(icon =>{
    console.log(icon)
    icon.classList.add("icon-dark-theme")
    })
  }
 }

 function applyDarkThemeIcon(icon){
  if(typeof icon !=="undefined"){
    icon.classList.add("icon-dark-theme")
  }
 }

function applyDarkThemeWatchlist(btns, elements){
  if(typeof btns !=="undefined"){
    btns.forEach(btn =>{
      console.log(btn)
        btn.classList.add("btn-dark-theme")
       })
  }    
  if(typeof elements !=="undefined"){
      elements.forEach(desp=>{
         desp.classList.add("color-dark-theme")
       })
  }     
} 
  
function removeDarkTheme(){
    body.classList.remove("bg-dark-theme")
    main.classList.remove("main-dark-theme")
   
  }

  function removeDarkThemeSearch(){
    search.classList.remove("search-dark-theme")
    searchButton.classList.remove("search-btn-dark-theme")
    searchBar.classList.remove("bar-dark-theme")
}

  function removeDarkThemeIcons(icons){
    if(typeof icons !=="undefined"){
      icons.forEach(icon =>{
      icon.classList.remove("icon-dark-theme")
      })
    }
}

function removeDarkThemeIcon(icon){
  if(typeof icon !=="undefined"){
    icon.classList.remove("icon-dark-theme")
  }
 }

function removeDarkThemeWatchlist(btns, elements){
  if(typeof btns !=="undefined"){
    btns.forEach(btn =>{
        btn.classList.remove("btn-dark-theme")
       })
  }  
  if(typeof elements !=="undefined"){   
    elements.forEach(desp=>{
         desp.classList.remove("color-dark-theme")
    })
  }     
} 
 


export {applyDarkTheme,applyDarkThemeSearch,applyDarkThemeIcons, applyDarkThemeIcon, applyDarkThemeWatchlist, 
    removeDarkTheme, removeDarkThemeSearch, removeDarkThemeIcons,  removeDarkThemeIcon,removeDarkThemeWatchlist };