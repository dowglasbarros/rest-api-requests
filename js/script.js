const qs = document.querySelector.bind(document);
const qsa = document.querySelectorAll.bind(document);


// Ref para o botao de busca
const button = qs('.button');
button.addEventListener('click', getPokemon)

function getPokemon (e) {
  e.preventDefault();

  const {value} = qs('#pokemon');
  $.getJSON(`https://pokeapi.co/api/v2/pokemon/${value}`, exibeInformacoesDoPokemon);
}

function exibeInformacoesDoPokemon(data) {
  console.log(data);
} 