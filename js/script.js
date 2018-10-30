const qs = document.querySelector.bind(document);
const qsa = document.querySelectorAll.bind(document);

const botaoSubmit = qs('#submit');
const botaoLimpar = qs('#clear');
const inputPokemon = qs('#pokemon');
const nomePokemon = qs('#poke-name');
const imagemPokemon = qs('#poke-picture img');
const habilidadesPokemon = qs('#poke-abilities');

botaoSubmit.addEventListener('click', getPokemon);
botaoLimpar.addEventListener('click', limpar);

function getPokemon (e) {
  e.preventDefault();
  const {value} = inputPokemon;

  if (validaErroPokemon(inputPokemon)) return;

  $.getJSON(`https://pokeapi.co/api/v2/pokemon/${value}`, function() {
    console.log("success");
  })
    .done(function(data) {
      exibeInformacoesDoPokemon(data);
    })
    .fail(function() {
      limpar();
      exibeErro();
    })
}

function exibeInformacoesDoPokemon(data) {
  if (data.name) {
    nomePokemon.innerHTML = data.name;
    imagemPokemon.src = data.sprites.front_shiny;    

    exibeHabilidades(data.abilities);
  } else {
    limpar();
    exibeErro();
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

  if (value.match(/[0-9]/)) {
    input.classList.add('erro');
    return true;
  
  } else {
    input.classList.remove('erro');
    return false;
  }
}

function exibeErro() {
  nomePokemon.innerHTML = 'Pokémon inexistente';
}

function limpar() {
  inputPokemon.value = '';
  nomePokemon.innerHTML = '';
  imagemPokemon.src = '';
  habilidadesPokemon.innerHTML = '';
}