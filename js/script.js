const qs = document.querySelector.bind(document);
const qsa = document.querySelectorAll.bind(document);


// Ref para o botao de busca
const button = qs('#submit');
button.addEventListener('click', getPokemon)

function getPokemon (e) {
  e.preventDefault();

  const {value} = qs('#pokemon');
  $.getJSON(`https://pokeapi.co/api/v2/pokemon/${value}`, exibeInformacoesDoPokemon);
}

function exibeInformacoesDoPokemon(data) {
  qs('#poke-name').innerHTML = data.name;
  qs('#poke-picture img').src = data.sprites.front_shiny;    
} 