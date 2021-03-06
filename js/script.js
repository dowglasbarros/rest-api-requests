const qs = document.querySelector.bind(document);
const qsa = document.querySelectorAll.bind(document);

const botaoSubmit = qs('#submit');
const botaoLimpar = qs('#clear');
const inputPokemon = qs('#pokemon');
const nomePokemon = qs('#poke-name');
const imagemPokemon = qs('#poke-picture img');
const habilidadesPokemon = qs('#poke-abilities');

const YOUTUBE_API_KEY = "AIzaSyA23m5YJbOR0mNX2bpIXM5RxFEOgGgAYt0";
const URL_YOUTUBE = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&type=video&key=${YOUTUBE_API_KEY}`;
const CALLBACK = "&callback=?";
let videoShowYoutube = qs("#video-show-youtube");
let listVideos = qs("#list-videos");

botaoSubmit.addEventListener('click', getPokemon);
botaoLimpar.addEventListener('click', limpar);

function getPokemon (e) {
  e.preventDefault();

  if (validaErroPokemon(inputPokemon)) {
    limpar();
    exibeErro();
  
  } else {
    $.getJSON(`https://pokeapi.co/api/v2/pokemon/${inputPokemon.value}/`)
      .done(function(data) {
        exibeInformacoesDoPokemon(data);
      })
      .fail(function() {
        limpar();
        exibeErro();
      })
  }
}

function exibeInformacoesDoPokemon(data) {
  if (data.name) {
    pokemonCry(data.name);
    nomePokemon.innerHTML = data.name;
    imagemPokemon.src = data.sprites.front_shiny;    

    exibeHabilidades(data.abilities);
    youtubeRequest();
  } else {
    limpar();
    exibeErro();
  }
}

function pokemonCry(name) {
  if (name === 'pikachu') {
    var audio = new Audio('cries/pikachu.wav');
    audio.play();
  } else if (name === 'bulbasaur') {
    var audio = new Audio('cries/bulbasaur.wav');
    audio.play();
  } else if (name === 'charmander') {
    var audio = new Audio('cries/charmander.wav');
    audio.play();
  } else if (name === 'squirtle') {
    var audio = new Audio('cries/squirtle.wav');
    audio.play();
  }
}

function exibeHabilidades(habilidades) {
  let listaDeHabilidades = habilidades.reduce((prev, curr) => prev.concat(`<p> ${curr.ability.name} </p>`), '');
  let titulo = '<h2> Habilidades </h2>';
  
  listaDeHabilidades = `<div id='poke-abilities-list'> ${listaDeHabilidades} </div>`

  habilidadesPokemon.innerHTML = titulo + listaDeHabilidades;
}

function validaErroPokemon(input) {
  const {value} = input;

  if (value.match(/[0-9]/) || !value.length) {
    input.classList.add('erro');
    return true;
  
  } else {
    input.classList.remove('erro');
    return false;
  }
}

function exibeErro() {
  nomePokemon.innerHTML = 'Digite o nome de um Pokémon válido';
}

function limpar() {
  inputPokemon.value = '';
  nomePokemon.innerHTML = '';
  imagemPokemon.src = '';
  habilidadesPokemon.innerHTML = '';
  listVideos.innerHTML = "";
  videoShowYoutube.innerHTML = "";
}

function youtubeRequest(){
  let input = qs("#pokemon");
  let term = input.value;
  if (validaErroPokemon(input)) return;
  let URL = `${URL_YOUTUBE}&q=${term}`;
  $.getJSON(URL, function(data){
    let lis = "";
    data.items.forEach(item => {
      lis += createVideoList(item);
    });
    listVideos.innerHTML = lis;
    let li = listVideos.getElementsByTagName("li")[0];
    showVideo(li);
  });
}

function createVideoList(item){
  return `
      <li id=${item.id.videoId} class="videos-pokemon" onClick="showVideo(event.target.parentElement)">
        <h2 class="video-title">${item.snippet.title}</h2>

        <img src=${item.snippet.thumbnails.default.url} alt=${item.snippet.title} />
        <p class="video-description">${item.snippet.description}</p>
      </li>
    `;
}

function showVideo(li){
  let title = li.querySelector(".video-title").textContent;
  let description = li.querySelector(".video-description").textContent;
  const videoId = li.id;
  const url = `https://www.youtube.com/embed/${videoId}`;
  videoShowYoutube.innerHTML = createYoutubeVideo(url, title, description);
}

function createYoutubeVideo(url, title, description){
  return `
    <div class="embed-responsive">
      <div class="iframe-container">
        <iframe src=${url} class="embed-responsive-item"></iframe>
      </div>
      <div class="details">
        <h2>${title}</h2>
        <p>${description}</p>
      </div>
    </div>
  `;
}