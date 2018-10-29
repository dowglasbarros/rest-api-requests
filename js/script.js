const qs = document.querySelector.bind(document);
const qsa = document.querySelectorAll.bind(document);

// Ref para o botao de busca
const button = qs('#submit');
button.addEventListener('click', getPokemon)

function getPokemon (e) {
  e.preventDefault();

  // valor digitado no input
  const {value} = qs('#pokemon');
  $.getJSON(`https://pokeapi.co/api/v2/pokemon/${value}`, exibeInformacoesDoPokemon);
}

function exibeInformacoesDoPokemon(data) {
  exibeHabilidades(data.abilities);
} 

function exibeHabilidades(habilidades) {
  const listaDeHabilidades = habilidades.reduce((prev, curr) => prev.concat(`<p> ${curr.ability.name} </p>`), '')
  qs('#poke-abilities').innerHTML = listaDeHabilidades;
}