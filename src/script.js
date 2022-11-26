// const genreList = document.querySelector(".genreDropDown");
// let genres = [
//     {
//       "id": 28,
//       "name": "Action"
//     },
//     {
//       "id": 12,
//       "name": "Adventure"
//     },
//     {
//       "id": 16,
//       "name": "Animation"
//     },
//     {
//       "id": 35,
//       "name": "Comedy"
//     },
//     {
//       "id": 80,
//       "name": "Crime"
//     },
//     {
//       "id": 99,
//       "name": "Documentary"
//     },
//     {
//       "id": 18,
//       "name": "Drama"
//     },
//     {
//       "id": 10751,
//       "name": "Family"
//     },
//     {
//       "id": 14,
//       "name": "Fantasy"
//     },
//     {
//       "id": 36,
//       "name": "History"
//     },
//     {
//       "id": 27,
//       "name": "Horror"
//     },
//     {
//       "id": 10402,
//       "name": "Music"
//     },
//     {
//       "id": 9648,
//       "name": "Mystery"
//     },
//     {
//       "id": 10749,
//       "name": "Romance"
//     },
//     {
//       "id": 878,
//       "name": "Science Fiction"
//     },
//     {
//       "id": 10770,
//       "name": "TV Movie"
//     },
//     {
//       "id": 53,
//       "name": "Thriller"
//     },
//     {
//       "id": 10752,
//       "name": "War"
//     },
//     {
//       "id": 37,
//       "name": "Western"
//     }
//   ]
//   let selectedGenre = [];
//   const genreSelector = () => {
//     genreList.innerHTML = '<summary>&nbsp; &nbsp; </summary>'
//     genres.forEach((genre) => {
     
//       const genreItem = document.createElement("td")
//       genreItem.setAttribute("class", "block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white")
//       genreItem.id = genre.id
//       genreItem.innerText = genre.name
//       genreItem.addEventListener("click", (e) => {
//         e.preventDefault();
//         if (selectedGenre.length == 0) {
//           selectedGenre.push(genre.id)
//         } else {
//           if (selectedGenre.includes(genre.id)) {
//             selectedGenre.forEach((id, index) => {
//               if (id == genre.id) {
//                 selectedGenre.splice(index, 1);
//               }
//             })
//           } else {
//             selectedGenre.push(genre.id)
//           }
//         }
  
//         const genredMovies = API_URL + "&with_genres=" + encodeURI(selectedGenre.join(","));
  
//         sessionStorage.setItem('filter', genredMovies)
//         sessionStorage.setItem('isFullUrl', 1)
//         window.location.reload();
//       })
//       genreList.appendChild(genreItem)
//     })
//   }
//   genreSelector();
//   // to choose movies(latest,popular,top rated ...etc)
//   const onFilterClick = async (e) => {
  
//     let filetrTarget = e.target.innerText;
//     filetrTarget = filetrTarget.split(" ").join("_").toLowerCase();
//     sessionStorage.setItem('filter', filetrTarget);
//     sessionStorage.setItem('isFullUrl', 0);
//     window.location.reload();
//     // const filteredMovies = await fetchMovies(filetrTarget)
//     // renderMovies(filte redMovies.results)
//   }
 // api url
 const api_url = "https://api.themoviedb.org/3/person/popular?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1";
    
    // Defining async function
async function getapi(url) {
	
	// Storing response
	const response = await fetch(url);
	
	// Storing data in form of JSON
	var data = await response.json();
	//console.log(data.results);
    var d = data.results;


    var input = document.getElementById("mySearch");
    input.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        console.log(input.value)
        d.forEach(elem =>{
            //console.log(elem);
            if (elem.name==input.value){
                let n = elem.known_for;
                //console.log(elem)
                gen_films(n);
                var pers_api = `https://api.themoviedb.org/3/person/${elem.id}?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US`;
                get_pers_api(pers_api);
            }
        });
      }
    });
}



async function get_pers_api(url) {

// Storing response
const response = await fetch(url);

// Storing data in form of JSON
var data = await response.json();
 console.log(data);
 document.getElementById('name').innerHTML=data.name;
 document.getElementById('gender').innerHTML= data.gender==1 ? "Female" : "Male";
 document.getElementById('popularity').innerHTML= data.popularity;
 document.getElementById('desc').innerHTML = data.biography;
 document.getElementById('birth').innerHTML = data.birthday;
 document.getElementById('Perspic').src = `https://image.tmdb.org/t/p/original${data.profile_path}`
}

async function get_film_api(url) {

// Storing response
const response = await fetch(url);

// Storing data in form of JSON
const data = await response.json();

 let film = data.cast.slice(0,3)
 console.log(film)
 gen_films(film)
}




async function gen_films(n){
console.log(n)
var filDiv = document.getElementById("fRow");
filDiv.replaceChildren();
if (n.length==0){
   let f = `
   <div class="film-1">
       <img id="filmpic" src="https://i.pinimg.com/originals/90/de/0d/90de0d42ba0f52ad5b580aab9b1615f9.png"  alt="film pic" >
       <div ><h3 class="filmname">Nothing to Show</h3></div>
   </div>
   `;
   filDiv.innerHTML = f;
}else{
   n.forEach(film => {
       console.log(film.title)
       let f = `
       <div class="film-1">
           <img id="filmpic" src="https://i.pinimg.com/originals/90/de/0d/90de0d42ba0f52ad5b580aab9b1615f9.png"  alt="film pic" >
           <div ><h3 class="filmname">${film.title}</h3></div>
       </div>
       `;
       filDiv.innerHTML += f;
   })
}

}
// Calling that async function
getapi(api_url);

'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const actorsContainer = document.querySelector('.actorsContainer')
//http://image.tmdb.org/t/p/w780/ujmuIln4o5ZK08NvI7GmSuV0jj6.png
// /ujmuIln4o5ZK08NvI7GmSuV0jj6.png
// Don't touch this function please

const autorun = async () => {
if (!sessionStorage.getItem('filter'))
 sessionStorage.setItem('filter', 'now_playing')
const movies = await fetchMovies(sessionStorage.getItem('filter'));

renderMovies(movies.results);

};

// Don't touch this function please
const constructUrl = (path) => {
return `${TMDB_BASE_URL}/${path}?api_key=${atob(
 "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
)}`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
const movieRes = await fetchMovie(movie.id);
const movieCredits = await fetchMovie(movie.id + "/credits");
const movieTrailer = await fetchMovie(movie.id + "/videos");
const movieRelated = await fetchMovie(movie.id + "/similar");
// console.log(movieRes/production_companies/logo_path)
console.log(movieRes)
console.log(movieRelated)

renderMovie(movieRes, movieCredits, movieTrailer.results ,movieRelated.results );
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.

const fetchMovies = async (movieFilter) => {
const url = constructUrl(`movie/${movieFilter}`);
const res = await fetch(url);
console.log(url)

return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
const url = constructUrl(`movie/${movieId}`);
const res = await fetch(url);
return res.json();
};



// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
movies.map((movie) => {
 const movieDiv = document.createElement("div");
 movieDiv.setAttribute('class', ' wrapper shadow-lg cursor-pointer')
 movieDiv.innerHTML = `
<div class='box' >
 <img class="w-full" src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="Sunset in the mountains">
<div class="">
 <h2 class="">${movie.title}</h2>
 <div class="bg-slate-500 absolute  top-0 w-fit h-fit min-w-fit rounded-md opacity-0 hover:opacity-80 text-white  ">
 <h2  ><b> Rating:</b> ${movie.vote_average}</h2>
 <p class="hoverdesc text-xs">Description: ${movie.overview}</p>
 </div>

</div>
</div>

</div>
`;
 movieDiv.addEventListener("click", () => {
   movieDetails(movie);
 });

 

 CONTAINER.appendChild(movieDiv);
});
};

// You'll need to play with this function in order to add features and enhance the style.

const CONTAINER = document.querySelector(".container");
const renderActors = ()=>{
CONTAINER.innerHTML=`
<div class="personal_img">
<img id="Perspic" src="" alt="Pers pic">
</div>
 <div class="welcome">
   <h1 id="name"></h1>
   <p class="topics">Birth: <span id="birth">1999-07-30</span> &nbsp; &nbsp; &nbsp; Gender:<span id="gender"> Female</span> &nbsp; &nbsp; &nbsp; Popularity: <span id="popularity">135.271</span></p><br>
   <p id="desc"></p><br>
   
   <h2 class="text-slate-200">List of Films Participated in:</h2>
  
   <div class="films-row" id="fRow">
     <div class="film-1">
         <img id="filmpic" src="https://i.pinimg.com/originals/90/de/0d/90de0d42ba0f52ad5b580aab9b1615f9.png"  alt="film pic" >
         <div ><h3 class="filmname">The Kissing Booth</h3></div>
     </div>
     
     <div class="film-1">
         <img id="filmpic" src="https://i.pinimg.com/originals/90/de/0d/90de0d42ba0f52ad5b580aab9b1615f9.png" alt="film pic">
         <div ><h3 class="filmname">The Act</h3></div>
     </div>
     
     <div class="film-1">
         <img id="filmpic" src="https://i.pinimg.com/originals/90/de/0d/90de0d42ba0f52ad5b580aab9b1615f9.png" alt="film pic">
         <div ><h3 class="filmname">The Kissing Booth 2</h3></div>
     </div>
     
 </div>
 </div>
`;

async function get_film_api(url) {

    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    const data = await response.json();
    
     let film = data.cast.slice(0,3)
     console.log(film)
     gen_films(film)
    }
    get_film_api()

}


const renderMovie = (movie, movieActors, videos ,related ) => {



CONTAINER.innerHTML = `
<div class=" grid-cols-2 row-span-1 row bg-no-repeat bg-cover" id='single-movie-box' style='background-image: url("${BACKDROP_BASE_URL + movie.backdrop_path}")'>
<div id='single-movie-deatils' class="flex-wrap px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
<div class='flex-wrap'>
   <h2 id="movie-title" class='text-slate-400 flex-wrap column mt-5 text-base font-small tracking-tight'>${movie.title}</h2>
  <ul class='directorList'><b  class='text-slate-400 text-xl' >director's :-</b></ul>
<div id="movie-overview">
  <ul class='genersList'><b  class='text-slate-400 text-xl' >genre's :-</b></ul>
    </div>
         <p id="movie-rating" class='text-slate-400 w-96  mt-2 text-sm'><b> Rating:</b> ${movie.vote_average}</p>
         <p id="movie-release-date" class='text-slate-400 w-96  mt-2 text-sm'><b>Release Date:</b> ${movie.release_date}</p>
         <p id="movie-language" class='text-slate-400 w-96  mt-2 text-sm'><b>original language:</b>   ${movie.original_language}</p>
         <p id="movie-runtime" class='text-slate-400 w-96  mt-2 text-sm'><b>Runtime:</b>${movie.runtime} Minutes</p>
         <h3 id='overview-movie-single' class='text-slate-400 w-96 '>Overview:</h3> 
         <p id="movie-overview" class='text-slate-400 w-96  mt-2 text-sm'>${movie.overview}</<p>
         </div>
         <div>
         <iframe class="w-40 pt-[10px] pr-[10px] pb-[10px] pl-[10px]" id='utubvid' src="https://www.youtube.com/embed/${videos.length === 0 ? videos.key : videos[0].key}" 
         ></iframe>
         </div>
     </div>
     <div>
     <h2 id="titles" class='text-slate-400 mt-5 w-full text-base font-small tracking-tight'>Actors :-</h2>
     <ul class='actorList'> </ul>
     </div>
     <div>
     <h2 id="titles" class='text-slate-400 mt-5 w-full text-base font-small tracking-tight'>Prodaction Companies</h2>
      <ul class='companyList'></ul>
      </div>
     <div class='grid-cols-1'>
     <h2 id="titles" class='text-slate-400 mt-5 w-full text-base font-small tracking-tight'>related movies</h2>
      <ul class='relatedList'></ul>
      </div>
      <div id="titles" class='text-slate-400 mt-5 w-full text-base font-small tracking-tight'>
      <form action="./index.html" class="inline">
      <button class="float-left submit-button" >back to home</button>
     
      </form>
      </div>
   `;
//  <img class="w-full" src="${BACKDROP_BASE_URL+production_companies.logo_path}" alt="Sunset in the mountains">
/* <img class="actors-sigle-page m-2" src="${BACKDROP_BASE_URL+movieRes.production_companies.logo_path}"> */
const actorList = document.querySelector(".actorList");

actorList.setAttribute('class', 'flex flex-row justify-center');
actorList.setAttribute('id', 'actorList-singleMovie-page');

movieActors.cast.slice(0, 5).forEach(actor => {
 BACKDROP_BASE_URL + actor.profile_path
 const movieActorsDiv = document.createElement("div");
 movieActorsDiv.setAttribute("class","movieActorsDiv");
 //console.log("The Films "+ actor.)
 movieActorsDiv.innerHTML = `
<img class="actors-sigle-page m-2" src="${PROFILE_BASE_URL+ actor.profile_path}" > 
 <p id='actorsearch' class='text-slate-400 p-1  border-1 bg-black/50 rounded-lg '>${actor.name}</p>`;

actorList.appendChild(movieActorsDiv);

movieActorsDiv.addEventListener('click', function(e){
   e.preventDefault()
   let n = actor.known_for;
   let filAPI = `https://api.themoviedb.org/3/person/${actor.id}/movie_credits?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US`
   get_film_api(filAPI)
   
   let urls=`https://api.themoviedb.org/3/person/${actor.id}?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US`
   get_pers_api(urls)
   //console.log(actor)
   renderActors()
})



});
const directorList = document.querySelector(".directorList");
directorList.setAttribute('id', 'actorList-singleMovie-page');

movieActors.crew.filter(director => director.job === 'Director').map(director => {
 const mydir=document.createElement('ul');
 mydir.setAttribute("class","mydirDiv");
 mydir.innerHTML= `<p class='text-slate-400 text-xl'>${director.name}</p>
 `;
 directorList.appendChild(mydir);
});

 

const companyList =document.querySelector('.companyList');
 companyList.setAttribute('class','flex flex-row justify-center m-4');
 companyList.setAttribute('id', 'companyList-singleMovie-page');
 movie.production_companies.slice(0, 3).forEach(company => {

   const movieCompaniesDiv = document.createElement("div");
   movieCompaniesDiv.setAttribute("class","movieCompaniesDiv");
   movieCompaniesDiv.innerHTML = `
  <img class="companies-sigle-page m-2" src="${BACKDROP_BASE_URL+company.logo_path}" > 
   <p class='text-slate-400 p-1  border-1 bg-black/50 rounded-lg'>${company.name} </p> `; 
  companyList.appendChild(movieCompaniesDiv)
  })
  const genersList =document.querySelector('.genersList');
  genersList.setAttribute('class','flex flex-row justify-center m-4');
  genersList.setAttribute('id', 'genersList-singleMovie-page');
 movie.genres.slice(0, 3).map(genre => {

   const moviegenreDiv = document.createElement("div");
   moviegenreDiv.setAttribute("class","moviegenreDiv");
   moviegenreDiv.innerHTML = `
   <p class='text-slate-400 p-1  border-1 bg-black/50 rounded-lg'>${genre.name} </p> `; 
   genersList.appendChild(moviegenreDiv)
  })
  
const relatedList = document.querySelector('.relatedList');
relatedList.setAttribute('class','flex flex-row justify-center m-4');
relatedList.setAttribute('id', 'relatedList-singleMovie-page');

related.slice(0, 5).forEach(relatedMovie => {
 const movieRelatedDiv = document.createElement("div");
movieRelatedDiv.setAttribute("class","movieRelatedDiv");

movieRelatedDiv.innerHTML = `
<img class="actors-sigle-page m-2" src="${PROFILE_BASE_URL+ relatedMovie.backdrop_path}" > 
 <p class='text-slate-400 p-1  border-1 bg-black/50 rounded-lg m-1'>${relatedMovie.original_title} </p> `;

 movieRelatedDiv.addEventListener('click', function(){
    movieDetails(relatedMovie);
   
    })
    relatedList.appendChild(movieRelatedDiv)
})

 };



 async function get_pers_api(urls) {

   // Storing response
   const response = await fetch(urls);
   
   // Storing data in form of JSON
   var data = await response.json();
     //console.log(data);
     document.getElementById('name').innerHTML=data.name;
     document.getElementById('gender').innerHTML= data.gender==1 ? "Female" : "Male";
     document.getElementById('popularity').innerHTML= data.popularity;
     document.getElementById('desc').innerHTML = data.biography;
     document.getElementById('birth').innerHTML = data.birthday;
     document.getElementById('Perspic').src = `https://image.tmdb.org/t/p/original${data.profile_path}`
 }


 async function gen_films(n){
   console.log(n)
   var filDiv = await document.getElementById("fRow");
   filDiv.replaceChildren();
   if (n.length==0){
       let f = `
       <div class="film-1">
           <img id="filmpic" src="https://i.pinimg.com/originals/90/de/0d/90de0d42ba0f52ad5b580aab9b1615f9.png"  alt="film pic" >
           <div ><h3 class="filmname">Nothing to Show</h3></div>
       </div>
       `;
       var filDiv = document.getElementById("fRow");
       filDiv.replaceChildren();
       filDiv.innerHTML = f;
   }else{
       n.forEach(film => {
           console.log(film.title)
           console.log(film)
           let f = `
           <div class="film-1">
               <img id="filmpic" src="${BACKDROP_BASE_URL +film.backdrop_path}"  alt="film pic" >
               <div ><h3 class="filmname">${film.title}</h3></div>
           </div>
           `;
           filDiv.addEventListener('click', function(){
            movieDetails(film)
           
            })
           filDiv.innerHTML += f;
       })
   }
   const btn = document.querySelector('.btn')
   btn.addEventListener('click',function (){
    renderMovie()
   })
 
}

document.addEventListener("DOMContentLoaded", autorun);
const runActors = async () => {
    const actors = await fetchActors();
    renderActorss(actors.results);
  };
  
  const actorDetails = async (actor) => {
      const actorRes = await fetchActor(actor.id);
      renderActorsss(actorRes);
    };
   
  const fetchActors = async () => {
    const url = constructUrl(`person/popular`);
    const res = await fetch(url);
    return res.json();
  };
  
  const fetchActor = async (actorId) => {
      const url = constructUrl(`person/${actorId}`);
      const res = await fetch(url);
      return res.json();
    };
   
  const renderActorss = (actors) => {

    actors.map((actor) => {
        const actorDiv = document.createElement("div");
        actorDiv.setAttribute('class' , 'actorsWrapper shadow-lg cursor-pointer')
        actorDiv.innerHTML = `
        <div class='actorsBox'>
  
            <img class="w-32 rounded-md" src="${PROFILE_BASE_URL + actor.profile_path}" alt="${actor.name} poster">
  
            <h3 class ="">${actor.name}</h3>
            
            </div>`;
        actorDiv.addEventListener("click", () => {
          actorDetails(actor);
        });
        actorsContainer.appendChild(actorDiv);
      });
      actorsContainer.appendChild(actorsDiv);
      actorsPageDes();
    };

  
  const actorsPageDes = () => {
    const header = document.querySelector(".description");
    header.innerHTML = "See Popular Actors";
    
  }
  
  function checkGender(num){
    if(num == 1){
        return "Female"
    } else if(num == 2){
      return "Male"
    }
  }
  
  const renderActorsss = (actor) => {
    actorsContainer.innerHTML = `
      <div class="actorsBox">
    <img id='actorsdivImg' src=${PROFILE_BASE_URL + actor.profile_path}>
      
      <h2 >${actor.name} (${checkGender(actor.gender)})</h2>
              <h2 ><b>BirthDate:</b> ${actor.birthday}</h2>
              <h2 ><b>Popularity:</b> ${actor.popularity}</h2>
              <h2>Biography:</h2>
              <div>
              <p>${actor.biography}</p>
             <div>
       </div>
       <div class="films-row" id="fRow">
       <div class="film-1">
           <img id="filmpic" src="https://i.pinimg.com/originals/90/de/0d/90de0d42ba0f52ad5b580aab9b1615f9.png"  alt="film pic" >
           <div ><h3 class="filmname"></h3></div>
       </div>
       
       <div class="film-1">
           <img id="filmpic" src="https://i.pinimg.com/originals/90/de/0d/90de0d42ba0f52ad5b580aab9b1615f9.png" alt="film pic">
           <div ><h3 class="filmname"></h3></div>
       </div>
       
       <div class="film-1">
           <img id="filmpic" src="https://i.pinimg.com/originals/90/de/0d/90de0d42ba0f52ad5b580aab9b1615f9.png" alt="film pic">
           <div ><h3 class="filmname"></h3></div>
       </div>`
  
       if(actor.deathday != null){
        actorsContainer.innerHTML += `<p id="actor-death-date"><b>DeathDay:</b> ${actor.deathday} </p>`
      }
     
    runActormovieDetails(actor);
};
     document.addEventListener("DOMContentLoaded", runActors);
// genres functions
