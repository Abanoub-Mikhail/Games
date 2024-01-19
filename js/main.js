
let links = document.querySelectorAll(".navbar-nav a");


async function getGames(category) {
  const loader = document.querySelector(".loading");
  loader.classList.remove("d-none");
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ccfab605a4msh56a29b231e59701p171157jsn472a9223931f',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    

    const res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
    const data = await res.json()
    // console.log(data);
    displayGames(data)
    showDetails()
    loader.classList.add("d-none");
}
getGames("mmorpg")

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click" , function (e){
      document.querySelector(".nav-link.active").classList.remove("active");
      e.target.classList.add("active");
      getGames(e.target.getAttribute('card-category'));
  })
}


function displayGames(data) {
  let cartona = ``
  for (let i = 0; i < data.length; i++) {
    let path = data[i].thumbnail.replace("thumbnail.jpg","videoplayback.webm")
      cartona += `
      <div  class="col-sm-12 col-md-6 col-lg-4 col-xl-3 click" >
      <div onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)" class="card h-100" data-id="${data[i].id}">
        <div class="card-body p-3 position-relative" >
          <img src="${data[i].thumbnail}" class="card-img-top w-100 mb-3" alt="img">
          <video muted="true" preload="none" loop class = "w-100 d-none position-absolute top-0 start-0 z-3 rounded-2" >
          <source src="${path}">
          </video>
          <header class="hstack d-flex justify-content-between align-items-center mb-3 text-capitalize">
            <h3 class="card-title">${data[i].title}</h3>
            <span class="p-2 badge bg-primary">free</span>
          </header>
          <p class="card-text text-center mb-3 small">${data[i].short_description.split(" ",8)}</p>
        </div>
        <footer class="d-flex justify-content-between align-items-center card-footer small">
          <span class="badge badge-bg text-uppercase">${data[i].genre}</span>
          <span class="badge badge-bg">${data[i].platform}</span>
        </footer>
      </div>
    </div>        `
      
  }
  document.getElementById("gamesCards").innerHTML=cartona;


}



function showDetails() {
  document.querySelectorAll(".card").forEach((item)=>{
    item.addEventListener("click",( ) =>{
      let id = item.dataset.id
      getDetails(id);
      document.querySelector("#details").classList.remove("d-none");
      document.querySelector("#games").classList.add("d-none");
    })
  })
  
}


async function getDetails(id) {
  const loader = document.querySelector(".loading");
  loader.classList.remove("d-none");
  const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ccfab605a4msh56a29b231e59701p171157jsn472a9223931f',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

let res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
let data = await res.json();

// console.log(data);
displayDetails(data)
loader.classList.add("d-none")
}







function displayDetails(data) {
  let cartona = `
  <div class="col-md-4">
          <img src="${data.thumbnail}" alt="img" class="w-100">
        </div>
        <div class="col-md-8">
          <h3>title : ${data.title}</h3>
          <p>Category : <span class="badge text-bg-info">${data.genre}</span></p>
          <p>Platform : <span class="badge text-bg-info">${data.platform}</span></p>
          <p>Status : <span class="badge text-bg-info">${data.status}</span></p>
          <p>${data.description}</p>
          <a href="${data.game_url}" class="btn btn-warning text-uppercase fw-bold" target="_blank">show game</a>
        </div>
  `
  document.querySelector("#displayData").innerHTML=cartona;

  
}

document.querySelector("#btnClose").addEventListener("click", function (e) {
  document.querySelector("#details").classList.add("d-none");
  document.querySelector("#games").classList.remove("d-none");
})









function startVideo (event) {
  const video = event.target.querySelector('video');
  video.classList.remove("d-none");
  video.muted=true
  video.play();
}

function stopVideo (event) {
  const video = event.target.querySelector('video');
  video.classList.add("d-none");
  video.muted=true
  video.pause();
}