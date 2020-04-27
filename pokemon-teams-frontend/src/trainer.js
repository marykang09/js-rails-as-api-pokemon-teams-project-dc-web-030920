const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchPokemon(event) {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainersArray => trainersArray.forEach(trainer => renderPokemon(trainer)))
}

//When a user loads the page, they should see all trainers, with their current team of Pokemon.
function renderPokemon(trainer) {
    const mainContainer = document.getElementById("trainer-team-container")
    const divCard = document.createElement("div")
    divCard.className = "card"
    divCard.data_id = trainer.id

    const pName = document.createElement("p")
    pName.innerText = trainer.name
    
    const buttonAdd = document.createElement("button")
    buttonAdd.data_trainer_id = trainer.id
    buttonAdd.innerText = "Add Pokemon"
    buttonAdd.id = trainer.id

    mainContainer.append(divCard)
    divCard.append(pName, buttonAdd)

    trainer.pokemons.forEach(function(pokemon){
        // buttonRelease.id = pokemon.id
        const ul = document.createElement("ul")
        const liName = document.createElement("li")
        liName.innerText = `${pokemon.nickname} (${pokemon.species})`
        const buttonRelease = document.createElement("button")
        // buttonRelease.innerText = "Release"
        buttonRelease.className = "release"
        buttonRelease.innerText = "Release"
        buttonRelease.data_pokemon_id = pokemon.id

        liName.appendChild(buttonRelease)
        ul.appendChild(liName)
        divCard.appendChild(ul)

    })
}

//Whenever a user hits "Add Pokemon" and they have space on their team, they should get a new Pokemon.
// function addPokemon(event) {
//     let button

//     fetch(POKEMONS_URL)
//     .then()
// }