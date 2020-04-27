const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchPokemon(event) {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainersArray => trainersArray.forEach(trainer => renderTrainer(trainer)))
}

//When a user loads the page, they should see all trainers, with their current team of Pokemon.
function renderTrainer(trainer) {
    const mainContainer = document.getElementById("trainer-team-container")
    const divCard = document.createElement("div")
    divCard.className = "card"
    divCard.data_id = trainer.id

    const pName = document.createElement("p")
    pName.innerText = trainer.name
    
    const buttonAdd = document.createElement("button")
    buttonAdd.setAttribute("data_trainer_id", trainer.id)
    buttonAdd.innerText = "Add Pokemon"
    buttonAdd.id = trainer.id

    mainContainer.append(divCard)
    divCard.append(pName, buttonAdd)

    buttonAdd.onclick = addPokemon

    const ul = document.createElement("ul")
    divCard.appendChild(ul)


    trainer.pokemons.forEach(function(pokemon){renderPokemon(pokemon, ul)})
}

function renderPokemon(pokemon, ulNode) {
    const liName = document.createElement("li")
    liName.innerText = `${pokemon.nickname} (${pokemon.species})`
    const buttonRelease = document.createElement("button")
    buttonRelease.className = "release"
    buttonRelease.innerText = "Release"
    buttonRelease.setAttribute("data-pokemon-id", pokemon.id)

    liName.appendChild(buttonRelease)
    ulNode.appendChild(liName)
    
    buttonRelease.onclick = removePokemon
}

//Whenever a user hits "Add Pokemon" and they have space on their team, they should get a new Pokemon.

function addPokemon(event) {
    console.log("add pokemon here")
    const id = event.target.getAttribute("data_trainer_id")
    let div = event.target.parentElement
    let ulNode = div.querySelector("ul")
    let numPokemon = div.querySelectorAll("li").length
    let obj = {
        trainer_id: id
    }
    if (numPokemon < 6) {
    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify(obj)
    })
    .then(resp => resp.json())
    .then(newPokemon => renderPokemon(newPokemon, ulNode))
}
}

// Whenever a user hits "Release Pokemon" on a specific Pokemon team, that specific Pokemon should be released from the team.

function removePokemon(event) {
    let pokeId = event.target.dataset.pokemonId
    let liDelete = event.target.parentElement
    liDelete.remove()

    fetch(`${POKEMONS_URL}/${pokeId}`, {
        method: "DELETE"
    })
}