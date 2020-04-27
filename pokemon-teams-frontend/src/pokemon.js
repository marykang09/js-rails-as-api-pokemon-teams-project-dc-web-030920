const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchPokemon(event) {
    fetch(POKEMONS_URL)
    .then(resp => resp.json())
    .then(pokemonArray => pokemonArray.forEach(pokemon => renderPokemon(pokemon)))
}

function renderPokemon(pokemon) {
    let mainContainer = document.getElementById("pokemon-team-container")
    mainContainer.innerHTML = 
    `<div class="card" data-id="1"><p>Prince</p>
    <button data-trainer-id="1">Add Pokemon</button>
    <ul>
      <li>${pokemon.trainer} (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    </ul>
    </div>`
    debugger
}